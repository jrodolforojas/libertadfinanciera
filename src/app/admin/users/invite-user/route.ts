import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const email = requestUrl.searchParams.get('email')
  const name = requestUrl.searchParams.get('name')
  if (email && name) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
    const supabaseAdminKey = process.env.SUPABASE_ADMIN_KEY ?? ''
    const supabase = createClient(supabaseUrl, supabaseAdminKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
    await supabase.auth.admin.inviteUserByEmail(email)
  }

  const redirectUrl = `${requestUrl.origin}/admin/users`
  return NextResponse.redirect(redirectUrl)
}
