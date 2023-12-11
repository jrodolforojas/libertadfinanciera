import * as yup from 'yup'

export const portfolioSchema = yup.object({
  investments: yup.array().of(yup.object().shape({
    goal: yup.string().required(),
    months: yup.number().required(),
    initialInvestment: yup.number().required(),
    monthlyInvestment: yup.number().required(),
    todayValue: yup.number().required(),
    type: yup.string().required().oneOf(['compuesto', 'simple']),
    anualInterest: yup.number().required()
  }))
})
