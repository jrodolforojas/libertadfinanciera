export function ResultLabel ({ value, label }) {
  return (
    <div className='flex justify-center flex-col sm:flex-row items-center'>
      <p className='text-white text-xl text-center'>{label}:</p>
      <p className='text-orange-500 text-2xl ml-2'>${value}</p>
    </div>
  )
}
