import { NextResponse } from 'next/server'

// Keep middleware lightweight (Edge Runtime compatible).
// Auth session checks happen in server components and API routes via auth().
export function middleware(request) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
