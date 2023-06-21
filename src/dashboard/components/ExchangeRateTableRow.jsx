import { TableCell, TableRow, Text } from '@tremor/react'

export function ExchangeRateTableRow ({ item }) {
  const { date, buy, sale } = item
  return (
    <TableRow>
      <TableCell className='text-white'>{date}</TableCell>
      <TableCell>
        <Text className='text-white'>₡ {buy}</Text>
      </TableCell>
      <TableCell>
        <Text className='text-white'>₡ {sale}</Text>
      </TableCell>
    </TableRow>
  )
}
