export default function TipoCambioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header>
        <span>Tipo de cambio layout</span>
      </header>
      {children}
    </main>
  )
}