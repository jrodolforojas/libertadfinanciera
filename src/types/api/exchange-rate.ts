export interface ExchangeRatesRequest {
  dateFrom: Date
  dateTo: Date
}

export interface ExchangeRateResponse {
  data: ExchangeRate[]
}

export interface ExchangeRate {
  sale: number
  buy: number
  date: Date
  dateFormatted?: string
}

export interface ExchangeRateTodayResponse {
  data: ExchangeRate
}

export interface ExchangeRateSpanish {
  compra: number
  venta: number
  fecha: Date
  dateFormatted?: string
}
