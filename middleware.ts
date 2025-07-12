import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Vérifier si c'est une route admin
  if (pathname.startsWith('/admin')) {
    // Récupérer le token depuis les cookies ou headers
    const authToken = request.cookies.get('auth-token')?.value || 
                     request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!authToken) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    // Vérifier le token côté serveur
    try {
      // Décoder le token simple (base64)
      const tokenData = JSON.parse(atob(authToken));
      
      // Vérifier l'expiration
      if (Date.now() > tokenData.expires) {
        const loginUrl = new URL('/auth/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
      
      // Vérifier le rôle admin
      if (tokenData.role !== 'admin') {
        const loginUrl = new URL('/auth/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
      
    } catch (error) {
      const loginUrl = new URL('/auth/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
}; 