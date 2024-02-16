export const toDollarCurrency = (value: number) => {
  const formattingOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }

  return value.toLocaleString('en-US', formattingOptions)
}

const formatNumber = (num: number) => {
  const [integerPart, decimalPart] = num.toFixed(2).split('.')
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const formattedNumber = `${formattedInteger}.${decimalPart}`

  return formattedNumber
}

export const toTwoDecimals = (value: number) => {
  return formatNumber(value)
}
