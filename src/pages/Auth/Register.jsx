import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser, googleAuthUser } from '../../store/slices/authSlice'
import { GoogleLogin } from '@react-oauth/google'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/common/Input'
import { useToast } from '../../hooks/useToast'
import { ROUTES } from '../../utils/constants'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string(), // .min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(), // .min(6, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.auth)
  const { showToast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data) => {
    const result = await dispatch(
      registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      })
    )
    if (result.type === 'auth/register/fulfilled') {
      navigate(ROUTES.LOGIN)
      showToast('Registration successful! Please login.', 'success')
    } else {
      showToast(result.payload || 'Registration failed', 'error')
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const result = await dispatch(googleAuthUser(credentialResponse.credential))
      if (result.type === '/auth/google/fulfilled') {
        navigate(ROUTES.DASHBOARD)
        showToast('Google registration successful!', 'success')
      } else {
        showToast(result.payload || 'Google registration failed', 'error')
      }
    } catch (err) {
      showToast('Google registration error', 'error')
    }
  }

  const handleGoogleError = () => {
    showToast('Google registration failed', 'error')
  }

  return (
    <div className="h-screen">
      <div className="grid grid-cols-2 h-full">
        {/* Column 1: Logo and Form */}
        <div className="flex flex-col justify-center px-12">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-text-dark mb-2">
                Finsight
              </h1>
              <p className="text-[0.8rem]">Personlized financial analytical dashboard</p>
            </div>

            <h2 className="text-[1.4rem] font-semibold mb-6 text-indigo-900">Register</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
                {...register('name')}
                error={errors.name?.message}
              />

              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                {...register('email')}
                error={errors.email?.message}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••"
                {...register('password')}
                error={errors.password?.message}
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />

              <Button
                type="submit"
                className="w-full"
                isLoading={loading}
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Register'}
              </Button>
            </form>
            <div className='flex flex-col items-center justify-between gap-4 p-4'>
              <span>or</span>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                size="large"
                text="signup_with"
              />
            </div>

            <div className="mt-6 text-center">
              <p className="text-slate-600 text-[0.8rem]">
                Already have an account?{' '}
                <Link
                  to={ROUTES.LOGIN}
                  className="font-medium transition-colors"
                  style={{ color: '#2563EB' }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Column 2: Illustrator - full height and available width */}
        <div className="h-full w-full bg-white flex items-center justify-center">
          <img
            src="/illustrator1.svg"
            alt="Register"
            loading='lazy'
            decoding='async'
            className="max-h-screen max-w-full object-contain"
          />
        </div>
      </div>
    </div>
  )
}
