export default function InflationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-col items-center justify-between px-12">
      <header className="flex flex-col w-full">
        <h2 className="text-2xl font-bold mb-5 text-center text-blue-text">Tasa de inflación</h2>
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li className="mr-2">
            <a href="/variables-macroeconomicas/inflacion/cr" aria-current="page" className="inline-block p-4 rounded-t-lg hover:text-gray-600 
            hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Costa Rica 🇨🇷</a>
          </li>
          <li className="mr-2">
            <a href="/variables-macroeconomicas/inflacion/us" className="inline-block p-4 rounded-t-lg hover:text-gray-600 
            hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Estados Unidos 🇺🇸</a>
          </li>
        </ul>

      </header>
      {children}
    </main>
  )
}