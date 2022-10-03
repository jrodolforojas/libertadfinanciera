import { Dashboard } from '../pages/Dashboard'
import { Portfolio } from '../pages/Portfolio'
import { Calculator } from '../pages/Calculator'
import { TransactionScanner } from '../pages/TransactionScanner'

export const routes = [
  { path: '/dashboard', component: Dashboard, name: 'Dashboard', icon: 'chart-line' },
  { path: '/portfolio', component: Portfolio, name: 'Portafolio', icon: 'wallet' },
  { path: '/calculator', component: Calculator, name: 'Calculadoras', icon: 'calculator' },
  { path: '/scanner', component: TransactionScanner, name: 'Escaner', icon: 'cart-arrow-down' }
]
