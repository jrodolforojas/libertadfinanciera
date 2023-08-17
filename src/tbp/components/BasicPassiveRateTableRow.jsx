import { TableCell, TableRow, Text } from '@tremor/react'

export function BasicPassiveRateTableRow ({ item }) {
  const { date, value } = item
  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <TableCell>
        <Text>{value}</Text>
      </TableCell>
    </TableRow>
  )
}
