const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Accueil", href: "#home" },
    { name: "À propos", href: "#about" },
    { name: "Compétences", href: "#skills" },
    { name: "Projets", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  const socialLinks = [
    { name: "GitHub", icon: "🐙", url: "https://github.com/margoul1Malin" },
    { name: "LinkedIn", icon: "💼", url: "https://www.linkedin.com/in/th%C3%A9o-morio-0901b1254/" },
    { name: "Twitter", icon: "🐦", url: "https://x.com/PinokioS1ffredi" },
  ];

  return (
    <footer className="relative py-16 mt-20">
      {/* Ligne de séparation animée */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center animate-glow">
                <span className="text-black font-bold text-lg">D</span>
              </div>
              <span className="text-white font-bold text-xl">Margoul1</span>
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              Fou de l'informatique, ça pourrait vous servir.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center text-lg hover:glass-strong transition-all duration-300 hover:scale-110 animate-float"
                  style={{ animationDelay: `${index * 0.2}s` }}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations de contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-white/70">
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <span>jhonnysinner4@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📱</span>
                <span>+33 6 43 32 34 12</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🌍</span>
                <span>Bordeaux, France</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-white/60 text-sm">
              © {currentYear} Margoul1. Tous droits réservés.
            </div>

            {/* Statut */}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/60 text-sm">Disponible pour de nouveaux projets</span>
            </div>

            {/* Liens légaux */}
            <div className="flex space-x-4 text-sm">
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-300">
                Mentions légales
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-300">
                Politique de confidentialité
              </a>
            </div>
          </div>
        </div>

        {/* Message de remerciement */}
        <div className="text-center mt-8">
          <p className="text-white/50 text-sm">
            Merci de votre visite ! ✨
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 