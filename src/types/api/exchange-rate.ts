export interface ExchangeRatesRequest {
  dateFrom: string
  dateTo: string
}

export interface ExchangeRateResponse {
  data: ExchangeRate[]
}

export interface ExchangeRate {
  sale: number
  buy: number
  date: Date
  dateFormatted?: string
  devaluation?: number
}

export interface ExchangeRateTodayResponse {
  data: ExchangeRate
}

export interface ExchangeRateSpanish {
  compra: number
  venta: number
  fecha: Date
  dateFormatted?: string
  devaluacion?: number
}
