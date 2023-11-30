'use client'

import { EyeOffIcon, EyeOnIcon } from '@/components/icons'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Toaster, toast } from 'sonner'
import { type ResetPasswordFormValues } from '@/types/form/reset-password'

const resetPasswordSchema = yup.object({
  password: yup.string().required('Contraseña es un campo requerido').min(6, 'Contraseña debe ser mayor a 6 caracteres'),
  passwordConfirmation: yup.string().required('Confirmación de contraseña es un campo requerido').oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
})

export default function ResetPasswordPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormValues>({
    resolver: yupResolver(resetPasswordSchema)
  })

  const handleChangePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleResetPassword = async ({ password }: ResetPasswordFormValues) => {
    const response = await supabase.auth.updateUser({ password })
    if (response.error !== null && response.error.name === 'AuthApiError') {
      toast.error('No se pudo restablecer la contraseña')
      return
    }
    router.replace('/')
    router.refresh()
  }

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = (data) => {
    handleResetPassword(data)
  }

  return (
    <main className="h-screen bg-primary">
      <section className="flex flex-col items-center justify-center text-center h-full w-full px-5 pt-8 pb-10">
        <a href="#" className="flex items-center mb-4 text-2xl font-semibold text-primary dark:text-white">
          <img className="w-28 h-28" src="/logos/logo-verde.avif" alt="logo" />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl dark:text-white">
              Restablecer tu contraseña
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div className='relative'>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-primary dark:text-white">Nueva Contraseña</label>
                <input type={showPassword ? 'text' : 'password'} id="password" placeholder="••••••••" {...register('password')} className="bg-gray-50 border border-gray-300 text-primary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <div className='absolute top-8 right-1 hover:text-gray-700 p-1'>
                  <button onClick={handleChangePasswordVisibility} type='button'>
                    {
                      showPassword
                        ? <EyeOffIcon />
                        : <EyeOnIcon />
                    }
                  </button>
                </div>
                {errors.password && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.password.message}</span>}
              </div>
              <div className='relative'>
                <label htmlFor="passwordConfirmation" className="block mb-2 text-sm font-medium text-primary dark:text-white">Confirmar Contraseña</label>
                <input type={showPassword ? 'text' : 'password'} id="passwordConfirmation" placeholder="••••••••" {...register('passwordConfirmation')} className="bg-gray-50 border border-gray-300 text-primary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <div className='absolute top-8 right-1 hover:text-gray-700 p-1'>
                  <button onClick={handleChangePasswordVisibility} type='button'>
                    {
                      showPassword
                        ? <EyeOffIcon />
                        : <EyeOnIcon />
                    }
                  </button>
                </div>
                {errors.passwordConfirmation && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.passwordConfirmation.message}</span>}
              </div>
              <button type="button" onClick={handleSubmit(onSubmit)} className="w-full text-white bg-secondary hover:bg-secondary-dark focus:ring-4 focus:outline-none
              focus:ring-secondary-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center">Restablecer contraseña</button>
            </form>
          </div>
        </div>
      </section>
      <Toaster position="top-center" theme='dark' />
    </main>
  )
}
