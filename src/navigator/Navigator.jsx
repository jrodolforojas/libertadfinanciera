import { Redirect, Route, Switch } from 'wouter'
import { routes } from './routes'

export const Navigator = () => {
  return (
    <Switch>
      {routes.map(({ path, component }, index) => <Route key={index} path={path} component={component}/>)}
      <Redirect to='/dashboard'/>
    </Switch>
  )
}
