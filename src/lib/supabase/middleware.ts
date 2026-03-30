import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MjU1MDc2MDAsImV4cCI6MTk0MTA4MzYwMH0.placeholder',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Allow demo mode (cookie set by auth page) — check BEFORE Supabase call
  const isDemo = request.cookies.get('gtc_demo')?.value === 'true'

  // Protected routes check
  const protectedPaths = ['/dashboard', '/publicar', '/chat', '/perfil', '/calificar']
  const isProtected = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))

  // If demo mode or not a protected route, skip auth check
  if (isDemo || !isProtected) {
    return supabaseResponse
  }

  // Only call Supabase if we actually need to check auth
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth'
      url.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
  } catch {
    // If Supabase fails (e.g. placeholder URL), redirect to auth
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    url.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
