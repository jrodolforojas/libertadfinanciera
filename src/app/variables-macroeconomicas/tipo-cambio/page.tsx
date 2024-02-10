import AreaChart from '@/components/area-chart'
import MetricCard from '@/components/metric-card'
import Range from '@/components/range'
import Table from '@/components/table'
import { getAllExchangeRates, getExchangeRatesByPeriocity, getTodayExchangeRate } from '@/services/api/exchange-rates'
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
  const { dateFrom: dateFromParam, dateTo: dateToParam, periocity: periocityParam } = searchParams

  let dateFrom = format(thirtyDaysAgo, 'yyyy/MM/dd')
  let dateTo = format(today, 'yyyy/MM/dd')
  let periocity = 'monthly'

  if (typeof periocityParam === 'string') {
    periocity = periocityParam
  }
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

  let exchangeRatesByPeriocity
  if (periocity === 'monthly') {
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    exchangeRatesByPeriocity = await getAllExchangeRates({ dateFrom: format(firstDayOfMonth, 'yyyy/MM/dd'), dateTo: format(today, 'yyyy/MM/dd') })
  } else {
    exchangeRatesByPeriocity = await getExchangeRatesByPeriocity(periocity)
  }

  const exchangeRatesByPeriocityData = exchangeRatesByPeriocity.map(item => {
    const spanishItem: ExchangeRateSpanish = {
      compra: item.buy,
      venta: item.sale,
      fecha: item.date,
      dateFormatted: item.dateFormatted,
      devaluacion: item.devaluation
    }
    return spanishItem
  })

  const historicDescription = 'Valores del Tipo de Cambio de Dólar a Colones del Banco Central de Costa Rica a lo largo del tiempo.'

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
          <span className='text-sm text-primary'>{historicDescription}</span>
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
              <Table data={exchangeRatesByPeriocityData} columns={['Fecha', 'Compra', 'Venta', 'Devaluación(%)']} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </article>
      <footer className="mt-5 pb-5">
        <p className='text-sm text-gray-500 text-center'>
          Los datos utilizados en esta página son obtenidos del {' '}
          <a href='https://gee.bccr.fi.cr/indicadoreseconomicos/Cuadros/frmVerCatCuadro.aspx?CodCuadro=400&Idioma=1' target='_blank' className='text-secondary hover:underline' rel="noreferrer">Banco Central de Costa Rica</a>.
        </p>
      </footer>
    </section>
  )
}
