import { Link, Route, Switch } from 'wouter'
import { FinancialFreedom } from './financialFreedom'
import { Dashboard } from './dashboard'

function App () {
  return (
    <div className='flex flex-col justify-between'>
      <header>
        <nav className='flex items-center justify-between flex-wrap p-6 border-b-2 border-gray-900'>
          <ul className='flex'>
            <li className='mr-6'>
              <Link href='/dashboard' className='active'>Dashboard</Link>
            </li>
            <li className='mr-6'>
              <Link href='/calculadora' className='active'>Calculadora</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className='flex items-center justify-center w-full sm:p-10 p-0 min-w-min'>
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/calculadora' component={FinancialFreedom} />
          <Route path='/:rest*'>{(params) => `404, Sorry the page ${params.rest} does not exist!`}</Route>
        </Switch>
      </main>
    </div>
  )
}

export default App
