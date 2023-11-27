export interface CountryInterestRatesRequest {
  dateFrom: string
  dateTo: string
  country: string
}

export interface CountryInterestRateResponse {
  data: CountryInterestRate[]
}

export interface CountryInterestRate {
  value: number
  date: Date
  dateFormatted?: string
}

export interface CountryInterestRateTodayResponse {
  data: CountryInterestRate
}

export interface CountryInterestRateSpanish {
  valor: number
  fecha: Date
  dateFormatted?: string
}
