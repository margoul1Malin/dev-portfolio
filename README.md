# 🚀 Portfolio Margoul1 - Développeur Web Full Stack

Portfolio moderne et responsive d'un développeur web full stack, construit avec Next.js 15, TypeScript, et Tailwind CSS.

## ✨ Fonctionnalités

### 🎨 Interface Utilisateur
- **Design moderne** avec thème noir/jaune et effets glassmorphism
- **Responsive** sur tous les appareils
- **Animations fluides** et interactions utilisateur
- **Navigation smooth** entre les sections

### 🔐 Système d'Authentification
- **Authentification personnalisée** avec JWT et localStorage
- **Panel admin** pour gérer les contacts
- **Protection des routes** avec middleware
- **Persistance de session** après actualisation

### 📬 Système de Contact
- **Formulaire de contact** avec validation
- **Gestion des demandes** dans le panel admin
- **Statuts de suivi** (nouveau, lu, répondu, archivé)
- **Interface de gestion** complète avec pagination et filtres

### 🔍 SEO Optimisé
- **Métadonnées complètes** (title, description, keywords)
- **Open Graph** et Twitter Cards
- **JSON-LD** pour les données structurées
- **Sitemap.xml** automatique
- **Robots.txt** configuré
- **Manifest PWA** pour l'installation

## 🛠️ Technologies Utilisées

### Frontend
- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **React Icons** - Icônes vectorielles
- **Framer Motion** - Animations (optionnel)

### Backend
- **Prisma ORM** - Base de données
- **PostgreSQL** - Base de données relationnelle
- **bcryptjs** - Hachage des mots de passe
- **API Routes** - Endpoints REST

### SEO & Performance
- **Données structurées** Schema.org
- **Optimisation des images** avec Next.js
- **Lazy loading** des composants
- **Compression** et minification automatique

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- PostgreSQL
- npm ou yarn

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone https://github.com/margoul1/dev-portfolio.git
cd dev-portfolio
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer la base de données**
```bash
# Créer le fichier .env.local
cp .env.example .env.local

# Configurer DATABASE_URL dans .env.local
DATABASE_URL="postgresql://username:password@localhost:5432/dev_portfolio"
```

4. **Initialiser Prisma**
```bash
npx prisma generate
npx prisma db push
```

5. **Créer un utilisateur admin**
```bash
npx prisma db seed
```

6. **Lancer le serveur de développement**
```bash
npm run dev
```

## 📁 Structure du Projet

```
dev-portfolio/
├── app/
│   ├── admin/                 # Panel d'administration
│   ├── api/                   # API Routes
│   ├── auth/                  # Pages d'authentification
│   ├── components/            # Composants réutilisables
│   ├── contexts/              # Contextes React
│   ├── hooks/                 # Hooks personnalisés
│   ├── lib/                   # Utilitaires
│   └── globals.css            # Styles globaux
├── prisma/
│   └── schema.prisma          # Schéma de base de données
├── public/                    # Assets statiques
│   ├── logo.svg               # Logo principal
│   ├── og-image.png           # Image Open Graph
│   ├── manifest.json          # Manifest PWA
│   └── robots.txt             # Configuration SEO
└── middleware.ts              # Middleware de protection
```

## 🔧 Configuration

### Variables d'environnement
```env
# Base de données
DATABASE_URL="postgresql://username:password@localhost:5432/dev_portfolio"

# Authentification
AUTH_SECRET="your-super-secret-auth-key-here"

# SEO
NEXT_PUBLIC_SITE_URL="https://margoul1.dev"
GOOGLE_VERIFICATION_CODE="your-google-verification-code"
```

### Personnalisation

1. **Modifier les informations personnelles** dans `app/components/`
2. **Changer les couleurs** dans `tailwind.config.js`
3. **Mettre à jour le logo** dans `public/logo.svg`
4. **Configurer les métadonnées** dans `app/layout.tsx`

## 📊 SEO Features

### Métadonnées
- ✅ Title dynamique avec template
- ✅ Description optimisée
- ✅ Keywords ciblés
- ✅ Open Graph complet
- ✅ Twitter Cards
- ✅ Canonical URLs

### Données Structurées
- ✅ Schema.org Person
- ✅ Schema.org Organization  
- ✅ Schema.org WebSite
- ✅ Services offerts
- ✅ Compétences techniques

### Performance
- ✅ Images optimisées
- ✅ Lazy loading
- ✅ Compression automatique
- ✅ Cache headers
- ✅ Sitemap XML

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod
```

### Variables d'environnement de production
- `DATABASE_URL` - URL de la base de données
- `AUTH_SECRET` - Clé secrète pour l'authentification
- `NEXT_PUBLIC_SITE_URL` - URL du site en production

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

---

**Développé avec ❤️ par [Margoul1](https://github.com/margoul1)**
