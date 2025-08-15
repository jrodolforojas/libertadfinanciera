'use client'

import { MailIcon } from '@/components/icons'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function SendInvitationButton({ email, name, roleId, isActive }: { email: string, name: string, roleId: string, isActive: boolean }) {
  const router = useRouter()
  const onClick = () => {
    handleSendEmail()
  }
  const handleSendEmail = async () => {
    const response = await fetch('/admin/users/invite-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        name,
        role_id: roleId,
        is_active: isActive
      })
    })
    const { error: fetchError, message } = await response.json() as {
      message: string
      error: boolean
    }
    if (fetchError) {
      toast.error(message || 'Este usuario ya está verificado')
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
