
export function InputRange ({ inputName, label, min, max, value, onChange, isPorcentage = false, isYears = false }) {
  return (
    <div>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex mt-1'>
          <label htmlFor={`${inputName}-range`} className='block text-sm font-medium text-slate-400'>{label}</label>
          {!isYears && <span className='text-slate-400 text-sm ml-2'>{isPorcentage ? '(%)' : '($)'}</span>}
        </div>
        <input
          type='number' className='border text-lg rounded-lg text-center
          focus:ring-orange-500 p-2.5 border-gray-800 bg-slate-800 placeholder-gray-400 text-white mb-1'
          value={value}
          onChange={onChange}
        />

      </div>
      <div className='flex items-center px-4'>
        <input
          id={`${inputName}-range`}
          value={value}
          onChange={onChange}
          type='range'
          min={min}
          max={max}
          className='w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700 accent-orange-600'
        />
      </div>
    </div>
  )
}
