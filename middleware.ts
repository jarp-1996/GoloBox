import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteger todas las rutas /admin
  if (pathname.startsWith('/admin')) {
    // Verificar el token de sesión de admin (cookie simple con JWT de Supabase)
    const adminToken = request.cookies.get('admin_session')?.value;
    
    // Permitir acceso a la página de login del admin
    if (pathname === '/admin/login') {
      // Si ya está autenticado, redirigir al dashboard
      if (adminToken) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Si no tiene token, redirigir al login
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
