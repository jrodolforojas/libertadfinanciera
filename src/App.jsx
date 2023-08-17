import { Link, Route, Switch } from 'wouter'
import { FinancialFreedom } from './financialFreedom'
import { DollarColonesExchangeRate } from './dollar-colones'
import { BasicPassiveRates } from './tbp'

function App () {
  return (
    <div className='flex flex-col justify-between'>
      <header>
        <nav className='flex items-center justify-between flex-wrap p-6 border-b-2 border-gray-900'>
          <ul className='flex'>
            <li className='mr-6'>
              <Link href='/dolar' className='active'>Tipo de Cambio</Link>
            </li>
            <li className='mr-6'>
              <Link href='/tbp' className='active'>Tasa Básica Pasiva (TBP)</Link>
            </li>
            <li className='mr-6'>
              <Link href='/calculadora' className='active'>Calculadora</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className='flex items-center justify-center py-4'>
        <Switch>
          <Route path='/dolar' component={DollarColonesExchangeRate} />
          <Route path='/tbp' component={BasicPassiveRates} />
          <Route path='/calculadora' component={FinancialFreedom} />
          <Route path='/:rest*'>{(params) => `404, Sorry the page ${params.rest} does not exist!`}</Route>
        </Switch>
      </main>
    </div>
  )
}

export default App
