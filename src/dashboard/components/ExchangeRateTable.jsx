import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title
} from '@tremor/react'

export function ExchangeRateTable ({ data }) {
  return (
    <Card className='bg-slate-800'>
      <Title className='text-white'>Tipo de cambio de compra y venta de dólares a colones</Title>
      <Table className='mt-5'>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Fecha</TableHeaderCell>
            <TableHeaderCell>Compra</TableHeaderCell>
            <TableHeaderCell>Venta</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(0, 5).map((item) => (
            <TableRow key={item.date}>
              <TableCell>{item.date}</TableCell>
              <TableCell>
                <Text>₡ {item.buy}</Text>
              </TableCell>
              <TableCell>
                <Text>₡ {item.sale}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Text className='mt-4'>Fuente: Banco Central de Costa Rica</Text>
    </Card>
  )
}
