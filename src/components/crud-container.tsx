export default function CrudContainer({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-col justify-center items-center md:px-20 px-10 md:ml-64 md:mt-5 pb-10">
      <section className="flex w-full max-w-7xl items-center justify-center flex-col">
        {children}
      </section>
    </main>
  )
}
