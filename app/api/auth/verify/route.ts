import { NextResponse } from 'next/server';
import { verifySessionToken } from '../../../lib/auth';

interface VerifyRequestBody {
  token: string;
}

export async function POST(request: Request) {
  try {
    const { token }: VerifyRequestBody = await request.json();

    if (!token) {
      return NextResponse.json({ 
        success: false, 
        message: 'Token manquant' 
      }, { status: 400 });
    }

    const user = verifySessionToken(token);

    if (user) {
      return NextResponse.json({
        success: true,
        message: 'Token valide',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Token invalide ou expiré' 
      }, { status: 401 });
    }

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Erreur lors de la vérification',
      error: (error as Error).message
    }, { status: 500 });
  }
} 