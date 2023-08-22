import { InputRange } from './components/InputRange'
import { useFinancialFreedomCalculator } from '../hooks/useFinancialFreedomCalculator'
import { Button, Card, Metric, Text } from '@tremor/react'

export function FinancialFreedom () {
  const {
    onlySaveIt,
    pasiveIncome,
    investWithSimpleInterest,
    initialCapital,
    handleChangeInitialCapital,
    paymentPerPeriod,
    handleChangePaymentPerPeriod,
    years,
    handleChangeYears,
    yearlyInterestRate,
    handleChangeYearlyInterestRate,
    historicInflation,
    handleChangeHistoricInflation,
    calculateCompoundInterest
  } = useFinancialFreedomCalculator()

  return (
    <section className='w-full max-w-7xl justify-center sm:p-0 p-3'>
      <header className='justify-center'>
        <h2 className='text-2xl font-bold text-white mb-5'>Calculadora de Libertad Financiera</h2>
        <Card className='flex sm:flex-row justify-between items-center flex-col  sm:gap-y-0 gap-y-5'>
          <div className='flex flex-col items-center justify-center'>
            <Metric>${onlySaveIt}</Metric>
            <Text>Si solamente ahorro</Text>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <Metric>${pasiveIncome}</Metric>
            <Text>Ingreso pasivo mensual</Text>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <Metric>${investWithSimpleInterest}</Metric>
            <Text>Inversión con interés simple</Text>
          </div>
        </Card>
      </header>
      <div className='flex justify-center w-full gap-x-11 my-5 flex-col'>
        <form className='w-full' onSubmit={calculateCompoundInterest}>
          <InputRange
            inputName='initialCapital'
            label='Capital inicial'
            value={initialCapital}
            onChange={handleChangeInitialCapital}
            min={0}
            max={500000}
          />
          <InputRange
            inputName='paymentPerPeriod'
            label='Inversión mensual'
            min={100}
            max={5000}
            value={paymentPerPeriod}
            onChange={handleChangePaymentPerPeriod}
          />
          <InputRange inputName='years' label='Cantidad de años' min={1} max={100} value={years} onChange={handleChangeYears} isYears />
          <InputRange
            inputName='yearlyInterestRate' label='Rendimiento promedio anual' min={0} max={20} value={yearlyInterestRate}
            onChange={handleChangeYearlyInterestRate} isPorcentage
          />
          <InputRange
            isPorcentage
            inputName='historicInflation'
            label='Inflación histórica'
            min={0}
            max={20}
            value={historicInflation}
            onChange={handleChangeHistoricInflation}
          />
          <Button className='w-full p-4 mt-4' color='orange'>Reiniciar</Button>
        </form>
      </div>
    </section>
  )
}
