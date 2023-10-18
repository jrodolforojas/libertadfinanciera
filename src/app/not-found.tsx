import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <section className="flex flex-col items-center justify-center text-center">
        <h3 className='text-3xl font-bold text-primary'>Ha habido un problema 😢</h3>
        <p className='text-md text-primary'>No pudimos encontrar la página que buscas.</p>
        <Link href={'/'} className="text-white bg-secondary hover:bg-secondary-dark focus:ring-4 focus:outline-none
              focus:ring-secondary-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-10">
          Volver al inicio
        </Link>
      </section>
    </main>
  )
}
