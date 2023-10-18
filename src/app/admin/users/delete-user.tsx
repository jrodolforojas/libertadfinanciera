'use client'

import { DeleteIcon } from '@/components/icons'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'

export default function DeleteUser({ userId }: { userId: string }) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleDelete = async () => {
    const response = await supabase.from('users').update({ is_active: false }).eq('id', userId)
    if (response.error !== null) {
      toast.error('Error al eliminar el usuario')
      return
    }
    toast.success('Usuario eliminado exitosamente')
    router.refresh()
  }
  return (
    <>
      <button className='text-primary hover:rounded-full p-2 hover:bg-secondary' onClick={handleDelete}>
        <DeleteIcon />
      </button>
      <Toaster position="top-center" theme='dark' />
    </>
  )
}
