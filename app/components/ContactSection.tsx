'use client';

import { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      value: "jhonnysinner4@gmail.com",
      link: "mailto:jhonnysinner4@gmail.com",
      color: "from-yellow-500 to-amber-500"
    },
    {
      icon: "📱",
      title: "Téléphone",
      value: "+33 6 43 32 34 12",
      link: "tel:+33643323412",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: "🌍",
      title: "Localisation",
      value: "Bordeaux, France",
      link: "#",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: "💼",
      title: "LinkedIn",
      value: "Mon Profil LinkedIn",
      link: "https://www.linkedin.com/in/th%C3%A9o-morio-0901b1254/",
      color: "from-gray-600 to-gray-800"
    }
  ];

  const socialLinks = [
    { name: "GitHub", icon: "🐙", url: "https://github.com/margoul1Malin", color: "hover:text-gray-400" },
    { name: "LinkedIn", icon: "💼", url: "https://www.linkedin.com/in/th%C3%A9o-morio-0901b1254/", color: "hover:text-blue-400" },
    { name: "Twitter", icon: "🐦", url: "https://x.com/PinokioS1ffredi", color: "hover:text-blue-300" },
  ];

  return (
    <section id="contact" className="py-20 relative">
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
                  <a
                    key={method.title}
                    href={method.link}
                    className="group flex items-center space-x-4 p-4 rounded-2xl hover:glass-strong transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center text-xl group-hover:animate-pulse`}>
                      {method.icon}
                    </div>
                    <div>
                      <div className="text-white font-medium">{method.title}</div>
                      <div className="text-white/70 text-sm group-hover:text-white transition-colors duration-300">
                        {method.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="glass rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Suivez-moi</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className={`w-12 h-12 glass rounded-xl flex items-center justify-center text-xl hover:glass-strong transition-all duration-300 hover:scale-110 ${social.color} animate-float`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {social.icon}
                  </a>
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
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Envoyez-moi un message</h3>
              
              {/* Nom */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/15 transition-all duration-300"
                  placeholder="Votre nom"
                  required
                />
                {focusedField === 'name' && (
                  <div className="absolute -top-2 left-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs px-2 py-1 rounded animate-slide-in-up">
                    Nom requis
                  </div>
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/15 transition-all duration-300"
                  placeholder="Votre email"
                  required
                />
                {focusedField === 'email' && (
                  <div className="absolute -top-2 left-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs px-2 py-1 rounded animate-slide-in-up">
                    Email valide requis
                  </div>
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/15 transition-all duration-300"
                  placeholder="Sujet de votre message"
                  required
                />
                {focusedField === 'subject' && (
                  <div className="absolute -top-2 left-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs px-2 py-1 rounded animate-slide-in-up">
                    Sujet requis
                  </div>
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
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/15 transition-all duration-300 resize-none"
                  placeholder="Votre message..."
                  required
                />
                {focusedField === 'message' && (
                  <div className="absolute -top-2 left-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs px-2 py-1 rounded animate-slide-in-up">
                    Message requis
                  </div>
                )}
              </div>

              {/* Bouton d'envoi */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl text-black font-semibold hover:scale-105 transition-all duration-300 hover-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Envoi en cours...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <span>Envoyer le message</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 