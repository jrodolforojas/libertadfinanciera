import * as yup from 'yup'

export const rentaVacacionalSchema = yup.object({
  initialCapital: yup.number()
    .typeError('Capital inicial debe ser un valor numérico')
    .required('Capital inicial es un campo requerido')
    .min(0, 'Capital inicial debe ser mayor o igual a 0'),
  initialCapitalOptions: yup.array().of(yup.object().shape({
    name: yup.string()
      .required('Campo requerido'),
    amount: yup.number()
      .required('Debe ser un valor numérico')
      .typeError('Debe ser un valor numérico')
      .min(0, 'Debe ser mayor o igual a 0')
  })),
  monthyRent: yup.number()
    .typeError('Alquiler mensual debe ser un valor numérico')
    .required('Alquiler mensual es un campo requerido')
    .min(0, 'Alquiler mensual debe ser mayor o igual a 0'),
  rentedMonths: yup.number()
    .typeError('Cantidad de meses alquilado debe ser un valor numérico')
    .required('Cantidad de meses alquilado es un campo requerido')
    .min(0, 'Cantidad de meses alquilado debe ser mayor o igual a 0')
    .max(12, 'Cantidad de meses alquilado debe como máximo 12'),
  maintenanceExpenses: yup.number()
    .typeError('Gastos de mantenimiento debe ser un valor numérico')
    .required('Gastos de mantenimiento es un campo requerido')
    .min(0, 'Gastos de mantenimiento debe ser mayor o igual a 0')
})

export const getSchema = ({ initialOptionsIsActive }: {
  initialOptionsIsActive: boolean
}) => {
  return yup.object({
    initialCapital: yup.array().of(yup.object().shape({
      name: yup.string(),
      amount: yup.number().min(0, 'Debe ser mayor o igual a 0')
    })),
    monthyRent: yup.number()
      .typeError('Alquiler mensual debe ser un valor numérico')
      .required('Alquiler mensual es un campo requerido')
      .min(0, 'Alquiler mensual debe ser mayor o igual a 0'),
    rentedMonths: yup.number()
      .typeError('Cantidad de meses alquilado debe ser un valor numérico')
      .required('Cantidad de meses alquilado es un campo requerido')
      .min(0, 'Cantidad de meses alquilado debe ser mayor o igual a 0')
      .max(12, 'Cantidad de meses alquilado debe como máximo 12'),
    maintenanceExpenses: yup.number()
      .typeError('Gastos de mantenimiento debe ser un valor numérico')
      .required('Gastos de mantenimiento es un campo requerido')
      .min(0, 'Gastos de mantenimiento debe ser mayor o igual a 0')
  })
}
