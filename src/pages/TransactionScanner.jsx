import { TransactionScannerTable } from '../components/TransactionScannerTable'
import { useTransactionScanner } from '../hooks/useTransactionScanner'

export const TransactionScanner = () => {
  const { transactions, error, handleFileChange, handleScan } = useTransactionScanner()

  return (
    <div className="flex flex-col items-start m-10">
      <h1 className='text-3xl font-semibold text-[#051C2C]'>Éscaner de transacciones</h1>
      <input type="file" name="file" onChange={handleFileChange}/>
      <button className="p-3 mt-3 text-white bg-blue-600 rounded-md" onClick={handleScan}>Scan</button>
      <TransactionScannerTable transactions={transactions}/>
      {error !== undefined && <p>{error}</p>}
    </div>
  )
}
