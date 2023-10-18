'use client'

import { DownIcon, UpIcon } from '@/components/icons'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'

export default function ActiveInactiveUser({ userId, isActive }: { userId: string, isActive: boolean }) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleChangeActive = async () => {
    const newState = !isActive
    const response = await supabase.from('users').update({ is_active: newState }).eq('id', userId)
    if (response.error !== null) {
      toast.error('Error al eliminar el usuario')
      return
    }
    newState ? toast.success('Usuario activado exitosamente') : toast.success('Usuario desactivado exitosamente')
    router.refresh()
  }
  return (
    <>
      <button className='text-primary hover:rounded-full p-2 hover:bg-secondary' onClick={handleChangeActive}>
        {isActive ? <DownIcon /> : <UpIcon />}
      </button>
      <Toaster position="top-center" theme='dark' />
    </>
  )
}
