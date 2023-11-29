export default function DashboardLoading() {
  return (
    <section className="flex w-full mt-5 flex-col" role="status">
      <div className="h-6 bg-gray-200 rounded-full my-5 w-36"></div>
      <div className="flex justify-between items-center flex-col sm:gap-y-0 gap-y-5 bg-gray-300 min-w-72 sm:mb-0 mb-5 rounded p-5">
        <div className="flex flex-col items-center justify-center w-full text-center">
          <div className="h-6 bg-gray-200 rounded-full mt-5 w-48 mt-10"></div>
          <div className="h-2 bg-gray-200 rounded-full mt-5 w-36"></div>
        </div>
        <div className="flex flex-col items-center justify-center w-full text-center">
          <div className="h-6 bg-gray-200 rounded-full mt-5 w-48 mt-10"></div>
          <div className="h-2 bg-gray-200 rounded-full mt-5 w-36"></div>
        </div>
      </div>
      <div className="h-6 bg-gray-200 rounded-full my-5 w-36"></div>
      <article className="bg-gray-300 rounded p-10">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
        <div className="flex items-baseline mt-4">
          <div className="w-full bg-gray-200 rounded-t-lg h-56 dark:bg-gray-700"></div>
          <div className="w-full h-48 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-56 ms-6 dark:bg-gray-700"></div>
          <div className="w-full h-56 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-56 ms-6 dark:bg-gray-700"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
        </div>
      </article>
      <div className="h-2.5 bg-gray-200 rounded-full my-5 w-72 flex self-center"></div>
    </section>
  )
}
