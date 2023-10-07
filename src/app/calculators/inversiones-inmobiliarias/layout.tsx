import Header from '@/components/header'
import Container from '@/components/page-container'

export default function InversionesInmobiliariasLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Container>
      <Header title='Calculadora de Inversiones Inmobiliarias'>

      </Header>
      <section className='flex w-full'>
        {children}
      </section>
    </Container >
  )
}
