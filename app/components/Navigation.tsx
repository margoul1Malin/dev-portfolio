'use client';

import { useState, useEffect } from 'react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'skills', label: 'Compétences' },
    { id: 'projects', label: 'Projets' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-4' : 'py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`glass rounded-2xl px-8 py-4 transition-all duration-300 ${
          isScrolled ? 'glass-strong' : ''
        }`}>
          <div className="flex items-center justify-center">
            {/* Logo centré */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center animate-glow">
                <span className="text-black font-bold text-lg">M</span>
              </div>
              <span className="text-white font-bold text-xl">margoul1</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 