import { type Database } from '@/types/entities/database'
import { createClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const email = url.searchParams.get('email')
  if (!email) {
    return NextResponse.redirect('/')
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const supabaseAdminKey = process.env.SUPABASE_ADMIN_KEY ?? ''
  const supabase = createClient<Database>(supabaseUrl, supabaseAdminKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  const { count, error } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .ilike('email', `%${email}%`)

  if (error != null || count === 0) {
    return NextResponse.json({ message: 'Este correo no pertenece a la whitelist de usuarios de la plataforma', error: true }, { status: 200 })
  }

  const { error: invitationError } = await supabase.auth.admin.inviteUserByEmail(email)
  if (invitationError?.message === 'A user with this email address has already been registered') {
    return NextResponse.json({ message: 'Este correo ya ha sido registrado. Por favor dirigete a la página principal.', error: true }, { status: 200 })
  }

  if (invitationError == null) {
    return NextResponse.json({ message: 'Invitación enviada', error: false }, { status: 200 })
  }
}
