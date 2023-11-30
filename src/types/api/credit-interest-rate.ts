export interface CreditInterestRatesRequest {
  dateFrom: string
  dateTo: string
  country: string
}

export interface CreditInterestRateResponse {
  data: CreditInterestRate[]
}

export interface CreditInterestRate {
  value: number
  date: Date
  dateFormatted?: string
}

export interface CreditInterestRateTodayResponse {
  data: CreditInterestRate
}

export interface CreditInterestRateSpanish {
  valor: number
  fecha: Date
  dateFormatted?: string
}
