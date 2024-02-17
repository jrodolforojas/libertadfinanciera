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

export const toCurrency = (value: number) => {
  const formattedNumber = Math.round(value).toString()
  return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const toOneDecimal = (value: number) => {
  return value.toFixed(1)
}
