'use client';

import { useState, useEffect } from 'react';
import { FaPalette, FaCogs, FaRocket, FaLaptopCode, FaLinux, FaCreditCard, FaGithub, FaPython, FaTerminal, FaChartBar } from 'react-icons/fa';

const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('skills');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      title: "Frontend",
      icon: <FaPalette className="text-4xl" />,
      skills: [
        { name: "React", level: 95, color: "from-yellow-500 to-amber-500" },
        { name: "Next.js", level: 90, color: "from-gray-700 to-gray-900" },
        { name: "TypeScript", level: 67, color: "from-yellow-600 to-orange-600" },
        { name: "Tailwind CSS", level: 92, color: "from-amber-500 to-orange-500" },
        { name: "Vue.js", level: 75, color: "from-yellow-400 to-amber-400" }
      ]
    },
    {
      title: "Backend",
      icon: <FaCogs className="text-4xl" />,
      skills: [
        { name: "Node.js", level: 75, color: "from-amber-600 to-orange-600" },
        { name: "Python", level: 65, color: "from-yellow-500 to-orange-600" },
        { name: "Prisma", level: 95, color: "from-gray-700 to-gray-900" },
        { name: "MongoDB", level: 87, color: "from-amber-700 to-orange-700" },
        { name: "GraphQL", level: 70, color: "from-yellow-500 to-amber-500" }
      ]
    },
          {
        title: "DevOps & SEO",
        icon: <FaRocket className="text-4xl" />,
        skills: [
          { name: "Docker", level: 65, color: "from-gray-500 to-gray-700" },
          { name: "Git", level: 90, color: "from-red-500 to-red-700" },
          { name: "SEO Technique", level: 85, color: "from-yellow-500 to-amber-500" },
          { name: "Analytics", level: 78, color: "from-orange-500 to-orange-700" },
          { name: "Search Console", level: 82, color: "from-amber-500 to-yellow-500" }
        ]
      }
  ];

  return (
    <section id="skills" className="py-20 relative">
      {/* Contenu statique pour les bots */}
      <div className="sr-only">
        <h2>Mes Compétences</h2>
        <p>Un aperçu de mes compétences techniques et de mon niveau d&apos;expertise dans chaque domaine.</p>
        
        <h3>Frontend</h3>
        <ul>
          <li>React (95%)</li>
          <li>Next.js (90%)</li>
          <li>TypeScript (67%)</li>
          <li>Tailwind CSS (92%)</li>
          <li>Vue.js (75%)</li>
        </ul>
        
        <h3>Backend</h3>
        <ul>
          <li>Node.js (75%)</li>
          <li>Python (65%)</li>
          <li>Prisma (95%)</li>
          <li>MongoDB (87%)</li>
          <li>GraphQL (70%)</li>
        </ul>
        
        <h3>DevOps & SEO</h3>
        <ul>
          <li>Docker (65%)</li>
          <li>Git (90%)</li>
          <li>SEO Technique (85%)</li>
          <li>Analytics (78%)</li>
          <li>Search Console (82%)</li>
        </ul>
        
        <h3>Outils & Technologies</h3>
        <ul>
          <li>VS Code</li>
          <li>Linux</li>
          <li>Stripe</li>
          <li>Git</li>
          <li>Python</li>
          <li>Bash</li>
          <li>UberSuggest</li>
        </ul>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-in-up">
            <span className="text-gradient">Mes</span>
            <span className="text-white"> Compétences</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto animate-slide-in-up animation-delay-1000">
            Un aperçu de mes compétences techniques et de mon niveau d&apos;expertise dans chaque domaine.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`glass rounded-3xl p-8 hover:glass-strong transition-all duration-500 ${
                isVisible ? 'animate-slide-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${categoryIndex * 0.2}s` }}
            >
              {/* En-tête de catégorie */}
              <div className="text-center mb-8">
                <div className="mb-3 animate-float text-yellow-500" style={{ animationDelay: `${categoryIndex * 0.5}s` }}>
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mx-auto"></div>
              </div>

              {/* Liste des compétences */}
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className="group"
                    onMouseEnter={() => setHoveredSkill(`${category.title}-${skill.name}`)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-white/60 text-sm">{skill.level}%</span>
                    </div>
                    
                    {/* Barre de progression */}
                    <div className="relative">
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out ${
                            hoveredSkill === `${category.title}-${skill.name}` ? 'animate-pulse' : ''
                          }`}
                          style={{
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${(categoryIndex * 0.2) + (skillIndex * 0.1)}s`
                          }}
                        />
                      </div>
                      
                      {/* Effet de brillance */}
                      {hoveredSkill === `${category.title}-${skill.name}` && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-slide-in-right"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Section outils & technologies */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Certains outils & Compétence</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "VS Code", icon: <FaLaptopCode className="text-2xl" /> },
              { name: "Linux", icon: <FaLinux className="text-2xl" /> },
              { name: "Stripe", icon: <FaCreditCard className="text-2xl" /> },
              { name: "Git", icon: <FaGithub className="text-2xl" /> },
              { name: "Python", icon: <FaPython className="text-2xl" /> },
              { name: "Bash", icon: <FaTerminal className="text-2xl" /> },
              { name: "UberSuggest", icon: <FaChartBar className="text-2xl" /> },
            ].map((tool, index) => (
              <div
                key={tool.name}
                className="glass px-6 py-4 rounded-2xl hover:glass-strong transition-all duration-300 hover:scale-105 animate-float"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-500">{tool.icon}</span>
                  <span className="text-white font-medium">{tool.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section CV central */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Mon CV Informatique</h3>
          <p className="text-white/70 mb-12 max-w-2xl mx-auto">
            Découvrez mon parcours professionnel détaillé, mes expériences et mes formations.
          </p>
          
          {/* Bouton CV central avec cercles animés */}
          <div className="flex justify-center">
            <button 
              className="group relative w-80 h-80 mx-auto transition-all duration-300 hover:scale-105"
              onClick={() => {
                const cvSection = document.getElementById('cv-section');
                if (cvSection) {
                  cvSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {/* Cercles animés de fond */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full animate-pulse animation-delay-1000"></div>
              <div className="absolute inset-8 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-full animate-pulse animation-delay-2000"></div>
              
              {/* Bouton CV central */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center text-black font-bold text-2xl hover-glow group-hover:scale-110 transition-all duration-300">
                  <span className="flex flex-col items-center">
                    <span className="text-3xl mb-1">CV</span>
                    <svg className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 