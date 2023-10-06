export type ExchangeRatesRequest = {
  dateFrom: Date
  dateTo: Date
}

export type ExchangeRateResponse = {
  data: ExchangeRate[]
}

export type ExchangeRate = {
  sale: number
  buy: number
  date: Date
  dateFormatted?: string
}

export type ExchangeRateTodayResponse = {
  data: ExchangeRate
}

export type ExchangeRateSpanish = {
  compra: number
  venta: number
  fecha: Date
  dateFormatted?: string
}