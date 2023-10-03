import { TablerIconsProps } from "@tabler/icons-react"

export type Route = {
  path: string
  name: string
  Icon?: (props: TablerIconsProps) => JSX.Element
  subRoutes?: Route[]
}