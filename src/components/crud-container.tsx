export default function CrudContainer({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-col justify-center items-center sm:px-20 px-10 sm:ml-64 sm:mt-5">
      <section className="flex w-full max-w-7xl items-center justify-center flex-col">
        {children}
      </section>
    </main>
  )
}
