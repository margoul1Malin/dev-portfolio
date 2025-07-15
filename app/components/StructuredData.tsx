'use client';

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Margoul1",
    "jobTitle": "Développeur Web Full Stack",
    "description": "Développeur web full stack passionné, spécialisé en React, Next.js, Django, Node.js et SEO",
    "url": "https://margoul1.dev",
    "image": "https://margoul1.dev/favicon.ico",
    "sameAs": [
      "https://github.com/margoul1Malin",
      "https://linkedin.com/in/th%C3%A9o-morio-0901b1254/",
      "https://twitter.com/PinokioS1ffredi"
    ],
    "knowsAbout": [
      "React",
      "Next.js",
      "Django",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "Python",
      "Web Development",
      "Full Stack Development",
      "SEO",
      "Google Search Console",
      "Bing Webmaster Tools",
      "Bash / Zsh"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Développeur Web Full Stack",
      "occupationLocation": {
        "@type": "Place",
        "name": "Région Bordelaise",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Nouvelle-Aquitaine",
          "addressCountry": "France",
          "addressLocality": "Entre Bordeaux et Bassin d'Arcachon"
        }
      },
      "skills": [
        "React",
        "Next.js",
        "Django",
        "Node.js",
        "JavaScript",
        "TypeScript",
        "Python",
        "Git",
        "Web Development",
        "SEO",
        "Google Search Console",
        "Bing Webmaster Tools",
        "Bash / Zsh"
      ]
    },
    "offers": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Développement Web",
        "description": "Services de développement web full stack, création d'applications web modernes et sites web responsive",
        "skills": [
          "React",
          "Next.js",
          "Django",
          "Node.js",
          "SEO"
        ]
      }
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "professional",
      "url": "https://margoul1.dev"
    },
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Nouvelle-Aquitaine",
      "addressCountry": "France",
      "addressLocality": "Entre Bordeaux et Bassin d'Arcachon"
    },
    "areaServed": [
      {
        "@type": "Place",
        "name": "Bordeaux"
      },
      {
        "@type": "Place", 
        "name": "Bassin d'Arcachon"
      },
      {
        "@type": "Place",
        "name": "Nouvelle-Aquitaine"
      },
      {
        "@type": "Place",
        "name": "France"
      },
      {
        "@type": "Place",
        "name": "Marcheprime"
      },
      {
        "@type": "Place",
        "name": "Arcachon"
      },
      {
        "@type": "Place",
        "name": "Gujan-Mestras"
      },
      {
        "@type": "Place",
        "name": "La Teste-de-Buch"
      },
      {
        "@type": "Place",
        "name": "Le Teich"
      },
      {
        "@type": "Place",
        "name": "Biganos"
      },
      {
        "@type": "Place",
        "name": "Bègles"
      },
      {
        "@type": "Place",
        "name": "Pessac"
      },
      {
        "@type": "Place",
        "name": "Mérignac"
      },
      {
        "@type": "Place",   
        "name": "Cestas"
      },
      {
        "@type": "Place",
        "name": "Worldwide"
      }
    ]
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Margoul1 - Développeur Web",
    "url": "https://margoul1.dev",
    "logo": "https://margoul1.dev/logo.svg",
    "description": "Services de développement web full stack, spécialisé en React, Next.js, Django et Node.js",
    "founder": {
      "@type": "Person",
      "name": "Théo Morio",
      "email": "contact@margoul1.dev",
      "telephone": "+33 6 43 32 34 12",
      "sameAs": [
        "https://github.com/margoul1Malin",
        "https://linkedin.com/in/th%C3%A9o-morio-0901b1254/",
        "https://twitter.com/PinokioS1ffredi"
      ]
    },
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Nouvelle-Aquitaine",
      "addressCountry": "France",
      "addressLocality": "Entre Bordeaux et Bassin d'Arcachon"
    },
    "areaServed": [
      {
        "@type": "Place",
        "name": "Bordeaux"
      },
      {
        "@type": "Place",
        "name": "Bassin d'Arcachon"
      },
      {
        "@type": "Place",
        "name": "Nouvelle-Aquitaine"
      },
      {
        "@type": "Place",
        "name": "France"
      },
      {
        "@type": "Place",
        "name": "Marcheprime"
      },
      {
        "@type": "Place",
        "name": "Arcachon"
      },
      {
        "@type": "Place",
        "name": "Gujan-Mestras"
      },
      {
        "@type": "Place",
        "name": "La Teste-de-Buch"
      },
      {
        "@type": "Place",
        "name": "Le Teich"
      },
      {
        "@type": "Place",
        "name": "Biganos"   
      },
      {
        "@type": "Place",
        "name": "Bègles"
      },
      {
        "@type": "Place",
        "name": "Pessac"
      },
      {
        "@type": "Place",
        "name": "Mérignac"
      },
      {
        "@type": "Place",
        "name": "Cestas"
      },
      {
        "@type": "Place",
        "name": "Worldwide"
      }
    ],
    "service": [
      {
        "@type": "Service",
        "name": "Développement Frontend",
        "description": "Création d'interfaces utilisateur modernes avec React et Next.js"
      },
      {
        "@type": "Service", 
        "name": "Développement Backend",
        "description": "Développement d'APIs et services backend avec Django et Node.js"
      },
      {
        "@type": "Service",
        "name": "Développement Full Stack",
        "description": "Solutions complètes de développement web de A à Z"
      },
      {
        "@type": "Service",
        "name": "SEO",
        "description": "Optimisation pour les moteurs de recherche"
      },
      {
        "@type": "Service",
        "name": "Maintenance",  
        "description": "Maintenance de sites web existants"
      },
      {
        "@type": "Service",
        "name": "Formation",
        "description": "Formation en développement web"
      }
    ]
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Margoul1 - Portfolio Développeur Web",
    "url": "https://margoul1.dev",
    "description": "Portfolio professionnel de Margoul1, développeur web full stack",
    "author": {
      "@type": "Person",
      "name": "Margoul1",
      "email": "contact@margoul1.dev",
      "telephone": "+33 6 43 32 34 12",
      "sameAs": [
        "https://github.com/margoul1Malin",
        "https://linkedin.com/in/th%C3%A9o-morio-0901b1254/",
        "https://twitter.com/PinokioS1ffredi"
      ]
    },
    "inLanguage": "fr-FR",
    "copyrightYear": new Date().getFullYear(),
    "copyrightHolder": {
      "@type": "Person",
      "name": "Margoul1",
      "email": "contact@margoul1.dev",
      "telephone": "+33 6 43 32 34 12",
      "sameAs": [
        "https://github.com/margoul1Malin",
        "https://linkedin.com/in/th%C3%A9o-morio-0901b1254/",
        "https://twitter.com/PinokioS1ffredi"
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData)
        }}
      />
    </>
  );
} 