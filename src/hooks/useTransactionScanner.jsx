import { useState } from 'react'
import Papa from 'papaparse'
import { ALLOWED_EXTENSIONS } from '../utils/constants'

export const useTransactionScanner = () => {
  const [transactions, setTransactions] = useState([])
  const [error, setError] = useState()
  const [file, setFile] = useState()

  const handleFileChange = event => {
    if (event.target.files.length) {
      const inputFile = event.target.files[0]
      const fileExtension = inputFile.type.split('/')[1]

      if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
        setError('Incorrect file type')
      }

      setFile(inputFile)
    }
  }

  const convertCSVDataToObject = (transaction) => {
    return {
      id: transaction[1],
      date: transaction[0],
      type: transaction[2],
      description: transaction[3],
      debit: transaction[4],
      credit: transaction[5],
      balance: transaction[6]
    }
  }

  const handleScan = () => {
    if (!file) return setError('Enter a valid file')

    const fileReader = new FileReader()
    fileReader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result)
      const csvData = csv.data

      const parsedData = []
      csvData.slice(1).forEach(transaction => {
        const objectTransaction = convertCSVDataToObject(transaction)
        parsedData.push(objectTransaction)
      })
      setTransactions(parsedData)
    }
    fileReader.readAsText(file)
  }

  return {
    transactions,
    error,
    handleFileChange,
    handleScan
  }
}
