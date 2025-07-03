'use client'

import { createClient } from '@/utils/supabase/client'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Toaster, toast } from 'sonner'
import { type Database } from '@/types/entities/database'
import { type ForgotPasswordFormValues } from '@/types/form/forgot-password'

const forgotPasswordSchema = yup.object({
  email: yup.string().email('Debe ser un correo electrónico válido').required('Correo electrónico es un campo requerido')
})

export default function ForgotPasswordForm() {
  const supabase = createClient()
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(forgotPasswordSchema)
  })

  const handleForgotPassword = async ({ email }: ForgotPasswordFormValues) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    // check if error is AuthError
    if (error?.status) {
      toast.error('Error al enviar el correo electrónico de recuperación de contraseña')
      return
    }
    toast.success(`Correo electrónico de recuperación de contraseña enviado a ${email}`)
  }

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = (data) => {
    handleForgotPassword(data)
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <article className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 bg-primary">
        <a href="#" className="flex items-center mb-4 text-2xl font-semibold text-primary dark:text-white">
          <img className="w-28 h-28" src="/logos/logo-verde.avif" alt="logo" />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl dark:text-white">
              Olvidaste tu contraseña
            </h1>
            <span className='text-sm text-primary'>Te enviaremos un link de recuperación de contraseña</span>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-primary dark:text-white">Correo electrónico</label>
                <input type="email" id="email" {...register('email')}
                  className="bg-gray-50 border border-gray-300 text-primary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="recovery@robertoolivasm.com" />
                {errors.email && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email.message}</span>}
              </div>
              <button type="button" onClick={handleSubmit(onSubmit)} className="w-full text-white bg-secondary hover:bg-secondary-dark focus:ring-4 focus:outline-none
              focus:ring-secondary-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center">Enviar link de recuperación</button>
            </form>
          </div>
        </div>
      </article>
      <Toaster position="top-center" theme='dark' />
    </section>
  )
}
