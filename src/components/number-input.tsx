import { type Input } from '@/types/input'

export default function NumberInput({ input }: {
  input: Input
}) {
  const { id, label, placeholder } = input
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-blue-primary">{label}</label>
      <input type='number' id={id}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
          focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700
          dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
          dark:focus:ring-blue dark:focus:border-blue dark:shadow-sm-light"
        placeholder={placeholder} />
    </div>
  )
}
