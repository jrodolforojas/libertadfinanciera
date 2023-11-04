export const toDollarCurrency = (value: number) => {
  const formattingOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }

  return value.toLocaleString('en-US', formattingOptions)
}

export const toTwoDecimals = (value: number) => {
  return value.toFixed(2)
}
