# ✅ Tâches restantes à réaliser

## 📦 Fonctionnalités Techniques

- [ ] **Implémenter SSG/ISR pour GoogleBot**
  - Vérifier les routes qui doivent être statiques
  - Configurer `getStaticProps` et/ou `getServerSideProps` si besoin
  - Tester le rendu via un User-Agent Googlebot (SEO)

## 🧩 Modèles de Données

- [ ] **Créer le modèle `User` (Admin)**
  - Champs : `id`, `email`, `passwordHash`, `role`, `createdAt`
  - Authentification sécurisée (hashage, token/session)

- [ ] **Créer le modèle `ContactQuery`**
  - Champs : `id`, `name`, `email`, `message`, `createdAt`, `status`

## 🛠️ Interface d'Administration

- [ ] **Créer le panel Admin**
  - Authentification via `User`
  - Layout sécurisé / route protégée
  - Vue d’ensemble des données importantes

- [ ] **Gérer les contacts (ContactQuery)**
  - Voir / trier / répondre / archiver les messages

## 🌐 Configuration Domaine

- [ ] **Acheter un nom de domaine**
  - Suggestions : [Google Domains](https://domains.google) / [Namecheap](https://www.namecheap.com)

- [ ] **Configurer le nom de domaine**
  - Ajouter domaine dans la console d’hébergement (Vercel, Netlify, etc.)
  - Mettre à jour les DNS
  - Redirections HTTPS et www

Analytics aussi
---

🗒️ **Conseil :** Prioriser la mise en place du modèle `User` et du panel Admin pour sécuriser les outils internes, puis finaliser la partie SEO avec le SSG/ISR.
