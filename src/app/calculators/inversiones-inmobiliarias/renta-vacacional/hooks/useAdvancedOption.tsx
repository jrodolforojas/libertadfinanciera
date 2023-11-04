'use client'

import { type AdvancedOption } from '@/types/form/renta-vacacional'
import { useState } from 'react'
import useSwitch from './useSwitch'

export default function useAdvancedOption({ defaultValues }: {
  defaultValues: AdvancedOption[]
}) {
  const { isActive, isSelected, toggleValue } = useSwitch()
  const [options, setOptions] = useState<AdvancedOption[]>(defaultValues)

  const handleAddOption = () => {
    const newOption: AdvancedOption = {
      id: crypto.randomUUID(),
      name: 'Nuevo elemento',
      amount: 1000,
      percent: 0
    }
    setOptions([...options, newOption])
  }

  const handleRemoveOption = (id: string) => {
    const optionsWithoutItem = options.filter(option => option.id !== id)
    setOptions(optionsWithoutItem)
  }

  return {
    isActive,
    isSelected,
    options,
    toggleValue,
    handleAddOption,
    handleRemoveOption
  }
}
