'use client';

import { useState } from 'react';

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('story');

  const tabs = [
    { id: 'story', label: 'Mon Histoire', icon: '📖' },
    { id: 'values', label: 'Mes Valeurs', icon: '💎' },
    { id: 'hobbies', label: 'Passions', icon: '🎯' }
  ];

  const content = {
    story: {
      title: "Mon Parcours",
      text: "Passioné par l'informatique depuis longtemps, j'ai commencé mon voyage en tant que développeur web autodidacte. De Hobbie on est passé à Professionnel, je suis passé par plein de projets et technologies diverses et variées. Mais ma capacité à construire et rendre des sites web rapidement et avec soin à vite pris le dessus. Je me suis formé aux bases d'Active Directory, et ai pas mal parcouru les plateformes de CTF afin de parfaire ma boîte à outil informatique.",
      highlights: ["3+ années d'expérience", "10+ projets réalisés", "100% Clients Satisfaits"]
    },
    values: {
      title: "Mes Principes",
      text: "J'en ai absolument aucun. Je préfère laisser les gens faire ce qu'ils veulent, et moi faire ce que je veux puis m'adapter à ce qui se présente à moi, peut-être que ce sera vous ? :)",
      highlights: ["Code propre", "Performance optimale", "Accessibilité universelle"]
    },
    hobbies: {
      title: "Mes Passions",
      text: "Quand je ne suis pas concentré sur le dev, je me concentre principalement sur la gestion de la sécurité informatique, le sport et la nutrition.",
      highlights: ["Veille technologique", "Jeux Vidéos", "Apprendre tout et n'importe quoi"]
    }
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-in-up">
            <span className="text-gradient">À Propos</span>
            <span className="text-white"> de Moi</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto animate-slide-in-up animation-delay-1000">
            Découvrez qui je suis et ce qui me motive dans ma passion pour le développement web.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo et infos personnelles */}
          <div className="relative animate-slide-in-left">
            <div className="relative">
              {/* Placeholder pour la photo */}
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-yellow-500 to-amber-500 rounded-3xl flex items-center justify-center text-6xl animate-float">
                👨‍💻
              </div>
              
              {/* Éléments décoratifs */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-80 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl opacity-80 animate-pulse animation-delay-2000"></div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center glass rounded-2xl p-4 hover:glass-strong transition-all duration-300">
                <div className="text-2xl font-bold text-gradient">3+</div>
                <div className="text-sm text-white/70">Années</div>
              </div>
              <div className="text-center glass rounded-2xl p-4 hover:glass-strong transition-all duration-300">
                <div className="text-2xl font-bold text-gradient">10+</div>
                <div className="text-sm text-white/70">Projets</div>
              </div>
              <div className="text-center glass rounded-2xl p-4 hover:glass-strong transition-all duration-300">
                <div className="text-2xl font-bold text-gradient">100%</div>
                <div className="text-sm text-white/70">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Contenu interactif */}
          <div className="animate-slide-in-right">
            {/* Onglets */}
            <div className="flex space-x-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'glass-strong text-white'
                      : 'glass text-white/70 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Contenu de l'onglet actif */}
            <div className="glass rounded-2xl p-8 min-h-[300px]">
              <h3 className="text-2xl font-bold text-white mb-4">
                {content[activeTab as keyof typeof content].title}
              </h3>
              
              <p className="text-white/80 leading-relaxed mb-6">
                {content[activeTab as keyof typeof content].text}
              </p>

              <div className="space-y-3">
                {content[activeTab as keyof typeof content].highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full"></div>
                    <span className="text-white/90">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bouton CTA */}
            <div className="mt-8">
              <button className="group px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl text-black font-semibold hover:scale-105 transition-all duration-300 hover-glow">
                <span className="flex items-center space-x-2">
                  <span>Télécharger mon CV</span>
                  <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 