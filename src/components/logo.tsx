import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/">
      <img className="flex self-center w-24 h-24 mb-5" src="/logos/logo-verde-azul.avif" alt="logo" />
    </Link>
  )
}
