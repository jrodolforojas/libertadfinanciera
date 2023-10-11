'use client'

import { EyeOffIcon, EyeOnIcon } from '@/components/icons'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password
    })
    router.replace('/')
    router.refresh()
  }

  const handleChangePasswordVisibility = () => {
    setShowPassword(!showPassword)
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
              Inicia sesión con tu cuenta
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-primary dark:text-white">Correo electrónico</label>
                <input type="email" name="email" id="email" value={email} onChange={handleChangeEmail}
                  className="bg-gray-50 border border-gray-300 text-primary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
              </div>
              <div className='relative'>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-primary dark:text-white">Contraseña</label>
                <input type={showPassword ? 'text' : 'password'} name="password" id="password" placeholder="••••••••" value={password} onChange={handleChangePassword} className="bg-gray-50 border border-gray-300 text-primary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <div className='absolute top-8 right-1 hover:text-gray-700 p-1'>
                  <button onClick={handleChangePasswordVisibility} type='button'>
                    {
                      showPassword
                        ? (
                          <div>
                            <EyeOffIcon />
                          </div>
                          )
                        : (
                          <div>
                            <EyeOnIcon />
                          </div>
                          )
                    }
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <a href="#" className="text-sm font-medium text-primary-light hover:underline dark:text-primary-500">{'¿Olvidaste tu contraseña?'}</a>
              </div>
              <button type="button" onClick={handleSignIn} className="w-full text-white bg-secondary hover:bg-secondary-dark focus:ring-4 focus:outline-none
              focus:ring-secondary-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center">Iniciar Sesión</button>
            </form>
          </div>
        </div>
      </article>
    </section>
  )
}
