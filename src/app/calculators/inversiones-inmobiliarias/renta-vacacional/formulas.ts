import { type RentaVacacionalMetric, type RentaVacacionalFormValues } from '@/types/form/renta-vacacional'
import { type MetricCardValue } from '@/types/metric'
import { toTwoDecimals } from '@/utils/metrics-format'

export function calculateRentaVacacional(input: RentaVacacionalFormValues): RentaVacacionalMetric {
  const grossAnualIncome = input.monthyRent * input.rentedMonths
  const anualMaintanenceExpenses = input.maintenanceExpenses * 12
  const netAnualReturn = grossAnualIncome - anualMaintanenceExpenses
  let anualReturnPercent = netAnualReturn / input.initialCapital
  anualReturnPercent = isNaN(anualReturnPercent) ? 0 : anualReturnPercent
  let yearsToGetProfit = input.initialCapital / netAnualReturn
  yearsToGetProfit = isNaN(yearsToGetProfit) ? 0 : yearsToGetProfit
  const monthyReturn = netAnualReturn / 12

  const result: RentaVacacionalMetric = {
    grossAnualIncome,
    netAnualReturn,
    anualReturnPercent,
    yearsToGetProfit,
    monthyReturn
  }
  return result
}

export function generateRentaVacacionalMetrics(result: RentaVacacionalMetric): MetricCardValue[] {
  const anualReturnPercent = result.anualReturnPercent * 100
  return [
    {
      value: `$${toTwoDecimals(result.grossAnualIncome)}`,
      label: 'Rendimiento anual bruto'
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
}

export function onSubmitRentaVacacional(data: RentaVacacionalFormValues): MetricCardValue[] {
  const result = calculateRentaVacacional(data)
  const metrics = generateRentaVacacionalMetrics(result)
  return metrics
}
