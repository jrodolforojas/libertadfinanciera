export default function FormLoading() {
  return (
    <main className="flex flex-col justify-center items-center sm:px-20 px-10 sm:ml-64 sm:mt-5">
      <section className="flex w-full max-w-7xl justify-center flex-col animate-pulse" role="status">
        <div className="h-6 bg-gray-200 rounded-full mt-5 w-48 mb-5 flex self-center"></div>
        <div className="h-2 bg-gray-200 rounded-full mt-5 w-36"></div>
        <div className="h-8 bg-gray-200 rounded-full mt-5 w-full"></div>
        <div className="h-2 bg-gray-200 rounded-full mt-5 w-36"></div>
        <div className="h-8 bg-gray-200 rounded-full mt-5 w-full"></div>
        <div className="h-2 bg-gray-200 rounded-full mt-5 w-36"></div>
        <div className="h-8 bg-gray-200 rounded-full mt-5 w-full"></div>
        <div className="h-2 bg-gray-200 rounded-full mt-5 w-36"></div>
        <div className="h-8 bg-gray-200 rounded-full mt-5 mb-12 w-full"></div>
        <div className="h-6 bg-gray-200 rounded-full mt-5 w-48 mt-10 flex self-center"></div>
        <span className="sr-only">Loading...</span>
      </section>
    </main>
  )
}
