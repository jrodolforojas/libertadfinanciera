export default function TableLoading() {
  return (
    <main className="flex flex-col justify-center items-center sm:px-20 px-10 sm:ml-64 sm:mt-5">
      <section className="flex w-full max-w-7xl items-center justify-center flex-col animate-pulse" role="status">
        <div className="h-10 bg-gray-200 rounded-full mt-5 w-48 mb-5"></div>
        <div className="h-6 bg-gray-200 rounded-full mt-5 w-36 mb-5 self-end flex"></div>
        <div className="h-4 bg-gray-200 rounded-full mt-5 w-full"></div>
        <div className="h-4 bg-gray-200 rounded-full mt-5 w-full"></div>
        <div className="h-4 bg-gray-200 rounded-full mt-5 w-full"></div>
        <div className="h-4 bg-gray-200 rounded-full mt-5 w-full"></div>
        <div className="h-4 bg-gray-200 rounded-full mt-5 w-full"></div>
        <div className="h-4 bg-gray-200 rounded-full mt-5 w-full"></div>
        <div className="h-4 bg-gray-200 rounded-full mt-5 w-full"></div>
        <span className="sr-only">Loading...</span>
      </section>
    </main>
  )
}
