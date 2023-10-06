import MetricCard from '@/components/metric-card'
import NumberInput from '@/components/number-input'
import { type MetricCardValue } from '@/types/metric'

const metricDefaultValues: MetricCardValue[] = [
  {
    value: '240000',
    label: 'Si solamente lo ahorro'
  },
  {
    value: '3871.01',
    label: 'Ingreso pasivo mensual'
  },
  {
    value: '46452.16',
    label: 'Inversión con interés simple'
  },
  {
    value: '46452.16',
    label: 'Valor Calculado'
  },
  {
    value: '46452.16',
    label: 'Segundo Valor calculado'
  }
]
export default function LibertadFinancieraCalculator() {
  return (
    <main className="flex flex-col items-center justify-between px-20 sm:ml-64 sm:mt-5">
      <h2 className="text-2xl font-bold mb-5 text-center text-primary dark:text-white mb-5">Calculadora de Libertad Financiera</h2>
      <section className="flex justify-between w-full max-w-6xl sm:flex-row flex-col">
        <form className="flex flex-col w-full mt-8">
          <NumberInput input={{
            id: 'initialCapital',
            label: 'Capital Inicial',
            placeholder: '10000'
          }} />
          <NumberInput input={{
            id: 'mensualInvestment',
            label: 'Inversión mensual',
            placeholder: '1000'
          }} />
          <NumberInput input={{
            id: 'years',
            label: 'Cantidad de años',
            placeholder: '20'
          }} />
          <NumberInput input={{
            id: 'averageAnnualReturn',
            label: 'Rendimiento promedio anual',
            placeholder: '10'
          }} />
          <NumberInput input={{
            id: 'inflation',
            label: 'Inflación histórica',
            placeholder: '3'
          }} />
          <button type="button"
            className="text-white w-full bg-secondary hover:bg-blue-800 focus:ring-4
          focus:ring-blue-300 font-medium rounded-lg
          text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600
          dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Calcular</button>
        </form>
        <div className="flex mt-8 sm:ml-10 w-full">
          <MetricCard metrics={metricDefaultValues} />
        </div>
      </section>
    </main>
  )
}
