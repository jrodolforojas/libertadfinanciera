import countries from "@/app/utils/countries"
import TabsNavbar from "@/components/tabs-navbar"

export default function InflationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-col items-center justify-between sm:px-20 px-10 sm:ml-64 sm:mt-5">
      <header className="flex flex-col w-full">
        <div className="mb-5">
          <h2 className="text-3xl font-bold text-center text-blue-text">Tasa de inflación</h2>
          <span className="text-gray-400 text-center w-full flex justify-center items-center">Porcentaje de cuánto están subiendo los precios de las cosas que compramos cada día</span>
        </div>
        <TabsNavbar tabs={countries} />
      </header>
      <section className="flex w-full">
        {children}
      </section>
    </main>
  )
}