import { type Database } from '@/types/entities/database'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const email = requestUrl.searchParams.get('email')
  const user = requestUrl.searchParams.get('user')

  if (email && user) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })
    await supabase.from('users').update({ auth_id: user }).eq('email', decodeURIComponent(email))
  }

  return NextResponse.redirect(requestUrl.origin)
}
