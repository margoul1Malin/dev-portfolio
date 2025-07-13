# Configuration du Système d'Email

## Variables d'environnement requises

Ajoutez ces variables dans votre fichier `.env.local` :

```env
# Configuration Email
EMAIL_USER="votre-email@gmail.com"
EMAIL_PASS="votre-mot-de-passe-application"
ADMIN_EMAIL="admin@votredomaine.com"  # Optionnel, utilise EMAIL_USER par défaut
NEXT_PUBLIC_SITE_URL="https://margoul1.dev"
```

## Configuration Gmail

### 1. Activer la validation en 2 étapes
1. Allez dans votre compte Google
2. Sécurité → Validation en 2 étapes
3. Activez la validation en 2 étapes

### 2. Générer un mot de passe d'application
1. Allez dans votre compte Google
2. Sécurité → Validation en 2 étapes → Mots de passe des applications
3. Sélectionnez "Autre" et nommez-le "Portfolio Notifications"
4. Copiez le mot de passe généré (16 caractères)
5. Utilisez ce mot de passe dans `EMAIL_PASS`

## Configuration PrivateEmail (Namecheap)

Pour votre email acheté avec Namecheap, utilisez cette configuration :

```env
# Configuration PrivateEmail Namecheap
EMAIL_USER="votre-email@margoul1.dev"
EMAIL_PASS="votre-mot-de-passe-email"
SMTP_HOST="mail.privateemail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
ADMIN_EMAIL="votre-email@margoul1.dev"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"  # Pour le dev
```

## Configuration Outlook/Hotmail

```env
EMAIL_USER="votre-email@outlook.com"
EMAIL_PASS="votre-mot-de-passe"
```

Modifiez dans `app/lib/email.ts` :
```typescript
service: 'outlook', // au lieu de 'gmail'
```

## Configuration SMTP personnalisée

Pour utiliser un serveur SMTP personnalisé, remplacez dans `app/lib/email.ts` :

```typescript
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.votredomaine.com',
    port: 587,
    secure: false, // true pour port 465, false pour les autres ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};
```

## Test du système

Pour tester le système d'email :

1. Assurez-vous que les variables d'environnement sont configurées
2. Redémarrez votre serveur de développement
3. Envoyez un message via le formulaire de contact
4. Vérifiez les logs dans la console pour voir si les emails sont envoyés

## Fonctionnalités

### Email de notification admin
- Reçu immédiatement quand quelqu'un envoie un message
- Contient tous les détails du message
- Bouton pour répondre directement
- Lien vers le panel admin

### Email de confirmation client
- Envoyé automatiquement au client
- Confirme la réception du message
- Contient un récapitulatif
- Lien vers le portfolio

## Dépannage

### Erreur "Authentication failed"
- Vérifiez que la validation en 2 étapes est activée
- Utilisez un mot de passe d'application, pas votre mot de passe principal
- Vérifiez que `EMAIL_USER` et `EMAIL_PASS` sont corrects

### Erreur "Connection timeout"
- Vérifiez votre connexion internet
- Essayez un autre service email (Outlook, Yahoo, etc.)
- Vérifiez les paramètres de votre pare-feu

### Les emails ne sont pas reçus
- Vérifiez les dossiers spam/courrier indésirable
- Vérifiez que `ADMIN_EMAIL` est correct
- Consultez les logs de la console pour les erreurs

## Sécurité

- Ne jamais committer les mots de passe dans le code
- Utilisez des mots de passe d'application, pas les mots de passe principaux
- Changez régulièrement les mots de passe d'application
- Limitez les permissions des comptes email utilisés 