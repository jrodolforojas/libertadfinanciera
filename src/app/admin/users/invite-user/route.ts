import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const email = requestUrl.searchParams.get('email')
  const name = requestUrl.searchParams.get('name')
  if (email && name) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    await supabase.auth.admin.inviteUserByEmail(email, {
      data: {
        name
      }
    })
  }

  const redirectUrl = `${requestUrl.origin}/admin/users`
  return NextResponse.redirect(redirectUrl)
}
