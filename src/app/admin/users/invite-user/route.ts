import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const email = requestUrl.searchParams.get('email')
  const name = requestUrl.searchParams.get('name')
  const roleId = requestUrl.searchParams.get('role_id')
  const isActive = requestUrl.searchParams.get('is_active')
  if (!email || !name || !roleId) {
    return NextResponse.redirect('/admin/users')
  }
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const supabaseAdminKey = process.env.SUPABASE_ADMIN_KEY ?? ''
  const supabase = createClient(supabaseUrl, supabaseAdminKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  const randomPassword = process.env.NEXT_PUUBLIC_DEFAULT_PASSWORD ?? ''
  // authenticate user
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password: randomPassword
  })
  if (error?.status) {
    return NextResponse.redirect(`${requestUrl.origin}/admin/users`)
  }

  // create user profile
  await supabase.from('users').insert({
    name,
    email,
    role_id: roleId,
    is_active: isActive,
    auth_id: data?.user?.id
  })
  // send invitation link
  const { error: invitationError } = await supabase.auth.admin.inviteUserByEmail(email)

  if (invitationError?.status) {
    return NextResponse.redirect(`${requestUrl.origin}/admin/users`)
  }

  const redirectUrl = `${requestUrl.origin}/admin/users?msg=Usuario creado exitosamente`
  return NextResponse.redirect(redirectUrl)
}
