// Composant statique pour le contenu critique visible par les bots
// Ce composant ne contient pas de JavaScript côté client

export default function StaticContent() {
  return (
    <div className="sr-only">
      {/* Contenu textuel structuré pour les bots */}
      <h1>Margoul1 - Développeur Web Full Stack</h1>
      <p>
        Développeur web full stack passionné basé entre Bordeaux et le Bassin d&apos;Arcachon, 
        spécialisé en React, Next.js, Django, Node.js et SEO.
      </p>
      
      <section>
        <h2>Compétences Techniques</h2>
        <ul>
          <li>React - Développement d&apos;interfaces utilisateur modernes</li>
          <li>Next.js - Framework React pour applications web performantes</li>
          <li>Django - Framework Python pour le développement backend</li>
          <li>Node.js - Environnement JavaScript côté serveur</li>
          <li>TypeScript - JavaScript avec typage statique</li>
          <li>Python - Langage de programmation polyvalent</li>
          <li>SEO - Optimisation pour les moteurs de recherche</li>
          <li>Git - Gestion de versions</li>
          <li>Bash/Zsh - Scripts et automatisation</li>
        </ul>
      </section>
      
      <section>
        <h2>Services Proposés</h2>
        <ul>
          <li>Développement Frontend - Interfaces utilisateur React/Next.js</li>
          <li>Développement Backend - APIs et services Django/Node.js</li>
          <li>Développement Full Stack - Solutions complètes</li>
          <li>SEO - Optimisation pour moteurs de recherches</li>
          <li>Maintenance - Maintenance de sites web existants</li>
          <li>Formation - Formation en développement web</li>
        </ul>
      </section>
      
      <section>
        <h2>Zone d&apos;Intervention</h2>
        <p>Services disponibles dans les zones suivantes :</p>
        <ul>
          <li>Bordeaux et métropole bordelaise</li>
          <li>Bassin d&apos;Arcachon (Arcachon, La Teste-de-Buch, Gujan-Mestras)</li>
          <li>Marcheprime, Le Teich, Biganos</li>
          <li>Pessac, Mérignac, Bègles, Cestas</li>
          <li>Nouvelle-Aquitaine</li>
          <li>France entière</li>
          <li>Projets internationaux</li>
        </ul>
      </section>
      
      <section>
        <h2>À Propos</h2>
        <p>
          Passionné par le développement web depuis plusieurs années, 
          je me spécialise dans la création d&apos;applications web modernes et performantes. 
          Mon approche combine expertise technique et sens du design pour créer 
          des solutions web qui répondent aux besoins spécifiques de chaque client.
        </p>
        <p>
          Basé entre Bordeaux et le Bassin d&apos;Arcachon, j&apos;interviens sur toute la région 
          Nouvelle-Aquitaine et au-delà pour des projets de développement web, 
          d&apos;optimisation SEO et de formation.
        </p>
      </section>
      
      <section>
        <h2>Contact</h2>
        <p>
          Contactez-moi pour discuter de votre projet de développement web. 
          Devis gratuit et réponse rapide garantie.
        </p>
        <address>
          <p>Email: contact@margoul1.dev</p>
          <p>Téléphone: +33 6 43 32 34 12</p>
          <p>Localisation: Entre Bordeaux et Bassin d&apos;Arcachon, Nouvelle-Aquitaine</p>
        </address>
      </section>
    </div>
  );
} 