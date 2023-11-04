'use client'

import { useState } from 'react'
import { type AdvancedOption } from '@/types/form/renta-vacacional'
import DeleteAdvancedOption from './delete-advanced-option'

export default function AdvancedOptionItem({ option, handleRemove, updateGlobal }: {
  option: AdvancedOption
  handleRemove: () => void
  updateGlobal: () => void
}) {
  const [text, setText] = useState('')
  const [value, setValue] = useState(0)

  const handleChangeText = (event: any) => {
    setText(event.target.value)
  }

  const handleChangeValue = (event: any) => {
    setValue(event.target.value)
    option.amount = event.targe.value
    updateGlobal()
  }
  return (
    <li className='flex flex-row gap-3'>
      <input type="text" id="advanced-option-1-name" onChange={handleChangeText} value={text}
        className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
        placeholder={option.name} />
      <input type='number' id='advanced-option-1-amount' onChange={handleChangeValue} value={value}
        className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
        placeholder={option.amount.toString()} />
      <span id="advanced-option-1-percent"
        className="mb-2 text-primary text-sm text-center flex items-center justify-center w-12">
        {option.percent.toString()}
      </span>
      <DeleteAdvancedOption onClick={handleRemove} />
    </li>
  )
}
