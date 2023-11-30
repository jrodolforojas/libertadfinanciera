import { type RentaVacacionalFormValues, type AdvancedOption } from '@/types/form/renta-vacacional'
import { type MetricCardValue } from '@/types/metric'

export const rentaVacionalDefaultValues: MetricCardValue[] = [
  {
    value: '$ 0',
    label: 'Rendimiento anual bruto'
  },
  {
    value: '$ 0',
    label: 'Rendimiento anual neto'
  },
  {
    value: '0 %',
    label: 'Porcentaje del Rendimiento anual'
  },
  {
    value: '0',
    label: 'Años para recuperar la inversión'
  },
  {
    value: '$ 0',
    label: 'Rendimiento mensual neto'
  }
]

export const initialCapitalAdvancedDefaultOptions: AdvancedOption[] = [
  {
    id: crypto.randomUUID(),
    name: 'Materiales y Arquitecta',
    amount: 0,
    percent: 0
  },
  {
    id: crypto.randomUUID(),
    name: 'Mano de Obra',
    amount: 0,
    percent: 0
  },
  {
    id: crypto.randomUUID(),
    name: 'Lote',
    amount: 0,
    percent: 0
  },
  {
    id: crypto.randomUUID(),
    name: 'Electrodomésticos',
    amount: 0,
    percent: 0
  },
  {
    id: crypto.randomUUID(),
    name: 'Permisos y servicios',
    amount: 0,
    percent: 0
  }
]

export const monthyExpenseAdvancedDefaultOptions: AdvancedOption[] = [
  {
    id: crypto.randomUUID(),
    name: 'Comisión co-host',
    amount: 0,
    percent: 0
  },
  {
    id: crypto.randomUUID(),
    name: 'Impuestos',
    amount: 0,
    percent: 0
  },
  {
    id: crypto.randomUUID(),
    name: 'Mantenimiento',
    amount: 0,
    percent: 0
  },
  {
    id: crypto.randomUUID(),
    name: 'Seguro',
    amount: 0,
    percent: 0
  },
  {
    id: crypto.randomUUID(),
    name: 'Servicios públicos',
    amount: 0,
    percent: 0
  }
]

export const initialCapitalDefaultValues: RentaVacacionalFormValues = {
  initialCapitalOptions: initialCapitalAdvancedDefaultOptions,
  monthlyRentOptions: {
    pricePerNight: 0,
    capacityPerMonth: 0
  },
  initialCapital: 0,
  monthyRent: 0,
  rentedMonths: 0,
  maintenanceExpenses: 0,
  maintenanceExpensesOptions: monthyExpenseAdvancedDefaultOptions
}
