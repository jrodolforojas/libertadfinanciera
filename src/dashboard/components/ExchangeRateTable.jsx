import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  Title
} from '@tremor/react'
import { ExchangeRateTableRow } from './ExchangeRateTableRow'

export function ExchangeRateTable ({ title, data }) {
  const headers = ['Fecha', 'Compra', 'Venta']

  return (
    <Card className='bg-slate-800'>
      <Title className='text-white'>{title}</Title>
      <Table className='mt-5'>
        <TableHead>
          <TableRow>
            {headers.map((header) => (<TableHeaderCell key={header} className='text-white font-bold'>{header}</TableHeaderCell>))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(0, 5).map((item) => (
            <ExchangeRateTableRow key={item.date} item={item} />
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
