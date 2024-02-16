import { type LargaEstanciaMetric, type LargaEstanciaFormValues } from '@/types/form/larga-estancia'
import { type MetricCardValue } from '@/types/metric'
import { toTwoDecimals } from '@/utils/metrics-format'

function calculateLargaEstancia(input: LargaEstanciaFormValues): LargaEstanciaMetric {
  const grossAnualIncome = input.monthyRent * input.rentedMonths
  const totalExpenses = input.maintenanceExpenses + input.taxes + input.monthlyMortageLoan * 12
  const netAnualReturn = grossAnualIncome - totalExpenses
  let anualReturnPercent = netAnualReturn / input.initialCapital
  anualReturnPercent = isNaN(anualReturnPercent) ? 0 : anualReturnPercent
  let yearsToGetProfit = input.initialCapital / netAnualReturn
  yearsToGetProfit = isNaN(yearsToGetProfit) ? 0 : yearsToGetProfit
  const monthyReturn = netAnualReturn / 12

  const result: LargaEstanciaMetric = {
    grossAnualIncome,
    taxes: input.taxes,
    netAnualReturn,
    anualReturnPercent,
    yearsToGetProfit,
    monthyReturn
  }

  return result
}

function generateLargaEstanciaMetrics(result: LargaEstanciaMetric): MetricCardValue[] {
  const anualReturnPercent = result.anualReturnPercent * 100
  const newMetrics: MetricCardValue[] = [
    {
      value: `$${toTwoDecimals(result.grossAnualIncome)}`,
      label: 'Ingreso anual bruto'
    },
    {
      value: `$${toTwoDecimals(result.taxes)}`,
      label: 'Impuestos'
    },
    {
      value: `$${toTwoDecimals(result.netAnualReturn)}`,
      label: 'Rendimiento anual neto'
    },
    {
      value: `${toTwoDecimals(anualReturnPercent)} %`,
      label: 'Porcentaje del Rendimiento anual'
    },
    {
      value: `${toTwoDecimals(result.yearsToGetProfit)}`,
      label: 'Años para recuperar la inversión'
    },
    {
      value: `$${toTwoDecimals(result.monthyReturn)}`,
      label: 'Rendimiento mensual neto'
    }
  ]
  return newMetrics
}

export function onSubmitLargaEstancia(data: LargaEstanciaFormValues): MetricCardValue[] {
  const result = calculateLargaEstancia(data)
  const newMetrics = generateLargaEstanciaMetrics(result)
  return newMetrics
}
