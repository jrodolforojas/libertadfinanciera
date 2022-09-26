import { useState } from 'react'
import Papa from 'papaparse'

const ALLOWED_EXTENSIONS = ['csv']

function App () {
  const [transactions, setTransactions] = useState([])
  console.log('🚀 ~ file: App.js ~ line 8 ~ App ~ transactions', transactions)
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

  const handleParse = () => {
    if (!file) {
      return setError('Enter a valid file')
    }

    const reader = new FileReader()

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result)
      const csvData = csv.data

      const parsedData = []
      csvData.slice(1).forEach(transaction => {
        const objectTransaction = convertCSVDataToObject(transaction)
        parsedData.push(objectTransaction)
      })
      setTransactions(parsedData)
    }
    reader.readAsText(file)
  }

  return (
    <div className="App">
      <div className="flex flex-col items-start m-10">
        <h1 className="text-3xl font-bold underline text-blue-400">
          Welcome to Libertad Financiera
        </h1>
        <input type="file" name="file" onChange={handleFileChange}/>
        <button className="bg-blue-600 p-3 mt-3 text-white rounded-md" onClick={handleParse}>Scan</button>
        <table className='w-1/2'>
          <tr className='text-blue-800'>
            <th>Date</th>
            <th>Type</th>
            <th>Description</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>Balance</th>
          </tr>
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
        </table>
      </div>
      {error !== undefined && <p>{error}</p>}
    </div>
  )
}

export default App
