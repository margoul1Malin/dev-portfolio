import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export async function verifyAdminCredentials(email: string, password: string): Promise<User | null> {
  try {
    // Vérifier l'utilisateur dans la base de données
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return null;
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    return null;
  }
}

// Générer un token simple (pas JWT)
export function generateSessionToken(user: User): string {
  const sessionData = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    timestamp: Date.now(),
    expires: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 jours
  };
  
  return btoa(JSON.stringify(sessionData));
}

// Vérifier un token simple
export function verifySessionToken(token: string): User | null {
  try {
    const sessionData = JSON.parse(atob(token));
    
    // Vérifier l'expiration
    if (Date.now() > sessionData.expires) {
      return null;
    }
    
    return {
      id: sessionData.userId,
      email: sessionData.email,
      name: sessionData.name,
      role: sessionData.role
    };
  } catch (error) {
    console.log(error);
    return null;
  }
} 