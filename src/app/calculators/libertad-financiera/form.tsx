'use client'

import Logo from '@/components/logo'
import useSwitch from '../inversiones-inmobiliarias/renta-vacacional/hooks/useSwitch'
import FinancialFreedomForm from './form-financial-freedom'
import PassiveIncomesCalculatorForm from './form-passive-incomes'

export default function FinalcialFreedomCalculatorForm() {
  const { isSelected, isActive, toggleValue } = useSwitch()
  return (
    <main className="flex flex-col items-center justify-between px-10 sm:ml-64 sm:mt-5 pb-8">
      <Logo />
      <h2 className="text-2xl font-bold text-center text-primary dark:text-white mb-5">Calculadora de Libertad Financiera</h2>
      <label className="relative inline-flex items-center cursor-pointer mb-5">
        <input type="checkbox" id='initialCapitalCheckbox' className="sr-only peer" onChange={toggleValue} value={isSelected} />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm text-gray-900 dark:text-gray-300">Calculadora de ingresos pasivos</span>
      </label>
      {isActive
        ? (
          <PassiveIncomesCalculatorForm />
        )
        : (
          <FinancialFreedomForm />
        )}
    </main>
  )
}
