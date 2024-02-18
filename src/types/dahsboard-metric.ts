export interface DashboardMetric {
  value: number
  date: string
  symbol: '$' | '%' | ''
  path: string
  flag?: string
}
