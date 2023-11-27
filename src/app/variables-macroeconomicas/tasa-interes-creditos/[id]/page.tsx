import MetricCard from '@/components/metric-card'
import Range from '@/components/range'
import { COUNTRIES } from '@/app/variables-macroeconomicas/inflacion/tabs'
import { getAllCreditInterestRates, getTodayCreditInterestRate } from '@/services/api/credit-interest-rates'
import { toTwoDecimals } from '@/utils/metrics-format'
import { type CreditInterestRateSpanish } from '@/types/api/credit-interest-rate'
import { AreaChart, Card, Tab, TabGroup, TabList, TabPanel, TabPanels, Title } from '@tremor/react'
import { format } from 'date-fns'

const today = new Date()
const thirtyDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30)

export default async function CreditInterestRates({ params, searchParams }: {
  params: { id: string }
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { id } = params

  const currentCountry = COUNTRIES.find(country => country.id === id)

  if (currentCountry === undefined) {
    return null
  }

  const { dateFrom: dateFromParam, dateTo: dateToParam } = searchParams

  let dateFrom = format(thirtyDaysAgo, 'yyyy/MM/dd')
  let dateTo = format(today, 'yyyy/MM/dd')

  if (typeof dateFromParam === 'string' && typeof dateToParam === 'string') {
    dateFrom = dateFromParam
    dateTo = dateToParam
  }

  const todayRate = await getTodayCreditInterestRate({ country: currentCountry.id })

  const todayRateLabel = currentCountry.id === 'usa' ? 'New York Prime' : 'Tasa Básica Pasiva'

  const creditInterestRates = await getAllCreditInterestRates({ dateFrom, dateTo, country: currentCountry.id })

  const data = creditInterestRates.reverse().map(item => {
    const test: CreditInterestRateSpanish = {
      valor: item.value,
      fecha: item.date,
      dateFormatted: item.dateFormatted
    }
    return test
  })

  return (
    <section className="flex w-full mt-5 flex-col">
      <header>
        <div>
          <h3 className='text-2xl font-bold text-blue-text'>Hoy en {currentCountry.label}</h3>
          <MetricCard metrics={[
            { label: todayRateLabel, value: toTwoDecimals(todayRate.value), symbol: { value: '%', orientation: 'right' } },
            { label: 'Fecha de actualización', value: todayRate.dateFormatted ?? '', symbol: { value: '', orientation: 'right' } }
          ]} />
        </div>
        <div className="mt-5">
          <h3 className='text-2xl font-bold text-blue-text'>Histórico</h3>
          <span>Valores de la tasa de inflación a lo largo del tiempo.</span>
          <div className='flex items-center justify-between flex-col mt-3'>
            <span className='text-sm text-gray-text'>Filtra por rango de fechas</span>
            <div className="flex w-full mt-2 items-center justify-center">
              <Range />
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
              <Card>
                <Title>Gráfico</Title>
                <AreaChart
                  className='mt-5'
                  index='dateFormatted'
                  data={data}
                  categories={['valor']}
                  colors={['cyan']}
                  noDataText='No hay datos para mostrar'
                />
              </Card>
            </TabPanel>
            <TabPanel>
              {/* <Table data={data} columns={['Fecha', 'Compra', 'Venta']} /> */}
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </article>
      <footer className="mt-8 pb-8">
        <p className='text-sm text-gray-500 text-center'>
          Los datos utilizados en esta página son obtenidos del {' '}
          <a href='https://www.bccr.fi.cr/' className='text-secondary hover:underline'>Banco Central de Costa Rica</a>.
        </p>
      </footer>
    </section>
  )
}
