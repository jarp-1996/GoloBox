import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.redirect(
    process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/admin/login`
      : 'http://localhost:3000/admin/login'
  );
  response.cookies.delete('admin_session');
  return response;
}
