import AreaChart from "@/components/area-chart"
import MetricCard from "@/components/metric-card"
import Range from "@/components/range"
import Table from "@/components/table"
import { EXCHANGE_RATES } from '@/mocks/exchange-rate-mock'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react"
import { format } from "date-fns"
import { COUNTRIES } from "@/app/variables-macroeconomicas/inflacion/tabs"

export default function CountryInflationPage({ params }: { params: { id: string } }) {
  const { id } = params

  const currentCountry = COUNTRIES.find(country => country.id === id)

  if (!currentCountry) {
    return null
  }

  return (
    <section className="flex w-full mt-5 flex-col">
      <header>
        <div>
          <h3 className='text-2xl font-bold text-blue-text'>Hoy en {currentCountry.label}</h3>
          <MetricCard metrics={[
            { label: 'Tasa Básica Pasiva', value: '5.58', symbol: { value: '%', orientation: 'right' } },
            { label: 'Fecha de actualización', value: format(new Date(), 'dd/mm/yyyy') },
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
      <main>
        <TabGroup className="mt-4">
          <TabList>
            <Tab>Gráfico</Tab>
            <Tab>Tabla</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <AreaChart
                data={EXCHANGE_RATES}
                categories={['buy', 'sale']}
                colors={['green', 'cyan']}
                title='Gráfico Tasa de Inflación en Costa Rica' />
            </TabPanel>
            <TabPanel>
              <Table />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </main>
      <footer className="mt-8 pb-8">
        <p className='text-sm text-gray-500 text-center'>
          Los datos utilizados en esta página son obtenidos del {' '}
          <a href='https://www.bccr.fi.cr/' className='text-secondary hover:underline'>Banco Central de Costa Rica</a>.
        </p>
      </footer>
    </section>
  )
}