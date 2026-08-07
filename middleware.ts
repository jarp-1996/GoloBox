import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteger todas las rutas /admin
  if (pathname.startsWith('/admin')) {
    const adminToken = request.cookies.get('admin_session')?.value;
    const hasToken = !!adminToken;

    // Permitir acceso a la página de login del admin
    if (pathname === '/admin/login') {
      // Si ya está autenticado (tiene token), redirigir al dashboard
      if (hasToken) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Si no tiene token, redirigir al login
    if (!hasToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
