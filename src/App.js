import { Sidebar } from './components/Sidebar'
import { Navigator } from './navigator/Navigator'

function App () {
  return (
    <div className="App">
      <main className='flex'>
        <Sidebar/>
        <section className='m-8'>
          <Navigator/>
        </section>
      </main>
    </div>
  )
}

export default App
