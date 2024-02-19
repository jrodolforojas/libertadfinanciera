import CrudContainer from '@/components/crud-container'
import ReportBugForm from './form'
import { WhatsAppIcon } from '@/components/icons'

export default function ReportBugPage() {
  return (
    <CrudContainer>
      <header className="flex flex-col w-full">
        <div className="flex mb-5 flex-col items-center justify-center">
          <img className="w-20 h-20" src="/logos/logo-verde-azul.avif" alt="logo" />
          <h2 className="text-3xl font-bold text-center text-primary">Reportar Bug</h2>
        </div>
      </header>
      <ReportBugForm />
      <footer className="flex flex-col w-full items-center justify-center mt-10">
        <a href="" className="text-primary flex hover:scale-125 hover:font-bold transition">
          <div className='text-secondary'>
            <WhatsAppIcon />
          </div>
          <span className="ml-2">Unirme al grupo de WhatsApp</span>
        </a>
      </footer>
    </CrudContainer>
  )
}
