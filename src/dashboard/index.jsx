import { useEffect, useState } from 'react'
import { ExchangeRateTable } from './components/ExchangeRateTable'
import { ExchangeRateAreaChart } from './components/ExchangeRateAreaChart'
import { getAllExchangeRates } from '../services/exchangeRateApi'
import { Card, Metric, Tab, TabGroup, TabList, TabPanel, TabPanels, Text } from '@tremor/react'
import { DateRangeSpanish } from '../components/DateRangeSpanish'

export function Dashboard () {
  const [exchangeRates, setExchangeRates] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getAllExchangeRates().then((data) => {
      setExchangeRates(data)
      setIsLoading(false)
    }).catch((error) => {
      console.log({ error })
    })
  }, [])

  const todayExchangeRate = exchangeRates[0]

  if (isLoading) {
    return (
      <section className='flex flex-col w-full max-w-7xl'>
        <header>
          <h2 className='text-2xl font-bold'>Cargando</h2>
        </header>
      </section>
    )
  }

  return (
    <section className='flex flex-col w-full max-w-7xl'>
      <header>
        <h2 className='text-2xl font-bold text-white'>Tipo de cambio Hoy</h2>
        <Card className='flex items-center justify-between my-5'>
          <div className='flex flex-col items-center justify-center'>
            <Metric>₡ {todayExchangeRate.sale}</Metric>
            <Text>Compra</Text>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <Metric>₡ {todayExchangeRate.buy}</Metric>
            <Text>Venta</Text>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <Metric>{todayExchangeRate.date}</Metric>
            <Text>Última actualización 6:00 pm.</Text>
          </div>
        </Card>
      </header>
      <blockquote>
        <h2 className='text-2xl font-bold text-white'>Histórico</h2>
        <span className='text-sm text-gray-400'>Muestra el valor del colón con respecto al dólar a lo largo del tiempo.</span>
        <DateRangeSpanish />
        <TabGroup>
          <TabList className='mt-8'>
            <Tab>Gráfico Área</Tab>
            <Tab>Tabla</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ExchangeRateAreaChart
                data={exchangeRates}
                title='Tipo de cambio de dólares a colones'
              />
            </TabPanel>
            <TabPanel>
              <ExchangeRateTable
                data={exchangeRates}
                title='Tipo de cambio de dólares a colones'
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>
        <footer className='mt-8 text-center'>
          <p className='text-sm text-gray-500'>
            Los datos utilizados en esta página son obtenidos del {' '}
            <a href='https://www.bccr.fi.cr/' className='text-blue-500 hover:underline'>Banco Central de Costa Rica</a>.
          </p>
        </footer>
      </blockquote>
    </section>
  )
}
