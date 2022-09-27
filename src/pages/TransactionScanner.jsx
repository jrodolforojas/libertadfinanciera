import { TransactionScannerTable } from '../components/TransactionScannerTable'
import { useTransactionScanner } from '../hooks/useTransactionScanner'

export const TransactionScanner = () => {
  const { transactions, error, handleFileChange, handleScan } = useTransactionScanner()

  return (
    <div className="flex flex-col items-start m-10">
      <h1 className="text-3xl font-bold underline text-blue-400">
          Welcome to Libertad Financiera
      </h1>
      <input type="file" name="file" onChange={handleFileChange}/>
      <button className="bg-blue-600 p-3 mt-3 text-white rounded-md" onClick={handleScan}>Scan</button>
      <TransactionScannerTable transactions={transactions}/>
      {error !== undefined && <p>{error}</p>}
    </div>
  )
}
