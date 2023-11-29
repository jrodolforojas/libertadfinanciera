import AreaChart from '@/components/area-chart'
import MetricCard from '@/components/metric-card'
import Range from '@/components/range'
import Table from '@/components/table'
import { getAllExchangeRates, getTodayExchangeRate } from '@/services/api/exchange-rates'
import { type ExchangeRateSpanish } from '@/types/api/exchange-rate'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react'
import { format } from 'date-fns'

const today = new Date()
const thirtyDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30)
const minimumDate = new Date(1983, 1, 1)

export default async function DollarColonesExchangeRate({ searchParams }: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const todayExchangeRate = await getTodayExchangeRate()
  const { dateFrom: dateFromParam, dateTo: dateToParam } = searchParams

  let dateFrom = format(thirtyDaysAgo, 'yyyy/MM/dd')
  let dateTo = format(today, 'yyyy/MM/dd')

  if (typeof dateFromParam === 'string' && typeof dateToParam === 'string') {
    dateFrom = dateFromParam
    dateTo = dateToParam
  }

  const exchangeRates = await getAllExchangeRates({ dateFrom, dateTo })

  const data = exchangeRates.reverse().map(item => {
    const test: ExchangeRateSpanish = {
      compra: item.sale,
      venta: item.buy,
      fecha: item.date,
      dateFormatted: item.dateFormatted
    }
    return test
  })

  return (
    <section className="flex w-full mt-5 flex-col">
      <header>
        <div>
          <h3 className='text-2xl font-bold text-blue-text'>Hoy</h3>
          <MetricCard metrics={[
            { label: 'Compra', value: todayExchangeRate.buy.toString(), symbol: { value: '₡', orientation: 'left' } },
            { label: 'Venta', value: todayExchangeRate.sale.toString(), symbol: { value: '₡', orientation: 'left' } }
          ]} />
        </div>
        <div className="mt-5">
          <h3 className='text-2xl font-bold text-blue-text'>Histórico</h3>
          <span>Valores de la tasa de inflación a lo largo del tiempo.</span>
          <div className='flex items-center justify-between flex-col mt-3'>
            <span className='text-sm text-gray-text'>Filtra por rango de fechas</span>
            <div className="flex w-full mt-2 items-center justify-center">
              <Range minimumDate={minimumDate} />
            </div>
          </div>
        </div>
      </header>
      <article>
        <TabGroup>
          <TabList>
            <Tab>Gráfico</Tab>
            <Tab>Tabla</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <AreaChart
                data={data}
                categories={['compra', 'venta']}
                colors={['green', 'cyan']}
                title='Gráfico Tipo de Cambio Dólar a Colones' />
            </TabPanel>
            <TabPanel>
              <Table data={data} columns={['Fecha', 'Compra', 'Venta']} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </article>
      <footer className="mt-5">
        <p className='text-sm text-gray-500 text-center'>
          Los datos utilizados en esta página son obtenidos del {' '}
          <a href='https://www.bccr.fi.cr/' className='text-secondary hover:underline'>Banco Central de Costa Rica</a>.
        </p>
      </footer>
    </section>
  )
}
