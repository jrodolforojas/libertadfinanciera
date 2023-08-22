import { NumberInput } from '@tremor/react'

export function InputRange ({ inputName, label, min, max, value, onChange, isPorcentage = false, isYears = false }) {
  return (
    <div className='flex flex-col justify-center items-center pb-4'>
      <label htmlFor={inputName} className='block text-sm font-medium text-slate-400 mb-2'>{label}</label>
      <NumberInput
        id={inputName}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        enableStepper={false}
      />

    </div>
  )
}
