import { Metadata } from 'next'
import ContactSection from '../components/ContactSection'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Contact - Margoul1 Développeur Web',
  description: 'Contactez Margoul1 pour vos projets de développement web. Spécialisé en React, Next.js, Django et Node.js. Devis gratuit et réponse rapide.',
  keywords: [
    'contact développeur web',
    'devis développement web',
    'Margoul1 contact',
    'développeur web freelance',
    'projet web',
    'contact React developer',
    'contact Next.js developer'
  ],
  openGraph: {
    title: 'Contact - Margoul1 Développeur Web',
    description: 'Contactez Margoul1 pour vos projets de développement web. Spécialisé en React, Next.js, Django et Node.js.',
    url: 'https://margoul1.dev/contact',
  },
  alternates: {
    canonical: 'https://margoul1.dev/contact',
  },
}

// Optimisation pour les bots
export const dynamic = 'force-static';
export const revalidate = 3600;

export default function ContactPage() {
  return (
    <main className="relative">
      <Navigation />
      <div className="pt-20">
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
} 