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
    url: 'https://www.margoul1.dev/contact',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Margoul1 - Développeur Web',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Margoul1 - Développeur Web Full Stack | Portfolio',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.margoul1.dev/contact',
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