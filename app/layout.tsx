import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";
import StructuredData from "./components/StructuredData";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://www.margoul1.dev' : 'http://localhost:3000'),
  title: {
    default: "Margoul1 - Développeur Web Full Stack | Portfolio",
    template: "%s | Margoul1 - Développeur Web"
  },
  description: "Développeur web full stack passionné basé entre Bordeaux et le Bassin d'Arcachon, spécialisé en React, Next.js, Django et Node.js. Découvrez mes projets et contactez-moi pour vos besoins de développement web moderne.",
  keywords: [
    "développeur web",
    "full stack",
    "React",
    "Next.js", 
    "Django",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "Python",
    "portfolio",
    "développement web",
    "applications web",
    "sites web modernes",
    "Margoul1",
    "développeur web Bordeaux",
    "développeur web Bassin d'Arcachon",
    "développeur web Nouvelle-Aquitaine",
    "freelance Bordeaux",
    "développeur React Bordeaux",
    "développeur Next.js Bordeaux",
    "création de sites web",
    "création de sites web Bordeaux",
    "création de sites web Bassin d'Arcachon",
    "création de sites web Nouvelle-Aquitaine",
    "création de sites web Marcheprime",
  ],
  authors: [{ name: "Margoul1", url: "https://margoul1.dev" }],
  creator: "Margoul1",
  publisher: "Margoul1",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.margoul1.dev',
    siteName: 'Margoul1 - Développeur Web',
    title: 'Margoul1 - Développeur Web Full Stack | Portfolio',
    description: 'Développeur web full stack entre Bordeaux et le Bassin d\'Arcachon, à Marcheprime. Création de sites web.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Margoul1 - Développeur Web Full Stack | Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Margoul1 - Développeur Web Full Stack',
    description: 'Développeur web full stack passionné basé entre Bordeaux et le Bassin d\'Arcachon, spécialisé en React, Next.js, Django et Node.js.',
    images: ['/og-image.png'],
    creator: '@margoul1',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.svg',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://www.margoul1.dev',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        <AuthProvider>
          <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-2000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-4000"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
