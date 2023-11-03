import { type RentaVacacionalMetric, type RentaVacacionalFormValues } from '@/types/form/renta-vacacional'
import { type MetricCardValue } from '@/types/metric'

export function calculateRentaVacacional(input: RentaVacacionalFormValues): RentaVacacionalMetric {
  const grossAnualIncome = input.monthyRent * input.rentedMonths
  const anualMaintanenceExpenses = input.maintenanceExpenses * 12
  const netAnualReturn = grossAnualIncome - anualMaintanenceExpenses
  const anualReturnPercent = netAnualReturn / input.initialCapital
  const yearsToGetProfit = input.initialCapital / netAnualReturn
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
      value: `$ ${result.grossAnualIncome.toFixed(0)}`,
      label: 'Rendimiento anual bruto'
    },
    {
      value: `$ ${result.netAnualReturn.toFixed(0)}`,
      label: 'Rendimiento anual neto'
    },
    {
      value: `${anualReturnPercent.toFixed(0)} %`,
      label: 'Porcentaje del Rendimiento anual'
    },
    {
      value: `${result.yearsToGetProfit.toFixed(0)}`,
      label: 'Años para recuperar la inversión'
    },
    {
      value: `$ ${result.monthyReturn.toFixed(0)}`,
      label: 'Rendimiento mensual neto'
    }
  ]
}

export function onSubmitRentaVacacional(data: RentaVacacionalFormValues): MetricCardValue[] {
  const result = calculateRentaVacacional(data)
  const metrics = generateRentaVacacionalMetrics(result)
  return metrics
}
