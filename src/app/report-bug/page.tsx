import CrudContainer from '@/components/crud-container'
import ReportBugForm from './form'
import { WhatsAppIcon } from '@/components/icons'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function ReportBugPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    redirect('/login')
  }

  const email = user.email ?? ''

  return (
    <CrudContainer>
      <header className="flex flex-col w-full">
        <div className="flex mb-5 flex-col items-center justify-center">
          <img className="w-20 h-20" src="/logos/logo-verde-azul.avif" alt="logo" />
          <h2 className="text-3xl font-bold text-center text-primary">Reportar Issue</h2>
        </div>
      </header>
      <ReportBugForm userEmail={email} />
      <footer className="flex flex-col w-full items-center justify-center mt-10">
        <a href="https://chat.whatsapp.com/D19eRU3yBb1GAOQUCd5PAq" target="_blank" rel="noreferrer"
          className="text-primary flex hover:scale-125 hover:font-bold transition">
          <div className='text-secondary'>
            <WhatsAppIcon />
          </div>
          <span className="ml-2">Unirme al grupo de WhatsApp</span>
        </a>
      </footer>
    </CrudContainer>
  )
}
