import React from 'react'

export const TransactionScannerTable = ({ transactions }) => {
  const columns = ['Date', 'Type', 'Description', 'Debit', 'Credit', 'Balance']

  return (
    <table className='w-1/2'>
      <thead>
        <tr className='text-blue-800'>
          {columns.map((column, index) => <th key={index}>{column}</th>)}
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => {
          return (
            <tr key={index} className='mt-2 text-center'>
              <td>{transaction.date}</td>
              <td>{transaction.type}</td>
              <td>{transaction.description}</td>
              <td>{transaction.debit}</td>
              <td>{transaction.credit}</td>
              <td>{transaction.balance}</td>
            </tr>
          )
        }
        )}
      </tbody>
    </table>
  )
}
