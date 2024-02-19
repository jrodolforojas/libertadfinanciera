'use client'

import { createIssue } from '@/services/github/issues'
import { type ReportBugRequest } from '@/types/api/report-bug'
import { yupResolver } from '@hookform/resolvers/yup'
import { Select, SelectItem } from '@tremor/react'
import { Controller, useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import * as yup from 'yup'

const schema = yup.object().shape({
  title: yup.string().required('El título es requerido'),
  description: yup.string().required('La descripción es requerida'),
  type: yup.string().required('El tipo es requerido').oneOf(['bug', 'feature', 'improvement'], 'El tipo no es válido')
})

interface ReportBugFormProps {
  title: string
  description: string
  type: string
}

export default function ReportBugForm({ userEmail }: { userEmail: string }) {
  const { register, control, formState: { errors }, handleSubmit } = useForm<ReportBugFormProps>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: ReportBugFormProps) => {
    const issue: ReportBugRequest = {
      title: data.title,
      description: data.description,
      type: data.type,
      user: userEmail
    }
    const response = await createIssue({ issue })
    if (response.error) {
      toast.error('Error al reportar el issue')
      return
    }
    toast.success('Issue creado correctamente')
  }

  return (
    <form className="flex flex-col w-full items-center justify-center max-w-2xl">
      <div className="mb-6 w-full">
        <label htmlFor='title' className="block mb-2 text-sm font-medium text-blue-primary">Título</label>
        <input type='text' id='title' {...register('title')}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
          placeholder='Error al hacer conversión de tipo de cambio' />
        {errors.title && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.title.message}</span>}
      </div>
      <div className="mb-6 mb-6 w-full">
        <label htmlFor='description' className="block mb-2 text-sm font-medium text-blue-primary">Descripción</label>
        <textarea id='description' {...register('description')}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
          placeholder='El error se da cuando intento hacer la conversión de 5000 dólares a colones me devuelve un valor incorrecto.
          Los pasos para replicar el error fueron ...' />
        {errors.description && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.description.message}</span>}
      </div>
      <div className="mb-6 w-full">
        <label htmlFor='type' className="block mb-2 text-sm font-medium text-blue-primary">Tipo</label>
        <Controller control={control} name='type' render={({ field }) => (
          <Select placeholder='Selecciona...' id='type' value={field.value} onChange={field.onChange} defaultValue=''>
            <SelectItem value='bug'>Error en la plataforma</SelectItem>
            <SelectItem value='feature'>Nueva funcionalidad</SelectItem>
            <SelectItem value='improvement'>Mejora a funcionalidad existente</SelectItem>
          </Select>
        )} />
        {errors.type && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.type.message}</span>}
      </div>
      <button type="button" onClick={handleSubmit(onSubmit)}
        className="text-white w-full bg-secondary hover:bg-blue-800 focus:ring-4 mt-5 transition
          focus:ring-blue-300 font-medium rounded-lg
          text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600
          dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Reportar</button>
      <Toaster position="top-center" theme='dark' />
    </form>
  )
}
