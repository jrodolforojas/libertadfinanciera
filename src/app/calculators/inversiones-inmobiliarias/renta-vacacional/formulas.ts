import { type RentaVacacionalMetric, type RentaVacacionalFormValues } from '@/types/form/renta-vacacional'

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
