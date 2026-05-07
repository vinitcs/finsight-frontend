import React from 'react'
import { PageWrapper } from '../../components/layout/PageWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '../../hooks/useToast';
import { updatePassword } from '../../store/slices/authSlice';

const passwordSchema = z.object({
     newPassword: z
          .string()
          .min(8, 'Password must be at least 8 characters')
          .max(128, 'Password is too long')
          .regex(
               /[A-Z]/,
               'Password must contain at least one uppercase letter'
          )
          .regex(
               /[a-z]/,
               'Password must contain at least one lowercase letter'
          )
          .regex(
               /[0-9]/,
               'Password must contain at least one number'
          )
          .regex(
               /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
               'Password must contain at least one special character'
          )
});

export const UpdatePassword = () => {
     const dispatch = useDispatch();
     const { showToast } = useToast();
     const { user, isNewPasswordSubmitted } = useSelector(state => state.auth);
     const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(passwordSchema) })


     const onSubmit = async (data) => {
          const result = await dispatch(updatePassword(data))
          if (result.type === 'auth/password-update/fulfilled') {
               showToast('Password updated successfully', 'success')
          } else {
               showToast(result.payload || 'Update password failed', 'error')
          }
     }

     return (
          <PageWrapper>
               <div className="space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                         <div>
                              <h1 className="text-3xl font-bold text-primary mb-2">Update Password</h1>

                              <div className='w-100 p-6 rounded-xl border border-light mt-6'>

                                   <section className='mb-6'>
                                        <span className='font-medium text-gray-700 mr-2'>Email:</span>
                                        <span className='w-full bg-white rounded-lg text-primary font-bold'
                                        >{user.email}</span>
                                   </section>

                                   <form onSubmit={handleSubmit(onSubmit)}>

                                        <Input
                                             label="Add new password"
                                             type="password"
                                             placeholder="••••••"
                                             {...register('newPassword')}
                                             error={errors.newPassword?.message}
                                        />
                                        <Button type="submit" className="w-full mt-4" disabled={isNewPasswordSubmitted} isLoading={isNewPasswordSubmitted}>
                                             {isNewPasswordSubmitted ? 'Updating...' : 'Update Password'}
                                        </Button>
                                   </form>
                              </div>
                         </div>
                    </div>
               </div>
          </PageWrapper>
     )
}

