export interface Route {
  path: string
  name: string
  Icon?: () => JSX.Element
  subRoutes?: Route[]
}
