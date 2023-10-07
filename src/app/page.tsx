import Container from '@/components/page-container'

export default function Home() {
  return (
    <Container>
      <h1 className="text-3xl text-primary font-bold text-center mb-5">Bienvenidos al taller</h1>
      <span className="text-center text-secondary">¡Navega mediante el menú para conocer todos los recursos!</span>
      <button data-drawer-target="sidebar" data-drawer-toggle="sidebar" aria-controls="sidebar" type="button" className="inline-flex items-center p-3 mt-5 text-md text-white rounded-lg bg-primary hover:text-gray-300">
        <span>Ver recursos</span>
      </button>
    </Container>
  )
}
