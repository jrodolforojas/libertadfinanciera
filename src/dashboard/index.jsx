import { AreaChart, Card, Text, Title } from '@tremor/react'
import { ExchangeRateTable } from './components/ExchangeRateTable'
import { MoneyMetric } from '../components/MoneyMetric'

const data = [
  {
    sale: 542,
    buy: 534.03,
    date: '22 May 2023'
  },
  {
    sale: 543.57,
    buy: 537.47,
    date: '23 May 2023'
  },
  {
    sale: 543.21,
    buy: 537.22,
    date: '24 May 2023'
  },
  {
    sale: 543.12,
    buy: 537.92,
    date: '25 May 2023'
  },
  {
    sale: 545.04,
    buy: 538.54,
    date: '26 May 2023'
  },
  {
    sale: 546.88,
    buy: 541.41,
    date: '27 May 2023'
  },
  {
    sale: 546.88,
    buy: 541.41,
    date: '28 May 2023'
  },
  {
    sale: 546.88,
    buy: 541.41,
    date: '29 May 2023'
  },
  {
    sale: 547.45,
    buy: 540.56,
    date: '30 May 2023'
  },
  {
    sale: 546.7,
    buy: 540.35,
    date: '31 May 2023'
  },
  {
    sale: 546.19,
    buy: 539.05,
    date: '1 Jun 2023'
  },
  {
    sale: 545.79,
    buy: 539.74,
    date: '2 Jun 2023'
  },
  {
    sale: 545.84,
    buy: 537.33,
    date: '3 Jun 2023'
  },
  {
    sale: 545.84,
    buy: 537.33,
    date: '4 Jun 2023'
  },
  {
    sale: 545.84,
    buy: 537.33,
    date: '5 Jun 2023'
  },
  {
    sale: 544.28,
    buy: 536.71,
    date: '6 Jun 2023'
  },
  {
    sale: 543.13,
    buy: 536.84,
    date: '7 Jun 2023'
  },
  {
    sale: 544.4,
    buy: 537.21,
    date: '8 Jun 2023'
  },
  {
    sale: 546.19,
    buy: 540.4,
    date: '9 Jun 2023'
  },
  {
    sale: 547.44,
    buy: 540.64,
    date: '10 Jun 2023'
  },
  {
    sale: 547.44,
    buy: 540.64,
    date: '11 Jun 2023'
  },
  {
    sale: 547.44,
    buy: 540.64,
    date: '12 Jun 2023'
  },
  {
    sale: 548.23,
    buy: 541.2,
    date: '13 Jun 2023'
  },
  {
    sale: 547.74,
    buy: 542.11,
    date: '14 Jun 2023'
  },
  {
    sale: 546.65,
    buy: 540.44,
    date: '15 Jun 2023'
  },
  {
    sale: 545.7,
    buy: 539.19,
    date: '16 Jun 2023'
  },
  {
    sale: 545.78,
    buy: 537.98,
    date: '17 Jun 2023'
  },
  {
    sale: 545.78,
    buy: 537.98,
    date: '18 Jun 2023'
  },
  {
    sale: 545.78,
    buy: 537.98,
    date: '19 Jun 2023'
  },
  {
    sale: 545.41,
    buy: 537.61,
    date: '20 Jun 2023'
  }
]

const dataFormatter = (number) => {
  return '₡ ' + number
}

export function Dashboard () {
  return (
    <section className='flex flex-col w-full'>
      <header>
        <MoneyMetric date='20 Jun 2023' buy={537.61} sale={545.41} label='Tipo de cambio' />
      </header>
      <div className='flex mt-8 gap-6'>
        <Card>
          <Title>Tipo de cambio de dólares a colones a lo largo del tiempo</Title>
          <AreaChart
            className='h-72 mt-4'
            data={data}
            index='date'
            categories={['buy', 'sale']}
            colors={['indigo', 'cyan']}
            formatter={dataFormatter}
            autoMinValue={400}
          />
          <Text className='mt-4'>Fuente: Banco Central de Costa Rica</Text>
        </Card>
        <ExchangeRateTable data={data} />
      </div>
    </section>
  )
}
