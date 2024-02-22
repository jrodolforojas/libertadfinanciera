'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import * as yup from 'yup'

interface InviteUserResponse {
  message: string
  error: boolean
}
const schema = yup.object().shape({
  email: yup.string().email('Debe ser un correo electrónico válido').required('Correo electrónico es un campo requerido')
})
export default function SignUpPage() {
  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: { email: string }) => {
    const response = await fetch(`/invite-user?email=${data.email}`)
    const { error, message } = await response.json() as InviteUserResponse
    if (error) {
      toast.error(message)
      return
    }
    toast.success(message)
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
              Solicitar invitación de acceso
            </h1>
            <h3 className="text-sm text-primary mt-5">
              <strong>Importante:</strong> Este formulario es para solicitar una invitación de acceso a la plataforma. Si ya tienes una cuenta, inicia sesión <Link href="/login" className="text-secondary hover:text-secondary-dark">aquí</Link>.
            </h3>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-primary dark:text-white">Correo electrónico</label>
                <input type="email" id="email" {...register('email')}
                  className="bg-gray-50 border border-gray-300 text-primary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="usuario@robertoolivasm.com" />
                {errors.email && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email.message}</span>}
              </div>
              <button type="button" onClick={handleSubmit(onSubmit)}
                className="w-full text-white bg-secondary hover:bg-secondary-dark focus:ring-4 focus:outline-none
              focus:ring-secondary-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center">Enviar invitación</button>
            </form>
          </div>
        </div>
      </section>
      <Toaster position="top-center" theme='dark' />
    </main>
  )
}
