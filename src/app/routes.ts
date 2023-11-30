import type { Route } from '@/types/route'

const userRoutes: Route[] = [
  {
    name: 'Calculadoras',
    path: '/calculators',
    subRoutes: [
      {
        name: 'Libertad Financiera',
        path: '/calculators/libertad-financiera'
      },
      {
        name: 'Créditos Hipotecarios',
        path: '/calculators/creditos-hipotecarios'
      },
      {
        name: 'Inversiones Inmobiliarias',
        path: '/calculators/inversiones-inmobiliarias/larga-estancia',
        subRoutes: [
          {
            name: 'Larga Estancia',
            path: '/calculators/inversiones-inmobiliarias/larga-estancia'
          },
          {
            name: 'Renta Vacacional',
            path: '/calculators/inversiones-inmobiliarias/renta-vacacional'
          }
        ]
      }
    ]
  },
  {
    name: 'Variables Macroeconómicas',
    path: '/variables-macroeconomicas',
    subRoutes: [
      {
        name: 'Tasa de Inflación',
        path: '/variables-macroeconomicas/inflacion/cr',
        subRoutes: [
          { name: 'Costa Rica', path: '/variables-macroeconomicas/inflacion/cr' },
          { name: 'Estados Unidos', path: '/variables-macroeconomicas/inflacion/us' }
        ]
      },
      {
        name: 'Tasa de Interés',
        path: '/variables-macroeconomicas/tasa-interes-pais/cr'
      },
      {
        name: 'Tasa de Interés Créditos',
        path: '/variables-macroeconomicas/tasa-interes-creditos/cr'
      },
      {
        name: 'Tipo de Cambio',
        path: '/variables-macroeconomicas/tipo-cambio'
      }
    ]
  },
  {
    name: 'Portafolio de Inversiones',
    path: '/portafolio'
  }
]

const adminRoutes: Route[] = [
  {
    name: 'Usuarios',
    path: '/admin/users'
  }
]

const ADMIN_ROLE_ID = process.env.ADMINISTRATOR_ROLE_ID

export const getRoutes = ({ role }: { role: string }) => {
  if (role === ADMIN_ROLE_ID) {
    const routes = [
      ...adminRoutes,
      ...userRoutes
    ]
    return routes
  }

  return userRoutes
}
