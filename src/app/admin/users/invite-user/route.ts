import { NextResponse, type NextRequest } from 'next/server'
import { createAdminClient } from '@/utils/supabase/server'

export async function POST(request: NextRequest) {
  let body
  try {
    body = await request.json()
  } catch (e) {
    return NextResponse.json({ error: true, message: 'Invalid JSON body' }, { status: 400 })
  }

  const { email, name, role_id: roleId, is_active: isActive } = body
  if (!email || !name || !roleId) {
    return NextResponse.json({ error: true, message: 'Missing required parameters' }, { status: 400 })
  }

  const supabase = createAdminClient()

  // Verificamos si ya existe
  const { data: userList, error: listError } = await supabase.auth.admin.listUsers()
  const existingUser = userList?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase())
  if (listError) {
    return NextResponse.json({ error: true, message: 'Error checking for existing user' }, { status: 500 })
  }
  if (existingUser) {
    return NextResponse.json({ error: true, message: 'User already exists' }, { status: 400 })
  }

  // Invitamos al usuario (envía correo con link mágico)
  const { data: invitedUser, error: invitationError } = await supabase.auth.admin.inviteUserByEmail(email, {
    data: {
      invited_by: 'admin'
    }
  })

  if (invitationError) {
    console.error(invitationError)
    return NextResponse.json({ error: true, message: 'Error sending invitation' }, { status: 500 })
  }

  // Creamos su perfil en nuestra tabla `users`
  const { error: userError } = await supabase.from('users').insert({
    name,
    email,
    role_id: roleId,
    is_active: isActive,
    auth_id: invitedUser?.user?.id
  })

  if (userError) {
    // Rollback: eliminamos el usuario creado en Auth
    if (invitedUser?.user?.id) {
      await supabase.auth.admin.deleteUser(invitedUser.user.id)
    }
    return NextResponse.json({ error: true, message: 'Error creating user profile, user rolled back' }, { status: 400 })
  }

  return NextResponse.json({ error: false, message: 'Usuario invitado exitosamente' }, { status: 200 })
}
