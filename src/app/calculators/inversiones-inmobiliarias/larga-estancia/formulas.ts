import { type LargaEstanciaMetric, type LargaEstanciaFormValues } from '@/types/form/larga-estancia'

export function calculateLargaEstancia(input: LargaEstanciaFormValues): LargaEstanciaMetric {
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
