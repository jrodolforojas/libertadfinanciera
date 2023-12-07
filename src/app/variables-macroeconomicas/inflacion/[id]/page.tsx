import MetricCard from '@/components/metric-card'
import Range from '@/components/range'
import { format } from 'date-fns'
import { COUNTRIES } from '@/app/variables-macroeconomicas/inflacion/tabs'
import { getAllInflationRates, getInflationRatesByPeriocity, getTodayInflationRate } from '@/services/api/inflation-interest-rates'
import { toTwoDecimals } from '@/utils/metrics-format'
import { type InflationRate, type InflationRateSpanish } from '@/types/api/inflation-interest-rate'
import { AreaChart, Card, Tab, TabGroup, TabList, TabPanel, TabPanels, Title } from '@tremor/react'
import PeriocityPills from '@/components/periocity-pills'

const today = new Date()
const thirtyDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30)
const costaRicaInflationMinimumDate = new Date(1976, 0, 1)
const usaInflationMinimumDate = new Date(1913, 0, 1)

export default async function InflationInterestRatePage({ params, searchParams }: {
  params: { id: string }
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { id } = params

  const currentCountry = COUNTRIES.find(country => country.id === id)

  if (currentCountry == null) {
    return null
  }

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

  const todayRate = await getTodayInflationRate({ country: currentCountry.id })

  const minimumDate = currentCountry.id === 'usa' ? usaInflationMinimumDate : costaRicaInflationMinimumDate

  const inflationRates = await getAllInflationRates({ dateFrom, dateTo, country: currentCountry.id })

  let inflationRatesByPeriocity: InflationRate[] = []
  if (periocity === 'monthly') {
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
    inflationRatesByPeriocity = await getAllInflationRates({ dateFrom: format(firstDayOfMonth, 'yyyy/MM/dd'), dateTo: format(today, 'yyyy/MM/dd'), country: currentCountry.id })
  } else {
    inflationRatesByPeriocity = await getInflationRatesByPeriocity({ country: currentCountry.id, periocity })
  }

  const data = inflationRates.reverse().map(item => {
    const rate: InflationRateSpanish = {
      valor: item.value,
      fecha: item.date,
      dateFormatted: item.dateFormatted
    }
    return rate
  })

  const inflationRatesByPeriocityData = inflationRatesByPeriocity.map(item => {
    const rate: InflationRateSpanish = {
      valor: item.value,
      fecha: item.date,
      dateFormatted: item.dateFormatted
    }
    return rate
  })
  const columns = ['Fecha', 'Valor']
  return (
    <section className="flex w-full mt-5 flex-col">
      <header>
        <div>
          <h3 className='text-2xl font-bold text-blue-text'>Hoy en {currentCountry.label}</h3>
          <MetricCard metrics={[
            { label: 'Porcentaje de inflación', value: toTwoDecimals(todayRate.value), symbol: { value: '%', orientation: 'right' } },
            { label: 'Fecha de actualización', value: todayRate.dateFormatted ?? '', symbol: { value: '', orientation: 'right' } }
          ]} />
        </div>
        <div className="mt-5">
          <h3 className='text-2xl font-bold text-blue-text'>Histórico</h3>
          <span>Valores de la tasa de inflación a lo largo del tiempo.</span>
          <div className='flex items-center justify-between flex-col mt-2'>
            <span className='text-sm text-gray-text'>Filtra por rango de fechas</span>
            <div className="flex w-full mt-2 items-center justify-center">
              <Range minimumDate={minimumDate} />
            </div>
          </div>
        </div>
      </header>
      <article>
        {currentCountry.id === 'usa'
          ? (
            <Card className='mt-6'>
              <Title>{`Gráfico de comportamiento de la inflación en ${currentCountry.label}`}</Title>
              <AreaChart
                className='mt-5'
                index='dateFormatted'
                data={data}
                categories={['valor']}
                colors={['cyan']}
                noDataText='No hay datos para mostrar'
              />
            </Card>
          )
          : (
            <TabGroup>
              <TabList>
                <Tab>Gráfico</Tab>
                <Tab>Tabla</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Card>
                    <Title>{`Gráfico de comportamiento de la inflación en ${currentCountry.label}`}</Title>
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
                  <div>
                    <PeriocityPills />
                    {inflationRatesByPeriocity.length > 0
                      ? (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-full">
                          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-white uppercase bg-primary dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                {columns.map(column => (
                                  <th scope="col" key={column} className="px-6 py-3 text-secondary">
                                    {column}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {inflationRatesByPeriocityData.map(item => (
                                <tr key={item.dateFormatted} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.dateFormatted}
                                  </th>
                                  <td className="px-6 py-4">
                                    {item.valor}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )
                      : (
                        <div className='flex items-center justify-center w-full'>
                          <span className="px-6 py-4 text-primary text-sm font-bold">No hay datos para mostrar</span>
                        </div>
                      )}
                  </div>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          )}
      </article>
      <footer className="mt-8 pb-5">
        <p className='text-sm text-gray-500 text-center'>
          Los datos utilizados en esta página son obtenidos del {' '}
          <a href='https://www.bccr.fi.cr/' className='text-green-primary hover:underline'>Banco Central de Costa Rica</a>.
        </p>
      </footer>
    </section>
  )
}
