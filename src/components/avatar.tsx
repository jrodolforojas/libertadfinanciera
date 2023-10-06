export default function Avatar() {
  return (
    <picture className="flex items-center pl-2.5 mb-5">
      <img src="https://avatars.githubusercontent.com/jrodolforojas" className="h-10 mr-3 sm:h-7 rounded-full" alt="Rodolfo Rojas" />
      <div className="font-medium text-white">
        <div>Rodolfo Rojas</div>
        <div className="text-sm text-gray-400">Alumno</div>
      </div>
    </picture>
  )
}
