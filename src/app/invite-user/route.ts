import { createAdminClient } from '@/utils/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  let body
  try {
    body = await request.json()
  } catch (e) {
    return NextResponse.json({ error: true, message: 'Invalid JSON body' }, { status: 400 })
  }
  const { email } = body
  if (!email) {
    return NextResponse.json({ error: true, message: 'Missing email' }, { status: 400 })
  }

  const supabase = createAdminClient()

  // Check if user exists in Supabase Auth
  const { data: userList, error: listError } = await supabase.auth.admin.listUsers()
  const existingUser = userList?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase())
  if (listError) {
    return NextResponse.json({ error: true, message: 'Error checking for existing user' }, { status: 500 })
  }
  if (!existingUser) {
    return NextResponse.json({ error: true, message: 'El usuario no existe en la autenticación. No se puede enviar invitación.' }, { status: 400 })
  }

  // Send invitation (magic link) to existing user
  const randomPassword = crypto.randomUUID()
  const { error: invitationError } = await supabase.auth.admin.inviteUserByEmail(email, {
    data: {
      temporal: randomPassword
    }
  })
  if (invitationError?.message === 'A user with this email address has already been registered') {
    return NextResponse.json({ error: false, message: 'Usuario ya verificado' }, { status: 200 })
  }
  if (invitationError) {
    return NextResponse.json({ error: true, message: 'Error sending invitation' }, { status: 400 })
  }

  return NextResponse.json({ message: 'Invitación enviada', error: false }, { status: 200 })
}
