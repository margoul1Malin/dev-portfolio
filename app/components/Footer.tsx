import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

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
    { name: "GitHub", icon: <FaGithub className="text-lg" />, url: "https://github.com/margoul1Malin" },
    { name: "LinkedIn", icon: <FaLinkedin className="text-lg" />, url: "https://www.linkedin.com/in/th%C3%A9o-morio-0901b1254/" },
    { name: "Twitter", icon: <FaTwitter className="text-lg" />, url: "https://x.com/PinokioS1ffredi" },
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
              <span className="text-black font-bold text-lg">M</span>              </div>
              <span className="text-white font-bold text-xl">Margoul1</span>
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              Fou de l&apos;informatique, ça pourrait vous servir.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:glass-strong transition-all duration-300 hover:scale-110 animate-float"
                  style={{ animationDelay: `${index * 0.2}s` }}
                  title={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations de contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-white/70">
              <p>Bordeaux - Arcachon</p>
              <p>contact@margoul1.dev</p>
              <p>+33 6 43 32 34 12</p>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/60 text-sm mb-4 md:mb-0">
              © {currentYear} Margoul1. Tous droits réservés.
            </div>
            <div className="flex items-center space-x-4 text-white/60 text-sm">
              <span>Disons, merci aux insomnies et à la caféine.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 