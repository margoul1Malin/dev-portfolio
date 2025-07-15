'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PricingPlan {
  id: string;
  title: string;
  description: string;
  category: string;
  features: string[];
  addons?: { name: string; price: number | string }[];
  price?: number | string;
  priceLabel?: string;
  isContactOnly: boolean;
  popular: boolean;
  deliveryTime: string;
  icon: string;
}

const PricingSection = () => {
  const [, setHoveredPlan] = useState<string | null>(null);

  // Structure flexible pour permettre la gestion depuis le panel admin
  const pricingPlans: PricingPlan[] = [
    {
      id: 'landing-page',
      title: 'Landing Page',
      description: 'Page d\'atterrissage optimisée pour la conversion',
      category: 'Site Simple',
      features: [
        'Design responsive et moderne',
        'Optimisation SEO incluse',
        'Formulaire de contact/newsletter',
        'Intégration analytics',
      ],
      addons: [
        { name: 'Animations avancées', price: 100 },
        { name: 'Multilingue', price: 60 },
        { name: 'Chatbot simple', price: 200 }
      ],
      price: "120 - 400",
      priceLabel: '€',
      isContactOnly: false,
      popular: false,
      deliveryTime: '2-3 jours',
      icon: '🚀'
    },
    {
      id: 'site-vitrine',
      title: 'Site Vitrine',
      description: 'Présentation professionnelle de votre entreprise',
      category: 'Site Corporate',
      features: [
        'Design sur demande & sur mesure',
        'Jusqu\'à 15 pages',
        'Optimisation SEO avancée',
        'Galerie photos/vidéos',
        'Formulaires de contact',
        'Intégration réseaux sociaux',
      ],
      addons: [
        { name: 'Espace client', price: 200 },
        { name: 'Système de réservation', price: 300 },
        { name: 'Intégration système de rendez-vous', price: 100 },
        { name: 'Newsletter automatique', price: 150 },
        { name: 'Blog in-site', price: 100 }
      ],
      price: "250 - 2000",
      priceLabel: '€',
      isContactOnly: false,
      popular: true,
      deliveryTime: '4-6 jours',
      icon: '🏢'
    },
    {
      id: 'e-commerce',
      title: 'E-Commerce',
      description: 'Boutique en ligne complète et sécurisée',
      category: 'Site Marchand',
      features: [
        'Catalogue produits illimité',
        'Panier et checkout sécurisé',
        'Gestion des stocks',
        'Moyens de paiement multiples (Stripe, PayPal, etc.)',
        'Espace client',
        'Panel admin sophistiqué',
        'Optimisation SEO e-commerce',
        'Support technique 30 jours'
      ],
      addons: [
        { name: 'Programme de fidélité', price: 400 },
        { name: 'Avis clients avancés', price: 200 },
        { name: 'Marketplace multi-vendeurs', price: 800 }
      ],
      price: "650 - 3000",
      priceLabel: '€',
      isContactOnly: false,
      popular: false,
      deliveryTime: '10-20 jours',
      icon: '🛒'
    },
    {
      id: 'site-contenu',
      title: 'Site de Contenu',
      description: 'Blog ou Plateforme de Vidéos',
      category: 'Site Éditorial',
      features: [
        'CMS personnalisé',
        'Système de catégories',
        'Commentaires et interactions',
        'Newsletter intégrée',
        'Optimisation SEO contenu',
        'Espace rédacteur',
        'Support technique 30 jours'
      ],
      addons: [
        { name: 'Plateforme de Vidéos intégrée', price: 300 },
        { name: 'Système de likes/partages', price: 150 },
        { name: 'Abonnements payants', price: 200 }
      ],
      price: "500 - 2000",
      priceLabel: '€',
      isContactOnly: false,
      popular: false,
      deliveryTime: '8-15 jours',
      icon: '📝'
    },
    
    {
      id: 'web-app',
      title: 'Web App',
      description: 'Application web sur mesure selon vos besoins',
      category: 'Application',
      features: [
        'Développement sur mesure',
        'Interface utilisateur avancée',
        'Base de données personnalisée',
        'API REST intégrée',
        'Authentification sécurisée',
        'Tableau de bord admin',
        'Tests et débogage',
        'Support technique 30 jours'
      ],
      addons: [
        { name: 'Application mobile', price: 600 },
        { name: 'Intégrations tierces', price: '0-500' }
      ],
      isContactOnly: true,
      popular: false,
      deliveryTime: 'Voir Contact',
      icon: '💻'
    },
    {
      id: 'forum',
      title: 'Forum',
      description: 'Communauté en ligne avec système de discussion',
      category: 'Site Communautaire',
      features: [
        'Système de forums/sujets',
        'Profils utilisateurs',
        'Système de modération',
        'Notifications en temps réel',
        'Recherche avancée',
        'Badges et récompenses',
        'Mobile responsive',
        'Support technique 90 jours'
      ],
      addons: [
        { name: 'Messagerie privée', price: 150 },
        { name: 'Système de réputation', price: 200 },
        { name: 'Marketplace intégrée', price: 400 }
      ],
      price: "500 - 1700",
      priceLabel: '€',
      isContactOnly: false,
      popular: false,
      deliveryTime: '14-21 jours',
      icon: '💬'
    },
    {
      id: 'evenementiel',
      title: 'Événementiel',
      description: 'Site dédié à la gestion d\'événements',
      category: 'Site Événement',
      features: [
        'Gestion des inscriptions',
        'Billetterie intégrée',
        'Programme et planning',
        'Gestion des intervenants',
        'Notifications automatiques',
        'Reporting et statistiques',
        'Intégration calendrier',
        'Support technique 60 jours'
      ],
      addons: [
        { name: 'Voir Selon Vos Besoins', price: '0' },
      ],
      price: "600 - 3000",
      priceLabel: '€',
      isContactOnly: false,
      popular: false,
      deliveryTime: '10-14 jours',
      icon: '🎉'
    },
    {
      id: 'reseaux-sociaux',
      title: 'Réseaux Sociaux',
      description: 'Plateforme sociale personnalisée',
      category: 'Site Social',
      features: [
        'Profils utilisateurs complets',
        'Système d\'amis/followers',
        'Publications et interactions',
        'Messagerie privée',
        'Groupes et communautés',
        'Modération avancée',
        'API pour applications mobiles',
        'Support technique 180 jours'
      ],
      addons: [
        { name: 'Algorithme de Recommandation', price: "0-1500€" },
        { name: 'Voir Selon Vos Besoins', price: "0" },
      ],
      isContactOnly: true,
      popular: false,
      deliveryTime: 'Sur devis',
      icon: '👥'
    }
  ];

  const formatPrice = (plan: PricingPlan) => {
    if (plan.isContactOnly) {
      return 'Sur devis';
    }
    return `${plan.price}${plan.priceLabel}`;
  };

  return (
    <section id="pricing" className="py-20 relative">
      {/* Contenu statique pour les bots */}
      <div className="sr-only">
        <h2>Tarifs de Développement Web - Margoul1 Développeur Full Stack</h2>
        <p>Services de création de sites web, applications et solutions digitales sur mesure</p>
        
        <h3>Services proposés :</h3>
        <ul>
          <li>Landing Page - À partir de 120€ - Page d&apos;atterrissage optimisée</li>
          <li>Site Vitrine - À partir de 250€ - Présentation professionnelle</li>
          <li>E-Commerce - À partir de 650€ - Boutique en ligne complète</li>
          <li>Site de Contenu - À partir de 500€ - Blog ou magazine en ligne</li>
          <li>Web App - Sur devis - Application web sur mesure</li>
          <li>Forum - À partir de 500€ - Communauté en ligne</li>
          <li>Site Événementiel - À partir de 600€ - Gestion d&apos;événements</li>
          <li>Réseaux Sociaux - Sur devis - Plateforme sociale</li>
        </ul>
        
        <p>Tous les projets incluent : Design responsive, Optimisation SEO, Support technique, etc.</p>
        <p>Contact : Devis gratuit et personnalisé pour tous les projets</p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-in-up">
            <span className="text-gradient">Mes</span>
            <span className="text-white"> Tarifs</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto animate-slide-in-up animation-delay-1000">
            Des solutions web sur mesure adaptées à vos besoins et votre budget.
            Chaque projet est unique et mérite une attention particulière.<br></br><br></br>
            (<strong>Les prix sont indicatifs et peuvent varier en fonction des besoins et des spécificités du projet ainsi que des moyens du client.</strong>)
          </p>
        </div>

        {/* Grille de tarifs */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`group relative glass rounded-3xl overflow-hidden hover:glass-strong transition-all duration-500 hover:scale-105 animate-slide-in-up flex flex-col ${
                plan.popular ? 'ring-2 ring-yellow-500/50' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Badge populaire */}
              {plan.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs px-3 py-1 rounded-full animate-pulse">
                    ⭐ Populaire
                  </div>
                </div>
              )}

              {/* Header de la carte */}
              <div className="p-6 text-center border-b border-white/10">
                <div className="text-4xl mb-4">{plan.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                  {plan.title}
                </h3>
                <p className="text-white/70 mb-4">
                  {plan.description}
                </p>
                <div className="text-sm text-white/50 mb-4">
                  {plan.category}
                </div>
                
                {/* Prix */}
                <div className="mb-4">
                  {plan.isContactOnly ? (
                    <div className="text-2xl font-bold text-gradient">
                      Contact
                    </div>
                  ) : (
                    <div className="text-4xl font-bold text-gradient mb-2">
                      {formatPrice(plan)}
                    </div>
                  )}
                  <div className="text-sm text-white/60">
                    Livraison : {plan.deliveryTime}
                  </div>
                </div>
              </div>

              {/* Fonctionnalités */}
              <div className="p-6 flex-1">
                {/* Features incluses */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Addons optionnels */}
                {plan.addons && plan.addons.length > 0 && (
                  <div className="border-t border-white/10 pt-4">
                    <h5 className="text-white/60 text-xs uppercase tracking-wider mb-3 font-medium">
                      Options supplémentaires
                    </h5>
                    <ul className="space-y-3">
                      {plan.addons.map((addon, addonIndex) => (
                        <li key={addonIndex} className="flex items-start space-x-3">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <span className="text-white/70 text-sm">{addon.name}</span>
                            <span className="text-gradient text-sm font-medium ml-2">+{addon.price}€</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="p-6 pt-0">
                {plan.isContactOnly ? (
                  <Link href="/contact" className="w-full">
                    <button className="cursor-pointer w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl text-black font-semibold hover:scale-105 transition-all duration-300 hover-glow">
                      Demander un devis
                    </button>
                  </Link>
                                 ) : (
                   <div className="space-y-4">
                     <Link href="/contact">
                       <button className="my-4 cursor-pointer w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl text-black font-semibold hover:scale-105 transition-all duration-300 hover-glow">
                         Commander maintenant
                       </button>
                     </Link>
                     <Link href="/contact">
                       <button className="cursor-pointer  w-full px-6 py-3 glass rounded-xl text-white/80 font-medium hover:text-white hover:glass-strong transition-all duration-300">
                         Discuter du projet
                       </button>
                     </Link>
                   </div>
                 )}
              </div>
            </div>
          ))}
          
          {/* Carte spéciale pour autres services */}
          <div className="group relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg border border-purple-500/30 rounded-3xl overflow-hidden hover:border-purple-400/50 transition-all duration-500 hover:scale-105 animate-slide-in-up flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="p-8 text-center flex-1 flex flex-col justify-center relative z-10">
              <div className="text-6xl mb-6 animate-bounce">🚀</div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                Autre Service ?
              </h3>
              
              <p className="text-white/80 mb-6 text-lg">
                Vous avez un projet spécifique en tête qui ne correspond à aucune de ces catégories ?
              </p>
              
              <div className="space-y-4">
                <p className="text-white/70 text-sm">
                  Découvrez d&apos;autres services sur
                </p>
                
                <Link
                  href="https://margoul1.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  Voir sur mon autre Portfolio →
                </Link>
                
                <p className="text-white/60 text-xs">
                  Ou contactez-moi directement pour discuter de votre projet
                </p>
              </div>
            </div>
            
            {/* Effet de particules décoratif */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-4 left-4 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="glass rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Besoin d&apos;un projet sur mesure ?
            </h3>
            <p className="text-white/70 mb-6">
              Chaque projet est unique. Contactez-moi pour discuter de vos besoins spécifiques 
              et obtenir un devis personnalisé gratuit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="cursor-pointer px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl text-black font-semibold hover:scale-105 transition-all duration-300 hover-glow">
                  Prenez Contact
                </button>
              </Link>
              <Link href="#projects">
                <button className="cursor-pointer px-8 py-4 glass rounded-2xl text-white/80 font-medium hover:text-white hover:glass-strong transition-all duration-300">
                  Voir certaines réalisations
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
