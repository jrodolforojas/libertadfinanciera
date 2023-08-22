import { Card, Metric, Tab, TabGroup, TabList, TabPanel, TabPanels, Text } from '@tremor/react'
import { DateRangeSpanish } from '../components/DateRangeSpanish'
import { ExchangeRateAreaChart } from '../dollar-colones/components/ExchangeRateAreaChart'
import { BasicPassiveRateTable } from './components/BasicPassiveRateTable'
import { useBasicPassiveRates } from '../hooks/useBasicPassiveRates'

export function BasicPassiveRates () {
  const { todayBasicPassiveRate, basicPassiveRates, dateRange, onChangeDateRange } = useBasicPassiveRates()

  return (
    <section className='flex flex-col w-full max-w-7xl justify-between'>
      <header>
        <h2 className='text-2xl font-bold text-white'>Tasa Básica Pasiva (TBP)</h2>
        <Card className='flex items-center justify-between my-5'>
          <div className='flex flex-col items-center justify-center'>
            <Metric>{todayBasicPassiveRate.value} %</Metric>
            <Text>Tasa Básica Pasiva</Text>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <Metric>{todayBasicPassiveRate.date}</Metric>
            <Text>Última actualización 6:00 pm.</Text>
          </div>
        </Card>
      </header>
      <blockquote className='flex flex-col justify-between'>
        <h2 className='text-2xl font-bold text-white'>Histórico</h2>
        <div className='flex items-center justify-between flex-row'>
          <span className='text-sm text-gray-400'>Filtra el tipo de cambio por rango de fechas</span>
          <DateRangeSpanish dateRange={dateRange} onChange={onChangeDateRange} />
        </div>
        <TabGroup>
          <TabList className='mt-8'>
            <Tab>Gráfico Área</Tab>
            <Tab>Tabla</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ExchangeRateAreaChart
                data={basicPassiveRates}
                categories={['value']}
                colors={['orange']}
                minValue={1}
                title='Valores de la Tasa Básica Pasiva a lo largo del tiempo'
              />
            </TabPanel>
            <TabPanel>
              <BasicPassiveRateTable
                data={basicPassiveRates}
                title='Valores de la Tasa Básica Pasiva a lo largo del tiempo'
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>
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
