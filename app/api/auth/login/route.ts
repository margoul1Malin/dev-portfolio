import { NextResponse } from 'next/server';
import { verifyAdminCredentials, generateSessionToken } from '../../../lib/auth';

interface LoginRequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const { email, password }: LoginRequestBody = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ 
        success: false, 
        message: 'Email et mot de passe requis' 
      }, { status: 400 });
    }
    
    // Vérifier les identifiants
    const user = await verifyAdminCredentials(email, password);
    
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: 'Identifiants invalides' 
      }, { status: 401 });
    }
    
    // Générer le token de session
    const sessionToken = generateSessionToken(user);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Authentification réussie',
      token: sessionToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Erreur lors de l\'authentification',
      error: (error as Error).message
    }, { status: 500 });
  }
} 