export const MONTHS_IN_YEAR = 12
export function getFutureValue ({
  initialCapital, paymentPerPeriod, years, yearlyInterestRate, paymentIsDueAtBeginningOfPeriod
}) {
  const rate = yearlyInterestRate / MONTHS_IN_YEAR
  const nper = years * MONTHS_IN_YEAR
  const pmt = paymentPerPeriod
  const pv = initialCapital
  const type = paymentIsDueAtBeginningOfPeriod ? 1 : 0

  const pow = Math.pow(1 + rate, nper)
  let fv

  if (rate) {
    fv = (pmt * (1 + rate * type) * (1 - pow) / rate) - pv * pow
  } else {
    fv = -1 * (pv + pmt * nper)
  }
  return fv
}

export function getPresentValue ({ rate, nper, pmt = 0, fv, type = 0 }) {
  if (rate === 0) return -pmt * nper - fv

  return (((1 - Math.pow(1 + rate, nper)) / rate) * pmt * (1 + rate * type) - fv) / Math.pow(1 + rate, nper)
}
