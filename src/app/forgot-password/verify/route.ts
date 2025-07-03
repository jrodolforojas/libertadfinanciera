import { createClient } from '@/utils/supabase/server'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const email = requestUrl.searchParams.get('email')
  const user = requestUrl.searchParams.get('user')

  if (email && user) {
    const supabase = createClient()
    await supabase.from('users').update({ auth_id: user }).eq('email', decodeURIComponent(email))
  }

  return NextResponse.redirect(requestUrl.origin)
}
