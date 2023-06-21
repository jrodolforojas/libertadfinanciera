import { ExchangeRateTable } from './components/ExchangeRateTable'
import { MoneyMetric } from '../components/MoneyMetric'
import { data } from './utils/data'
import { ExchangeRateAreaChart } from './components/ExchangeRateAreaChart'

export function Dashboard () {
  return (
    <section className='flex flex-col w-full'>
      <header>
        <MoneyMetric date='20 Jun 2023' buy={537.61} sale={545.41} label='Tipo de cambio' />
      </header>
      <div className='flex mt-8 gap-6'>
        <ExchangeRateAreaChart
          data={data}
          title='Tipo de cambio de dólares a colones a lo largo del tiempo'
        />
        <ExchangeRateTable
          data={data}
          title='Tipo de cambio de dólares a colones'
        />
      </div>
      <footer className='mt-8 text-center'>
        <p className='text-sm text-gray-500'>
          Los datos utilizados en esta página son obtenidos del {' '}
          <a href='https://www.bccr.fi.cr/' className='text-blue-500 hover:underline'>Banco Central de Costa Rica</a>.
        </p>
      </footer>
    </section>
  )
}
