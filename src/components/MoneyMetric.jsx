import { Card, Text, Metric, Flex, Title } from '@tremor/react'

export function MoneyMetric ({ label, buy, sale, date }) {
  return (
    <Card className='max-w-xs mx-auto'>
      <Title>{label}</Title>
      <Flex className=''>
        <Metric>₡ {buy}</Metric>
        <Text>Compra</Text>
      </Flex>
      <Flex className=''>
        <Metric>₡ {sale}</Metric>
        <Text>Venta</Text>
      </Flex>
      <Flex className='mt-4'>
        <Text>{date}</Text>
      </Flex>
    </Card>
  )
}
