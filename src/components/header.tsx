import Logo from './logo'

export default function Header({ title, description, children }: {
  title: string
  description?: string
  children?: React.ReactNode
}) {
  return (
    <header className="flex flex-col w-full">
      <div className="flex mb-5 flex-col items-center justify-center">
        <Logo />
        <h2 className="text-3xl font-bold text-center text-blue-text">{title}</h2>
        {description && <span className="text-gray-400 text-center w-full flex justify-center items-center">{description}</span>}
      </div>
      {children}
    </header>
  )
}
