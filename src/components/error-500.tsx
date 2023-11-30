import { usePathname, useRouter } from 'next/navigation'

export default function Error500() {
  const pathName = usePathname()
  const url = location.origin + pathName
  const router = useRouter()

  const onClickTryAgain = () => {
    router.push(url)
    router.refresh()
  }
  return (
    <main className="w-full min-h-[800px] flex items-center justify-center">
      <section className="flex flex-col items-center justify-center text-center">
        <h3 className='text-3xl font-bold text-primary'>Ha habido un problema 😢</h3>
        <p className='text-md text-primary'>No pudimos traer la información solicitada.</p>
        <button onClick={onClickTryAgain} className="text-white bg-secondary hover:bg-secondary-dark focus:ring-4 focus:outline-none
              focus:ring-secondary-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-10">
          Intentar de nuevo
        </button>
      </section>
    </main>
  )
}
