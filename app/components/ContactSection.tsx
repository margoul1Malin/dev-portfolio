'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaTwitter, FaBriefcase, FaCheckCircle, FaExclamationCircle, FaInstagram } from 'react-icons/fa';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setNotification({
          type: 'success',
          message: data.message || 'Votre message a été envoyé avec succès !'
        });
        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setNotification({
          type: 'error',
          message: data.error || 'Une erreur est survenue. Veuillez réessayer.'
        });
      }
    } catch (error) {
      console.log(error);
      setNotification({
        type: 'error',
        message: 'Erreur de connexion. Veuillez vérifier votre connexion internet.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: <FaEnvelope className="text-xl" />,
      title: "Email",
      value: "contact@margoul1.dev",
      link: "mailto:contact@margoul1.dev",
      color: "from-yellow-500 to-amber-500"
    },
    {
      icon: <FaPhone className="text-xl" />,
      title: "Téléphone",
      value: "+33 6 43 32 34 12",
      link: "tel:+33643323412",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: <FaMapMarkerAlt className="text-xl" />,
      title: "Localisation",
      value: "Bordeaux, France",
      link: "#",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <FaBriefcase className="text-xl" />,
      title: "LinkedIn",
      value: "Mon Profil LinkedIn",
      link: "https://www.linkedin.com/in/th%C3%A9o-morio-0901b1254/",
      color: "from-gray-600 to-gray-800"
    }
  ];

  const socialLinks = [
    { name: "GitHub", icon: <FaGithub className="text-xl" />, url: "https://github.com/margoul1Malin", color: "hover:text-gray-400" },
    { name: "Instagram", icon: <FaInstagram className="text-xl" />, url: "https://www.instagram.com/oxelya.fr/", color: "hover:text-pink-400" },
    { name: "Twitter", icon: <FaTwitter className="text-xl" />, url: "https://x.com/PinokioS1ffredi", color: "hover:text-blue-300" },
  ];

  return (
    <section id="contact" className="py-20 relative">
      {/* Contenu statique pour les bots */}
      <div className="sr-only">
        <h2>Contact Margoul1 - Développeur Full Stack</h2>
        <p>Contactez-moi pour vos projets de développement web, applications React, Next.js, Node.js</p>
        
        <h3>Informations de contact :</h3>
        <ul>
          <li>Email : contact@margoul1.dev</li>
          <li>Téléphone : +33 6 43 32 34 12</li>
          <li>Localisation : Entre Bordeaux et Bassin d&apos;Arcachon, France</li>
          <li>Instagram : https://www.instagram.com/oxelya.fr/</li>
        </ul>
        
        <h3>Réseaux sociaux :</h3>
        <ul>
          <li>GitHub : https://github.com/margoul1Malin</li>
          <li>Instagram : https://www.instagram.com/oxelya.fr/</li>
          <li>Twitter : https://x.com/PinokioS1ffredi</li>
        </ul>
        
        <h3>Services proposés :</h3>
        <ul>
          <li>Développement d&apos;applications web React et Next.js</li>
          <li>Développement backend Node.js et Python</li>
          <li>Intégration d&apos;APIs et bases de données</li>
          <li>Optimisation SEO et performance</li>
          <li>Consulting technique et architecture</li>
        </ul>
        
        <p>Disponible pour de nouveaux projets - Temps de réponse moyen : 24h</p>
        <p>Zone d&apos;intervention : Bordeaux, Bassin d&apos;Arcachon, Nouvelle-Aquitaine</p>
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-in-up">
            <span className="text-gradient">Contactez</span>
            <span className="text-white"> Moi</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto animate-slide-in-up animation-delay-1000">
            Vous avez un projet en tête ? Discutons-en ! Je suis toujours ouvert à de nouvelles opportunités.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="glass rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Mes Coordonnées</h3>
              
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <Link
                    key={method.title}
                    href={method.link}
                    className="group flex items-center space-x-4 p-4 rounded-2xl hover:glass-strong transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center group-hover:animate-pulse`}>
                      {method.icon}
                    </div>
                    <div>
                      <div className="text-white font-medium">{method.title}</div>
                      <div className="text-white/70 text-sm group-hover:text-white transition-colors duration-300">
                        {method.value}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="glass rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Suivez-moi</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className={`w-12 h-12 glass rounded-xl flex items-center justify-center hover:glass-strong transition-all duration-300 hover:scale-110 ${social.color} animate-float`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Disponibilité */}
            <div className="glass rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Disponibilité</h3>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/80">Disponible pour de nouveaux projets</span>
              </div>
              <div className="mt-4 text-white/60 text-sm">
                Temps de réponse moyen : 24h
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="animate-slide-in-right">
            <div className="glass rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Envoyez-moi un message</h3>
              
              {/* Notification */}
              {notification && (
                <div className={`mb-6 p-4 rounded-xl flex items-center space-x-3 ${
                  notification.type === 'success' 
                    ? 'bg-green-500/20 border border-green-500/30' 
                    : 'bg-red-500/20 border border-red-500/30'
                }`}>
                  {notification.type === 'success' ? (
                    <FaCheckCircle className="text-green-400 text-xl" />
                  ) : (
                    <FaExclamationCircle className="text-red-400 text-xl" />
                  )}
                  <span className={`${
                    notification.type === 'success' ? 'text-green-300' : 'text-red-300'
                  }`}>
                    {notification.message}
                  </span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom */}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-500 transition-all duration-300"
                    placeholder="Votre nom"
                    required
                  />
                  {focusedField === 'name' && (
                    <div className="absolute inset-0 border-2 border-yellow-500/50 rounded-xl pointer-events-none animate-pulse"></div>
                  )}
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-500 transition-all duration-300"
                    placeholder="Votre email"
                    required
                  />
                  {focusedField === 'email' && (
                    <div className="absolute inset-0 border-2 border-yellow-500/50 rounded-xl pointer-events-none animate-pulse"></div>
                  )}
                </div>

                {/* Sujet */}
                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-500 transition-all duration-300"
                    placeholder="Sujet"
                    required
                  />
                  {focusedField === 'subject' && (
                    <div className="absolute inset-0 border-2 border-yellow-500/50 rounded-xl pointer-events-none animate-pulse"></div>
                  )}
                </div>

                {/* Message */}
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-500 transition-all duration-300 resize-none"
                    placeholder="Votre message"
                    required
                  />
                  {focusedField === 'message' && (
                    <div className="absolute inset-0 border-2 border-yellow-500/50 rounded-xl pointer-events-none animate-pulse"></div>
                  )}
                </div>

                {/* Bouton d'envoi */}
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 group py-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl text-black font-semibold hover:scale-105 transition-all duration-300 hover-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Envoi en cours...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center space-x-2 ">
                      <span>Envoyer le message</span>
                      <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 