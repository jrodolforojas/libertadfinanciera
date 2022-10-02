import { Sidebar } from './components/Sidebar'
import { TransactionScanner } from './pages/TransactionScanner'

function App () {
  return (
    <div className="App">
      <main className='flex'>
        <Sidebar/>
        <section className='m-8'>
          <TransactionScanner/>
        </section>
      </main>
    </div>
  )
}

export default App
