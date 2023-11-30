export interface RentaVacacionalFormValues {
  initialCapitalOptions?: AdvancedOptionFormValues[] | undefined
  monthlyRentOptions?: {
    pricePerNight?: number | undefined
    capacityPerMonth?: number | undefined
  } | undefined
  initialCapital: number
  monthyRent: number
  rentedMonths: number
  maintenanceExpenses: number
  maintenanceExpensesOptions?: AdvancedOptionFormValues[] | undefined
}

interface AdvancedOptionFormValues {
  name: string
  amount: number
}

export interface AdvancedOption {
  id: string
  name: string
  amount: number
  percent: number
}

export interface RentaVacacionalMetric {
  grossAnualIncome: number
  netAnualReturn: number
  anualReturnPercent: number
  yearsToGetProfit: number
  monthyReturn: number
}
