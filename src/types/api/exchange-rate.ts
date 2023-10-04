export type ExchangeRateResponse = {
  data: ExchangeRate[]
}

export type ExchangeRate = {
  sale: number
  buy: number
  date: Date
}