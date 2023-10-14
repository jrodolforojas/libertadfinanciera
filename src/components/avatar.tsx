export default function Avatar({ name, role }: {
  name: string
  role: string
}) {
  const firstLetter = name[0].toUpperCase()

  return (
    <picture className="flex pl-2.5 mb-5 w-full">
      <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-gray-600">
        <span className="font-medium text-gray-300">{firstLetter}</span>
      </div>
      <div className="flex flex-col font-medium text-white text-md ml-3">
        <p className="truncate ...">{name}</p>
        <span className="text-sm text-gray-400">{role}</span>
      </div>
    </picture>
  )
}
