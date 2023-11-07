export interface RentaVacacionalFormValues {
  initialCapitalOptions?: AdavancedOptionFormValues[] | undefined
  initialCapital: number
  monthyRent: number
  rentedMonths: number
  maintenanceExpenses: number
}

interface AdavancedOptionFormValues {
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
