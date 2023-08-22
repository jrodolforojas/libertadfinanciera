import { TableCell, TableRow, Text } from '@tremor/react'

export function ExchangeRateTableRow ({ item }) {
  const { date, buy, sale } = item
  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <TableCell>
        <Text>₡ {buy}</Text>
      </TableCell>
      <TableCell>
        <Text>₡ {sale}</Text>
      </TableCell>
    </TableRow>
  )
}
