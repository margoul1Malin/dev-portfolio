import nodemailer from 'nodemailer';

// Configuration du transporteur email
const createTransporter = () => {
  // Configuration pour email personnalisé (Namecheap/domaine personnalisé)
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true pour port 465, false pour 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Mot de passe normal de votre email
      },
    });
  }
  
  // Configuration pour services populaires (Gmail, Outlook, etc.)
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Mot de passe d'application pour Gmail
    },
  });
};

// Interface pour les données de contact
interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

// Fonction pour envoyer une notification à l'admin
export const sendAdminNotification = async (contactData: ContactData) => {
  try {
    const transporter = createTransporter();

    // Email de notification pour l'admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, // Email de l'admin
      subject: `🚨 Nouvelle demande de contact - ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: #000; margin: 0; font-size: 28px; font-weight: bold;">
              🚨 Nouvelle Demande de Contact
            </h1>
            <p style="color: #333; margin: 10px 0 0 0; font-size: 16px;">
              Vous avez reçu une nouvelle demande via votre portfolio
            </p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0; font-size: 22px; border-bottom: 2px solid #fbbf24; padding-bottom: 10px;">
              📋 Détails de la demande
            </h2>
            
            <div style="margin: 20px 0;">
              <p style="margin: 10px 0;"><strong style="color: #f59e0b;">👤 Nom :</strong> ${contactData.name}</p>
              <p style="margin: 10px 0;"><strong style="color: #f59e0b;">📧 Email :</strong> <a href="mailto:${contactData.email}" style="color: #3b82f6; text-decoration: none;">${contactData.email}</a></p>
              <p style="margin: 10px 0;"><strong style="color: #f59e0b;">📝 Sujet :</strong> ${contactData.subject}</p>
              <p style="margin: 10px 0;"><strong style="color: #f59e0b;">🕒 Date :</strong> ${contactData.createdAt.toLocaleString('fr-FR')}</p>
            </div>
            
            <div style="margin: 25px 0;">
              <h3 style="color: #333; margin-bottom: 15px; font-size: 18px;">💬 Message :</h3>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 4px solid #fbbf24;">
                <p style="margin: 0; line-height: 1.6; color: #333; white-space: pre-wrap;">${contactData.message}</p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <a href="mailto:${contactData.email}?subject=Re: ${contactData.subject}" 
                 style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); 
                        color: #000; 
                        padding: 12px 30px; 
                        text-decoration: none; 
                        border-radius: 10px; 
                        font-weight: bold; 
                        display: inline-block; 
                        margin: 5px;">
                📧 Répondre directement
              </a>
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/contacts" 
                 style="background: #6b7280; 
                        color: white; 
                        padding: 12px 30px; 
                        text-decoration: none; 
                        border-radius: 10px; 
                        font-weight: bold; 
                        display: inline-block; 
                        margin: 5px;">
                🔧 Voir dans l'admin
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px;">
            <p>Cette notification a été envoyée automatiquement depuis votre portfolio Margoul1.dev</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(adminMailOptions);
    console.log('✅ Notification admin envoyée avec succès');
    return { success: true };
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de la notification admin:', error);
    return { success: false, error };
  }
};

// Fonction pour envoyer une confirmation au client
export const sendClientConfirmation = async (contactData: ContactData) => {
  try {
    const transporter = createTransporter();

    // Email de confirmation pour le client
    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: contactData.email,
      subject: `✅ Confirmation de réception - ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: #000; margin: 0; font-size: 28px; font-weight: bold;">
              ✅ Message bien reçu !
            </h1>
            <p style="color: #333; margin: 10px 0 0 0; font-size: 16px;">
              Merci pour votre message, je vous répondrai rapidement
            </p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Bonjour <strong>${contactData.name}</strong>,
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              J'ai bien reçu votre message concernant "<strong>${contactData.subject}</strong>" et je vous en remercie.
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Je m'engage à vous répondre dans les plus brefs délais, généralement sous 24-48h.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 4px solid #fbbf24; margin: 25px 0;">
              <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">📋 Récapitulatif de votre message :</h3>
              <p style="margin: 5px 0;"><strong>Sujet :</strong> ${contactData.subject}</p>
              <p style="margin: 5px 0;"><strong>Date d'envoi :</strong> ${contactData.createdAt.toLocaleString('fr-FR')}</p>
              <div style="margin-top: 15px;">
                <strong>Message :</strong>
                <p style="margin: 10px 0 0 0; font-style: italic; color: #666; white-space: pre-wrap;">"${contactData.message}"</p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #666; font-size: 14px; margin-bottom: 15px;">
                En attendant, n'hésitez pas à consulter mes réalisations :
              </p>
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}" 
                 style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); 
                        color: #000; 
                        padding: 12px 30px; 
                        text-decoration: none; 
                        border-radius: 10px; 
                        font-weight: bold; 
                        display: inline-block;">
                🌐 Voir mon portfolio
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px;">
            <p>Cordialement,<br><strong>Margoul1</strong><br>Développeur Web Full Stack</p>
            <p style="margin-top: 10px;">
              📧 <a href="mailto:${process.env.EMAIL_USER}" style="color: #3b82f6; text-decoration: none;">${process.env.EMAIL_USER}</a> | 
              🌐 <a href="${process.env.NEXT_PUBLIC_SITE_URL}" style="color: #3b82f6; text-decoration: none;">margoul1.dev</a>
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(clientMailOptions);
    console.log('✅ Confirmation client envoyée avec succès');
    return { success: true };
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de la confirmation client:', error);
    return { success: false, error };
  }
};

// Fonction combinée pour envoyer les deux emails
export const sendContactNotifications = async (contactData: ContactData) => {
  try {
    // Envoyer les deux emails en parallèle
    const [adminResult, clientResult] = await Promise.allSettled([
      sendAdminNotification(contactData),
      sendClientConfirmation(contactData)
    ]);

    return {
      admin: adminResult.status === 'fulfilled' ? adminResult.value : { success: false, error: adminResult.reason },
      client: clientResult.status === 'fulfilled' ? clientResult.value : { success: false, error: clientResult.reason }
    };
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi des notifications:', error);
    return {
      admin: { success: false, error },
      client: { success: false, error }
    };
  }
}; 