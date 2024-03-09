import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

  try {
    const user = await supabase.auth.getUser();

    if (!user) {
      console.log("middleware: (!user")
      
      return NextResponse.redirect('/signin')
    }

    return response
  } catch (e) {
    console.error('Error in middleware:', e)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
