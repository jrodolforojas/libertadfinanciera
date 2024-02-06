import MetricCard from '@/components/metric-card'
import Range from '@/components/range'
import { format } from 'date-fns'
import { COUNTRIES } from '@/app/variables-macroeconomicas/inflacion/tabs'
import { getAllCountryInterestRates, getTodayCountryInterestRate } from '@/services/api/country-interest-rates'
import { type CountryInterestRateSpanish } from '@/types/api/country-interest-rate'
import { toTwoDecimals } from '@/utils/metrics-format'
import { AreaChart, Card, Title } from '@tremor/react'

const today = new Date()
const thirtyDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30)
const monetaryPolicyRateMinimumDate = new Date(2006, 2, 16)
const treasuryRateMinimumDate = new Date(2005, 3, 1)

export default async function CountryTasaInteres({ params, searchParams }: {
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

  const [todayCountryRate, countryInterestRates] = await Promise.all([
    getTodayCountryInterestRate({ country: currentCountry.id }),
    getAllCountryInterestRates({ dateFrom, dateTo, country: currentCountry.id })
  ])

  const todayRateLabel = currentCountry.id === 'usa' ? 'Tasa del Tesoro' : 'Tasa Política Monetaria'

  const data = countryInterestRates.reverse().map(item => {
    const rate: CountryInterestRateSpanish = {
      valor: item.value,
      fecha: item.date,
      dateFormatted: item.dateFormatted
    }
    return rate
  })

  const minimumDate = currentCountry.id === 'usa' ? treasuryRateMinimumDate : monetaryPolicyRateMinimumDate

  return (
    <section className="flex w-full mt-5 flex-col">
      <header>
        <div>
          <h3 className='text-2xl font-bold text-blue-text'>Hoy en {currentCountry.label}</h3>
          <MetricCard metrics={[
            { label: todayRateLabel, value: toTwoDecimals(todayCountryRate.value), symbol: { value: '%', orientation: 'right' } },
            { label: 'Fecha de actualización', value: todayCountryRate.dateFormatted ?? '', symbol: { value: '', orientation: 'right' } }
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
        <Card className='mt-6'>
          <Title>{`Gráfico de comportamiento de ${todayRateLabel} en ${currentCountry.label}`}</Title>
          <AreaChart
            className='mt-5'
            index='dateFormatted'
            data={data}
            categories={['valor']}
            colors={['cyan']}
            noDataText='No hay datos para mostrar'
          />
        </Card>
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
