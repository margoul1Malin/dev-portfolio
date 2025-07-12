import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation des données
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Enregistrement dans la base de données
    const contactQuery = await prisma.contactQuery.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        status: 'new'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Votre message a été envoyé avec succès !',
      id: contactQuery.id
    });

  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du contact:', error);
    return NextResponse.json(
      { error: 'Erreur serveur. Veuillez réessayer plus tard.' },
      { status: 500 }
    );
  }
} 