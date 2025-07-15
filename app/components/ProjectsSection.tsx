'use client';

import Link from 'next/link';
import { useState } from 'react';

const ProjectsSection = () => {
  const [filter, setFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "DrHead",
      description: "Une plateforme de Blogging, Vidéos, et Formations en ligne.",
      category: "Full Stack",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Markdown", "CMS"],
      image: "KnowledgerRectangle.png",
      link: "https://drhead.org",
      github: "https://github.com/margoul1Malin",
      featured: true,
      upcoming: false
    },
    {
      id: 2,
      title: "Crypto Listings",
      description: "Site de mise en avant des futurs listings de cryptomonnaies. Principalement via des scrapers.",
      category: "Data Scraping",
      technologies: ["Next.js", "TypeScript", "Tailwind", "Python", "Bash", "Cryptocurrency"],
      image: "LogoCyptoListings.png",
      link: "https://cryptolistings.net",
      github: "https://github.com/margoul1Malin",
      featured: true,
      upcoming: true
    },
     {
      id: 3,
      title: "ClimGo - Chauffage & Climatisation",
      description: "Site vitrine pour une entreprise de chauffage et de climatisation.",
      category: "Site Vitrine",
      technologies: ["Next.js", "TypeScript", "Tailwind", "Prisma", "Shadcn/UI"],
      image: "/sdb-pyla.jpeg",
      link: "https://climgo.fr/",
      github: "https://github.com/margoul1Malin/climgo",
      featured: false,
      upcoming: false
    },
    {
      id: 4,
      title: "Margoul1 Store",
      description: "Application de vente de produits digitaux en ligne.",
      category: "E-Commerce",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "PayPal", "Technologies"],
      image: "LogoMargoul1Store.png",
      link: "#",
      github: "https://github.com/margoul1Malin",
      featured: true,
      upcoming: true
    },
    {
      id: 5,
      title: "Watson",
      description: "Un bien meilleur remplaçant pour Sherlock quand il s'agit d'OSINT",
      category: "OSINT & Data Scraping",
      technologies: ["React", "Python", "BeautifulSoup", "Selenium", "Requests"],
      image: "WatsonLogo.png",
      link: "https://github.com/margoul1Malin",
      github: "https://github.com/margoul1Malin/watson",
      featured: false,
      upcoming: false
    },
    {
      id: 6,
      title: "gOsint",
      description: "Ce sera LE site web framework d'OSINT par excellence regroupant tout ce qu'on peut imaginer avoir besoin un jour.",
      category: "DevOps & OSINT",
      technologies: ["Next.js", "RabbitMQ", "Tailwind", "Python", "Bash", "REST API"],
      image: "LogoGoSint.png",
      link: "#",
      github: "https://github.com/margoul1Malin",
      featured: false,
      upcoming: true
    }
  ];

  const filters = [
    { id: 'all', label: 'Tous', count: projects.length },
    { id: 'featured', label: 'Favoris', count: projects.filter(p => p.featured).length },
    { id: 'fullstack', label: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length },
    { id: 'frontend', label: 'Frontend', count: projects.filter(p => p.category === 'frontend').length },
    { id: 'backend', label: 'Backend', count: projects.filter(p => p.category === 'backend').length }
  ];

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'featured') return project.featured;
    return project.category === filter;
  });

  return (
    <section id="projects" className="py-20 relative">
      {/* Contenu statique pour les bots */}
      <div className="sr-only">
        <h2>Projets de Margoul1 - Développeur Full Stack</h2>
        <p>Portfolio de projets web et applications développées avec React, Next.js, Node.js, Python</p>
        
        <h3>Projets Principaux :</h3>
        <ul>
          <li>DrHead - Plateforme de Blogging, Vidéos, et Formations en ligne (React, Node.js, MongoDB, Stripe)</li>
          <li>Crypto Listings - Site de mise en avant des futurs listings de cryptomonnaies (Next.js, TypeScript, Python)</li>
          <li>ClimGo - Site vitrine pour entreprise de chauffage et climatisation (Next.js, Tailwind, Prisma)</li>
          <li>Margoul1 Store - Application de vente de produits digitaux (React, Node.js, MongoDB, Stripe)</li>
          <li>Watson - Outil d&apos;OSINT avancé (Python, BeautifulSoup, Selenium)</li>
          <li>gOsint - Framework d&apos;OSINT complet (Next.js, TypeScript, Python)</li>
        </ul>
        
        <h3>Technologies utilisées :</h3>
        <p>React, Next.js, TypeScript, Node.js, MongoDB, Python, Tailwind CSS, Prisma, Stripe, BeautifulSoup, Selenium, Bash, Zsh</p>
        
        <h3>Catégories :</h3>
        <ul>
          <li>Développement Full Stack</li>
          <li>Développement Frontend</li>
          <li>Intelligence Artificielle</li>
          <li>DevOps</li>
        </ul>
        
        <p>Projets disponibles sur GitHub : <Link href="https://github.com/margoul1Malin">https://github.com/margoul1Malin</Link></p>
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-in-up">
            <span className="text-gradient">Mes</span>
            <span className="text-white"> Projets</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto animate-slide-in-up animation-delay-1000">
            Découvrez une sélection de mes projets les plus récents et innovants.
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filterItem) => (
            <button
              key={filterItem.id}
              onClick={() => setFilter(filterItem.id)}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                filter === filterItem.id
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-black hover-glow'
                  : 'glass text-white/70 hover:text-white hover:glass-strong'
              }`}
            >
              {filterItem.label}
              <span className="ml-2 text-sm opacity-75">({filterItem.count})</span>
            </button>
          ))}
        </div>

        {/* Grille de projets */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative glass rounded-3xl overflow-hidden hover:glass-strong transition-all duration-500 hover:scale-105 animate-slide-in-up flex flex-col ${
                project.featured ? 'ring-2 ring-yellow-500/50' : ''
              } ${
                project.upcoming ? 'ring-2 ring-orange-500/50 opacity-75' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Badges */}
              <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
                {project.featured && (
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs px-3 py-1 rounded-full animate-pulse">
                    ★ Favori
                  </div>
                )}
                {project.upcoming && (
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                    ⚠ En cours
                  </div>
                )}
              </div>

              {/* Image de fond du projet */}
              <div 
                className="relative h-48 bg-gradient-to-br from-yellow-600/20 to-amber-600/20 flex items-center justify-center bg-cover bg-center"
                style={{
                  backgroundImage: `url(${project.image.startsWith('/') ? project.image : `/${project.image}`})`,
                  backgroundBlendMode: 'overlay'
                }}
              >
                {/* Overlay pour améliorer la lisibilité */}
                <div className="absolute inset-0 bg-black/30"></div>
                
                {/* Overlay au hover */}
                <div className={`absolute inset-0 bg-gradient-to-br from-yellow-600/80 to-amber-600/80 flex items-center justify-center space-x-4 transition-all duration-300 ${
                  hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <Link
                    href={project.link}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                  <Link
                    href={project.github}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Contenu du projet */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300">
                  {project.title}
                </h3>
                
                <p className="text-white/70 mb-4 line-clamp-3 flex-grow">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80 backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex space-x-2">
                    {project.upcoming ? (
                      <div className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg text-white text-sm font-medium cursor-not-allowed opacity-75">
                        ⚠ En développement
                      </div>
                    ) : (
                      <Link
                        href={project.link}
                        className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg text-black text-sm font-medium hover:scale-105 transition-all duration-300"
                      >
                        Voir le projet
                      </Link>
                    )}
                    <Link
                      href={project.github}
                      className="px-4 py-2 glass rounded-lg text-white/80 text-sm font-medium hover:text-white hover:glass-strong transition-all duration-300"
                    >
                      Code
                    </Link>
                  </div>
                  
                  <div className="text-white/50 text-sm">
                    {project.category}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-white/70 mb-6">Envie de voir plus de projets ?</p>
          <Link href="https://github.com/margoul1Malin">
            <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl text-black font-semibold hover:scale-105 transition-all duration-300 hover-glow">
              Voir tous mes projets sur GitHub
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection; 