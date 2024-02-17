export default function MetricContainer({ children }: {
  children: React.ReactNode
}) {
  return (
    <div className="flex mt-8 lg:ml-10 w-full max-h-[580px]">
      {children}
    </div>
  )
}
