import { ExchangeRateTable } from './components/ExchangeRateTable'
import { data } from './utils/data'
import { ExchangeRateAreaChart } from './components/ExchangeRateAreaChart'
import { Card, Metric, Text } from '@tremor/react'

export function Dashboard () {
  return (
    <section className='flex flex-col w-full max-w-7xl'>
      <header>
        <h2 className='text-2xl font-bold'>Tipo de cambio hoy</h2>
        <Card className='flex items-center justify-between my-5'>
          <div className='flex flex-col items-center justify-center'>
            <Metric>₡ 537.61</Metric>
            <Text>Compra</Text>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <Metric>₡ 537.61</Metric>
            <Text>Venta</Text>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <Metric>20 Jun 2023</Metric>
            <Text>Última actualización 6:00 pm.</Text>
          </div>
        </Card>
      </header>
      <blockquote>
        <h2 className='text-2xl font-bold'>Histórico</h2>
        <span className='text-sm text-gray-400'>Muestra el valor del colón con respecto al dólar a lo largo del tiempo.</span>
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
      </blockquote>
      <footer className='mt-8 text-center'>
        <p className='text-sm text-gray-500'>
          Los datos utilizados en esta página son obtenidos del {' '}
          <a href='https://www.bccr.fi.cr/' className='text-blue-500 hover:underline'>Banco Central de Costa Rica</a>.
        </p>
      </footer>
    </section>
  )
}
