'use client'

import { type ExchangeRateSpanish } from '@/types/api/exchange-rate'
import PeriocityPills from './periocity-pills'
import { toTwoDecimals } from '@/utils/metrics-format'
import { BadgeDelta } from '@tremor/react'

export default function Table({ data, columns }: {
  data: ExchangeRateSpanish[]
  columns: string[]
}) {
  return (
    <div>
      <PeriocityPills />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-primary dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map(column => (
                <th scope="col" key={column} className="px-6 py-3 text-secondary">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.dateFormatted} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.dateFormatted}
                </th>
                <td className="px-6 py-4">
                  {item.compra}
                </td>
                <td className="px-6 py-4">
                  {item.venta}
                </td>
                <td className="px-6 py-4">
                  {item.devaluacion != null
                    ? (
                      <BadgeDelta
                        deltaType={item.devaluacion < 0 ? 'moderateDecrease' : item.devaluacion === 0 ? 'unchanged' : 'moderateIncrease'} size="xs">
                        {toTwoDecimals(item.devaluacion ?? 0)}%
                      </BadgeDelta>
                      )
                    : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
