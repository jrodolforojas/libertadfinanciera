'use client'

import { EyeOffIcon, EyeOnIcon } from '@/components/icons'
import { type LoginFormValues } from '@/types/form/login'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Toaster, toast } from 'sonner'
import Link from 'next/link'

const loginSchema = yup.object({
  email: yup.string().email('Debe ser un correo electrónico válido').required('Correo electrónico es un campo requerido'),
  password: yup.string().required('Contraseña es un campo requerido').min(6, 'Contraseña debe ser mayor a 6 caracteres')
})

export default function LoginForm() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema)
  })

  const handleChangePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSignIn = async ({ email, password }: LoginFormValues) => {
    const response = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (response.error !== null && response.error.name === 'AuthApiError') {
      toast.error('Credenciales inválidas')
      return
    }
    router.replace('/')
    router.refresh()
  }

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    handleSignIn(data)
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
              Inicia sesión con tu cuenta
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-primary dark:text-white">Correo electrónico</label>
                <input type="email" id="email" {...register('email')}
                  className="bg-gray-50 border border-gray-300 text-primary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="usuario@robertoolivasm.com" />
                {errors.email && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email.message}</span>}
              </div>
              <div className='relative'>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-primary dark:text-white">Contraseña</label>
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
              <div className="flex items-center justify-between">
                <Link href='/forgot-password' className="text-sm font-medium text-primary-light hover:underline dark:text-primary-500">¿Olvidaste tu contraseña?</Link>
              </div>
              <button type="button" onClick={handleSubmit(onSubmit)} className="w-full text-white bg-secondary hover:bg-secondary-dark focus:ring-4 focus:outline-none
              focus:ring-secondary-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center">Iniciar Sesión</button>
            </form>
          </div>
        </div>
      </section>
      <Toaster position="top-center" theme='dark' />
    </main>
  )
}
