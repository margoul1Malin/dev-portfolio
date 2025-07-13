'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const NotFoundPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden flex items-center justify-center">
      {/* Effet de particules de fond */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-amber-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-amber-300 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Effet de curseur lumineux */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(255, 193, 7, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          transition: 'all 0.1s ease-out',
        }}
      />

      {/* Contenu principal */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        {/* Titre 404 avec effet glitch */}
        <div className="relative mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-red-500 opacity-20 animate-ping">
            404
          </div>
        </div>

        {/* Message d'erreur */}
        <div className="mb-8 animate-slide-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Oups ! Page introuvable
          </h2>
          <p className="text-xl text-white/70 mb-6">
            Il semblerait que cette page ait disparu dans les méandres du web...
          </p>
        </div>

        {/* Illustration avec emoji animé */}
        <div className="mb-8 animate-slide-in-up animation-delay-500">
          <div className="text-6xl mb-4 animate-bounce">🤖</div>
          <p className="text-white/60 text-lg">
            Mon robot de développement n&apos;a pas pu localiser cette ressource !
          </p>
        </div>

        {/* Suggestions */}
        <div className="mb-8 animate-slide-in-up animation-delay-1000">
          <h3 className="text-xl font-semibold text-white mb-4">
            Que souhaitez-vous faire ?
          </h3>
          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Link href="/">
              <div className="glass rounded-2xl p-6 hover:glass-strong transition-all duration-300 hover:scale-105 group">
                <div className="text-2xl mb-2 group-hover:animate-bounce">🏠</div>
                <h4 className="font-semibold text-white mb-2">Accueil</h4>
                <p className="text-white/70 text-sm">Retour à la page principale</p>
              </div>
            </Link>
            
            <Link href="/#projects">
              <div className="glass rounded-2xl p-6 hover:glass-strong transition-all duration-300 hover:scale-105 group">
                <div className="text-2xl mb-2 group-hover:animate-bounce">💼</div>
                <h4 className="font-semibold text-white mb-2">Projets</h4>
                <p className="text-white/70 text-sm">Découvrir mes réalisations</p>
              </div>
            </Link>
            
            <Link href="/contact">
              <div className="glass rounded-2xl p-6 hover:glass-strong transition-all duration-300 hover:scale-105 group">
                <div className="text-2xl mb-2 group-hover:animate-bounce">📧</div>
                <h4 className="font-semibold text-white mb-2">Contact</h4>
                <p className="text-white/70 text-sm">Me contacter directement</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up animation-delay-1500">
          <Link href="/">
            <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl text-black font-semibold hover:scale-105 transition-all duration-300 hover-glow">
              Retour à l&apos;accueil
            </button>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="px-8 py-4 glass rounded-2xl text-white/80 font-medium hover:text-white hover:glass-strong transition-all duration-300"
          >
            Page précédente
          </button>
        </div>

        {/* Message de développeur */}
        <div className="mt-12 animate-slide-in-up animation-delay-2000">
          <div className="glass rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="text-2xl mb-3">👨‍💻</div>
            <h4 className="font-semibold text-white mb-2">Message du développeur</h4>
            <p className="text-white/70 text-sm">
              Si vous pensez qu&apos;il s&apos;agit d&apos;une erreur ou si vous avez des questions, 
              n&apos;hésitez pas à me contacter. Je suis toujours disponible pour améliorer l&apos;expérience utilisateur !
            </p>
          </div>
        </div>

        {/* Code d'erreur technique */}
        <div className="mt-8 animate-slide-in-up animation-delay-2500">
          <div className="inline-block glass rounded-lg px-4 py-2">
            <code className="text-yellow-400 text-sm font-mono">
              Error 404: Resource not found in /app/[...path]
            </code>
          </div>
        </div>
      </div>

      {/* Contenu SEO caché */}
      <div className="sr-only">
        <h1>Page 404 - Page non trouvée - Margoul1 Portfolio</h1>
        <p>La page que vous recherchez n&apos;existe pas ou a été déplacée. Margoul1, développeur full stack, portfolio de projets web.</p>
        <p>Navigation : Accueil, Projets, Contact, Services de développement web</p>
      </div>
    </div>
  );
};

export default NotFoundPage; 