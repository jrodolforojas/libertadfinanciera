export interface InflationRatesRequest {
  dateFrom: string
  dateTo: string
  country: string
}

export interface InflationRateResponse {
  data: InflationRate[]
}

export interface InflationRate {
  value: number
  date: Date
  dateFormatted?: string
  devaluation?: number
}

export interface InflationRateTodayResponse {
  data: InflationRate
}

export interface InflationRateSpanish {
  valor: number
  fecha: Date
  dateFormatted?: string
  devaluacion?: number
}
