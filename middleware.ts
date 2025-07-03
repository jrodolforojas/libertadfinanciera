import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return res
}
