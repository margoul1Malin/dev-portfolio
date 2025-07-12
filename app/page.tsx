import { Metadata } from 'next';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import StaticContent from './components/StaticContent';
import ScrollPointer from './components/ScrollPointer';
// Métadonnées spécifiques pour la page d'accueil
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://margoul1.dev',
  },
  other: {
    'google-site-verification': 'your-google-verification-code',
  },
};

// Force le rendu statique pour les bots
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidation toutes les heures

export default function Home() {
  return (
    <main className="relative">
      {/* Contenu statique pour les bots (invisible pour les utilisateurs) */}
      <StaticContent />
      
      {/* Interface utilisateur interactive */}
      <Navigation />
      <HeroSection />
      <ScrollPointer />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
