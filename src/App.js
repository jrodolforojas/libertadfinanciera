import { useState } from 'react'
import Papa from 'papaparse'

const ALLOWED_EXTENSIONS = ['csv']

function App () {
  const [data, setData] = useState()
  console.log('🚀 ~ file: App.js ~ line 8 ~ App ~ data', data)
  const [error, setError] = useState()
  console.log('🚀 ~ file: App.js ~ line 10 ~ App ~ error', error)
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

  const handleParse = () => {
    if (!file) {
      return setError('Enter a valid file')
    }

    const reader = new FileReader()

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result)
      const parsedData = csv.data
      console.log('🚀 ~ file: App.js ~ line 38 ~ reader.onload= ~ parsedData', parsedData)
      const columns = Object.keys(parsedData[4])
      setData(columns)
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
      </div>
    </div>
  )
}

export default App
