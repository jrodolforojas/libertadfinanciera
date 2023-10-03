export default function TasaInteresCreditosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header>
        <span>Tasa de interes creditos layout</span>
      </header>
      {children}
    </main>
  )
}