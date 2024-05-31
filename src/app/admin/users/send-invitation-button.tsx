'use client'

import { MailIcon } from '@/components/icons'
import { type Database } from '@/types/entities/database'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function SendInvitationButton({ userId }: { userId: string }) {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()
  const onClick = () => {
    handleSendEmail()
  }
  const handleSendEmail = async () => {
    const response = await supabase.from('users').select('email').eq('id', userId)
    if (response.error != null) {
      toast.error('No se ha encontrado el usuario')
      return
    }

    const { email } = response.data[0]
    if (email === '') {
      toast.error('No se ha encontrado el correo electrónico para este usuario')
      return
    }

    const res = await fetch(`/invite-user?email=${email}`)
    const { error } = await res.json() as {
      message: string
      error: boolean
    }

    if (error) {
      toast.error('Este usuario ya está verificado')
      return
    }
    toast.success('Invitación enviada correctamente')
    router.refresh()
  }
  return (
    <>
      <button className='text-primary hover:rounded-full p-2 hover:bg-secondary' onClick={onClick}>
        <MailIcon />
      </button>
    </>
  )
}
