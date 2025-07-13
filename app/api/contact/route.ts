import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendContactNotifications } from '@/app/lib/email';

const prisma = new PrismaClient();

interface ContactRequestBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactRequestBody = await request.json();
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

    // Envoi des notifications par email
    try {
      const emailResults = await sendContactNotifications({
        name: contactQuery.name,
        email: contactQuery.email,
        subject: contactQuery.subject,
        message: contactQuery.message,
        createdAt: contactQuery.createdAt
      });

      // Log des résultats d'envoi
      console.log('📧 Résultats d\'envoi des emails:', {
        admin: emailResults.admin.success ? '✅ Succès' : '❌ Échec',
        client: emailResults.client.success ? '✅ Succès' : '❌ Échec'
      });

      // Même si l'envoi d'email échoue, on retourne succès car le message est enregistré
      return NextResponse.json({
        success: true,
        message: 'Votre message a été envoyé avec succès !',
        id: contactQuery.id,
        emailStatus: {
          adminNotification: emailResults.admin.success,
          clientConfirmation: emailResults.client.success
        }
      });

    } catch (emailError) {
      console.error('❌ Erreur lors de l\'envoi des emails:', emailError);
      
      // Retourner succès car le message est enregistré même si l'email échoue
      return NextResponse.json({
        success: true,
        message: 'Votre message a été envoyé avec succès !',
        id: contactQuery.id,
        emailStatus: {
          adminNotification: false,
          clientConfirmation: false,
          error: 'Erreur lors de l\'envoi des notifications'
        }
      });
    }

  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du contact:', error);
    return NextResponse.json(
      { error: 'Erreur serveur. Veuillez réessayer plus tard.' },
      { status: 500 }
    );
  }
} 