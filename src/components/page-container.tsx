export default function Container({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-col items-center justify-between sm:px-20 px-10 sm:ml-64 sm:mt-5">
      {children}
    </main>
  )
}
