import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { cache } from 'react'

export const createSupabaseClient = cache(() => {
  const cookiesStore = cookies()
  return createServerComponentClient({ cookies: () => cookiesStore })
})

export async function getSession() {
  const supabase = createSupabaseClient()
  try {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  } catch (error) {
    return null
  }
}

export async function isAuthenticated() {
  try {
    const session = await getSession()
    if (session === null) {
      return false
    }
  } catch (error) {
    return true
  }
}
