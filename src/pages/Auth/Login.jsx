import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser, googleAuthUser } from '../../store/slices/authSlice'
import { GoogleLogin } from '@react-oauth/google'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/common/Input'
import { useToast } from '../../hooks/useToast'
import { ROUTES } from '../../utils/constants'

const loginSchema = z.object({
     email: z.string().email('Invalid email address'),
     password: z.string(), // .min(6, 'Password must be at least 6 characters'),
})

export const Login = () => {
     const dispatch = useDispatch()
     const navigate = useNavigate()
     const { loading, error } = useSelector((state) => state.auth)
     const { showToast } = useToast()

     const {
          register,
          handleSubmit,
          formState: { errors },
     } = useForm({
          resolver: zodResolver(loginSchema),
     })

     const onSubmit = async (data) => {
          const result = await dispatch(loginUser(data))
          if (result.type === 'auth/login/fulfilled') {
               navigate(ROUTES.DASHBOARD)
               showToast('Login successful!', 'success')
          } else {
               showToast(error.message || 'Login failed', 'error')
          }
     }

     const handleGoogleSuccess = async (credentialResponse) => {
          try {
               const result = await dispatch(googleAuthUser(credentialResponse.credential))
               if (result.type === '/auth/google/fulfilled') {
                    navigate(ROUTES.DASHBOARD)
                    showToast('Google login successful!', 'success')
               } else {
                    showToast(result.payload || 'Google login failed', 'error')
               }
          } catch (err) {
               showToast('Google login error', 'error')
          }
     }

     const handleGoogleError = () => {
          showToast('Google login failed', 'error')
     }

     return (
          <div className="h-screen">
               <div className="grid grid-cols-2 h-full">
                    {/* Column 1: Logo and Form */}
                    <div className="flex flex-col justify-center px-12">
                         <div className="w-full max-w-md mx-auto">
                              <div className="mb-8">
                                   <h1 className="text-3xl font-bold text-text-dark mb-2">
                                        Finsight
                                   </h1>
                                   <p className="text-[0.8rem] text-text-muted">Personlized financial analytical dashboard</p>
                              </div>

                              <h2 className="text-[1.4rem] font-semibold mb-6 text-indigo-900">Login</h2>

                              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

                                   <Button
                                        type="submit"
                                        className="w-full"
                                        isLoading={loading}
                                        disabled={loading}
                                   >
                                        {loading ? 'Logging in...' : 'Login'}
                                   </Button>
                              </form>

                              <div className='flex flex-col items-center justify-between gap-4 p-4'>
                                   <span>or</span>
                                   <GoogleLogin
                                        onSuccess={handleGoogleSuccess}
                                        onError={handleGoogleError}
                                        size="large"
                                        text="signin_with"
                                   />
                              </div>

                              <div className="mt-6 text-center">
                                   <p className="text-slate-600 text-[0.8rem]">
                                        Don't have an account?{' '}
                                        <Link
                                             to={ROUTES.REGISTER}
                                             className="font-medium transition-colors"
                                             style={{ color: '#2563EB' }}
                                             onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                                             onMouseLeave={(e) => e.target.style.opacity = '1'}
                                        >
                                             Register here
                                        </Link>
                                   </p>
                              </div>
                         </div>
                    </div>

                    {/* Column 2: Illustrator - full height and available width */}
                    <div className="h-full w-full bg-white flex items-center justify-center">
                         <img
                              src="/illustrator1.svg"
                              alt="Login"
                              loading='lazy'
                              decoding='async'
                              className="max-h-screen max-w-full object-contain"
                         />
                    </div>
               </div>
          </div>
     )
}
