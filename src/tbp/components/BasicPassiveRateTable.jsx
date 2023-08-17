import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid'
import { Card, Icon, Table, TableBody, TableHead, TableHeaderCell, TableRow, Title } from '@tremor/react'
import { useState } from 'react'
import { BasicPassiveRateTableRow } from './BasicPassiveRateTableRow'

export function BasicPassiveRateTable ({ title, data }) {
  const headers = ['Fecha', 'Valor (%)']

  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(5)

  const endLimit = end >= data.length

  const onNext = () => {
    if (endLimit) return
    setStart(start + 5)
    setEnd(end + 5)
  }

  const startLimit = start === 0
  const onPrevious = () => {
    if (start === 0) return
    setStart(start - 5)
    setEnd(end - 5)
  }

  return (
    <Card className=''>
      <Title>{title}</Title>
      <Table className='mt-5'>
        <TableHead>
          <TableRow>
            {headers.map((header) => (<TableHeaderCell key={header} className='font-bold'>{header}</TableHeaderCell>))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(start, end).map((item) => (
            <BasicPassiveRateTableRow key={item.date} item={item} />
          ))}
        </TableBody>
      </Table>
      <div className='flex justify-end items-center gap-3'>
        <span className='text-sm text-gray-400'>{start + 1} - {end}</span>
        <Icon
          size='xs'
          variant='solid'
          color={startLimit ? 'gray' : 'orange'}
          tooltip={startLimit ? 'Estás en la primera página' : 'Anterior'}
          icon={ArrowLeftIcon}
          onClick={onPrevious}
        />
        <Icon
          size='xs'
          variant='solid'
          color={endLimit ? 'gray' : 'orange'}
          tooltip={endLimit ? 'Estás en la última página' : 'Siguiente'}
          icon={ArrowRightIcon}
          onClick={onNext}
        />
      </div>
    </Card>
  )
}
