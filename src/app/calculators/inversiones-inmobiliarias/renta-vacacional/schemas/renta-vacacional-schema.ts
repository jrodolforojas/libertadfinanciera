import * as yup from 'yup'

export const rentaVacacionalSchema = yup.object({
  initialCapital: yup.number()
    .typeError('Capital inicial debe ser un valor numérico')
    .required('Capital inicial es un campo requerido')
    .min(0, 'Capital inicial debe ser mayor o igual a 0')
    .max(999999999, 'Capital inicial debe ser menor a 999999999'),
  initialCapitalOptions: yup.array().of(yup.object().shape({
    name: yup.string()
      .required('Campo requerido'),
    amount: yup.number()
      .required('Debe ser un valor numérico')
      .typeError('Debe ser un valor numérico')
      .min(0, 'Debe ser mayor o igual a 0')
      .max(999999999, 'Debe ser menor a 999999999')
  })),
  monthyRent: yup.number()
    .typeError('Alquiler mensual debe ser un valor numérico')
    .required('Alquiler mensual es un campo requerido')
    .min(0, 'Alquiler mensual debe ser mayor o igual a 0')
    .max(999999999, 'Alquiler mensual debe ser menor a 999999999'),
  monthlyRentOptions: yup.object().shape({
    pricePerNight: yup.number()
      .typeError('Precio por noche debe ser un valor numérico')
      .min(0, 'Precio por noche debe ser mayor o igual a 0')
      .max(999999999, 'Precio por noche debe ser menor a 999999999'),
    capacityPerMonth: yup.number()
      .typeError('Capacidad por mes debe ser un valor numérico')
      .min(0, 'Capacidad por mes debe ser mayor o igual a 0')
      .max(100, 'Capacidad por mes debe ser menor o igual a 100')
  }).optional(),
  rentedMonths: yup.number()
    .typeError('Cantidad de meses alquilado debe ser un valor numérico')
    .required('Cantidad de meses alquilado es un campo requerido')
    .min(0, 'Cantidad de meses alquilado debe ser mayor o igual a 0')
    .max(12, 'Cantidad de meses alquilado debe como máximo 12'),
  maintenanceExpenses: yup.number()
    .typeError('Gastos de mantenimiento debe ser un valor numérico')
    .required('Gastos de mantenimiento es un campo requerido')
    .min(0, 'Gastos de mantenimiento debe ser mayor o igual a 0')
    .max(999999999, 'Gastos de mantenimiento debe ser menor a 999999999'),
  maintenanceOptions: yup.array().of(yup.object().shape({
    name: yup.string()
      .required('Campo requerido'),
    amount: yup.number()
      .required('Campo requerido')
      .typeError('Debe ser un valor numérico')
      .min(0, 'Debe ser mayor o igual a 0')
      .max(999999999, 'Debe ser menor a 999999999')
  }))
})
