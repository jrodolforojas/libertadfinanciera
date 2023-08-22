import { Link, Route, Switch } from 'wouter'
import { FinancialFreedom } from './financialFreedom'
import { DollarColonesExchangeRate } from './dollar-colones'
import { BasicPassiveRates } from './tbp'
import { NotFound } from './NotFound'

function App () {
  return (
    <div className='flex flex-col justify-between'>
      <header>
        <nav className='items-center justify-between flex-wrap p-6 border-b-2 border-gray-800'>
          <ul className='flex gap-x-2'>
            <li className='mr-6'>
              <Link href='/dolar' className='active hover:text-white text-gray-300 hover:scale-125'>Tipo de Cambio</Link>
            </li>
            <li className='mr-6'>
              <Link href='/tbp' className='active hover:text-white text-gray-300 hover:scale-125'>Tasa Básica Pasiva (TBP)</Link>
            </li>
            <li className='mr-6'>
              <Link href='/' className='active hover:text-white text-gray-300 hover:scale-125'>Calculadora</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className='flex items-center justify-center py-4'>
        <Switch>
          <Route path='/dolar' component={DollarColonesExchangeRate} />
          <Route path='/tbp' component={BasicPassiveRates} />
          <Route path='/' component={FinancialFreedom} />
          <Route path='/:rest*'>{() => <NotFound />}</Route>
        </Switch>
      </main>
    </div>
  )
}

export default App
