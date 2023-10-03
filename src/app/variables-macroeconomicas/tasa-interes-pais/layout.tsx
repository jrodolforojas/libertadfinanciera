export default function TasaInteresPaisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header>
        <span>Tasa de interes pais layout</span>
      </header>
      {children}
    </main>
  )
}