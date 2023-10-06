export interface MetricCardValue {
  value: string
  label: string
  symbol?: {
    value: string
    orientation: 'left' | 'right'
  }
}
