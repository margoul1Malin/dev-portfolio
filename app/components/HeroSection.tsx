'use client';

import { useEffect, useState } from 'react';
import { FaEnvelope, FaEye } from 'react-icons/fa';

const HeroSection = () => {
  const [, setIsScrolled] = useState(false);
  const [, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const btnITems = [
    { 
      id: 'projects', 
      label: 'Voir mes projets',
      icon: FaEye,
      gradient: 'from-yellow-500 to-amber-500',
      hoverGradient: 'from-yellow-600 to-amber-600',
      textColor: 'text-black'
    },
    { 
      id: 'contact', 
      label: 'Me contacter',
      icon: FaEnvelope,
      gradient: 'from-blue-500 to-purple-600',
      hoverGradient: 'from-blue-600 to-purple-700',
      textColor: 'text-white'
    },
  ];

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills = ['React', 'Next.js', 'Django', 'Node.js', 'Python', 'Git'];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Contenu statique pour les bots (invisible mais indexable) */}
      <div className="sr-only">
        <h1>Margoul1 - Développeur Web Full Stack</h1>
        <p>Développeur web passionné basé entre Bordeaux et le Bassin d&apos;Arcachon</p>
        <p>Je crée des expériences web exceptionnelles avec des technologies modernes et un design innovant qui capte l&apos;attention.</p>
        <p>Compétences : React, Next.js, Django, Node.js, Python, Git</p>
        <p>Disponible pour de nouveaux projets</p>
        <nav>
          <a href="#projects">Voir mes projets</a>
          <a href="#contact">Me contacter</a>
        </nav>
      </div>

      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${(i * 7.3) % 100}%`,
              top: `${(i * 11.7) % 100}%`,
              animationDelay: `${(i * 0.3) % 5}s`,
              animationDuration: `${5 + (i * 0.2) % 5}s`
            }}
          />
        ))}
      </div>

      {/* Forme géométrique interactive */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10 animate-morphing"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #fbbf24, #f59e0b, #d97706)`,
          transform: `translate(-50%, -50%) rotate(${mousePosition.x * 0.1}deg)`
        }}
      />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge de statut */}
          <div className="inline-flex items-center px-4 py-2 rounded-full glass mb-8 animate-slide-in-up">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm text-white/80">Disponible pour de nouveaux projets</span>
          </div>

          {/* Titre principal */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-in-up animation-delay-1000">
            <span className="text-gradient">Développeur</span>
            <br />
            <span className="text-white">Web Margoul1</span>
          </h1>

          {/* Sous-titre */}
          <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto animate-slide-in-up animation-delay-2000">
            Je crée des expériences web exceptionnelles avec des technologies modernes
            et un design innovant qui capte l&apos;attention.
          </p>

          {/* Compétences flottantes */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-in-up animation-delay-3000">
            {skills.map((skill, index) => (
              <div
                key={skill}
                className="glass px-4 py-2 rounded-full text-white/80 hover:text-white hover:scale-105 transition-all duration-300 animate-float"
                style={{
                  animationDelay: `${index * 0.5}s`
                }}
              >
                {skill}
              </div>
            ))}
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up animation-delay-4000">
            
            {btnITems.map((btn) => {
              const IconComponent = btn.icon;
              return (
                <button 
                  key={btn.id} 
                  onClick={() => scrollToSection(btn.id)} 
                  className={`group relative px-8 py-4 bg-gradient-to-r ${btn.gradient} rounded-2xl ${btn.textColor} font-semibold hover:scale-105 transition-all duration-300 hover-glow flex items-center justify-center gap-2`}
                >
                  <span className="relative z-10">{btn.label}</span> 
                  <IconComponent className="relative z-10 flex-shrink-0" />
                  <div className={`absolute inset-0 bg-gradient-to-r ${btn.hoverGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </button>
              );
            })}
              
          </div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      
    </section>
  );
};

export default HeroSection; 