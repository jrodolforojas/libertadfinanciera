export default function InversionesInmobiliariasLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header>
        <span>Calculadora de Inversiones Inmobiliarias</span>
      </header>
      {children}
    </main>
  )
}
