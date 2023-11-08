import { type LargaEstanciaMetric, type LargaEstanciaFormValues } from '@/types/form/larga-estancia'
import { type MetricCardValue } from '@/types/metric'
import { toDollarCurrency, toTwoDecimals } from '@/utils/metrics-format'

function calculateLargaEstancia(input: LargaEstanciaFormValues): LargaEstanciaMetric {
  const grossAnualIncome = input.monthyRent * input.rentedMonths
  const taxes = input.initialCapital * 0.0025
  const netAnualReturn = grossAnualIncome - input.maintenanceExpenses - taxes
  const anualReturnPercent = netAnualReturn / input.initialCapital
  const yearsToGetProfit = input.initialCapital / netAnualReturn
  const monthyReturn = netAnualReturn / 12

  const result: LargaEstanciaMetric = {
    grossAnualIncome,
    taxes,
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
      value: `${toDollarCurrency(result.grossAnualIncome)}`,
      label: 'Ingreso anual bruto'
    },
    {
      value: `${toDollarCurrency(result.taxes)}`,
      label: 'Impuestos'
    },
    {
      value: `${toDollarCurrency(result.netAnualReturn)}`,
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
      value: `${toDollarCurrency(result.monthyReturn)}`,
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
