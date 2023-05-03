import { FinancialFreedom } from './financialFreedom'

function App () {
  return (
    <div className='flex flex-col justify-between h-screen'>
      <main className='flex items-center justify-center bg-slate-800 w-full sm:p-10 p-0 min-w-min'>
        <FinancialFreedom />
      </main>
      <footer className='flex flex-col bg-gray-900 items-center justify-center p-3'>
        <p className='text-white text-center text-sm mt-1'>Para la comunidad de <a href='https://finanzasconrobertoolivas.com/'>Roberto Olivas</a></p>
        <p className='text-white text-center text-sm'>Creado con ❤️ por <a href='https://www.linkedin.com/in/jrodolforojas/'>@jrodolforojas</a></p>
      </footer>
    </div>
  )
}

export default App
