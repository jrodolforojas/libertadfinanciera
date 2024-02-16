export default function CalculatorContainer({ children }: {
  children: React.ReactNode
}) {
  return (
    <section className="flex justify-between w-full max-w-6xl lg:flex-row flex-col">
      {children}
    </section>
  )
}
