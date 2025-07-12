#!/usr/bin/env node

/**
 * Script pour tester le contenu visible par les bots (GoogleBot, BingBot)
 * Simule un bot et vérifie le contenu rendu côté serveur
 */

const https = require('https');
const http = require('http');
const { JSDOM } = require('jsdom');

// User-Agents des principaux bots
const botUserAgents = {
  googlebot: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  bingbot: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  facebookbot: 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
  twitterbot: 'Twitterbot/1.0'
};

const testUrl = 'http://localhost:3000';

async function testBotContent(userAgent, botName) {
  return new Promise((resolve, reject) => {
    const protocol = testUrl.startsWith('https') ? https : http;
    
    const options = {
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
        'Cache-Control': 'no-cache'
      }
    };

    protocol.get(testUrl, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const dom = new JSDOM(data);
          const document = dom.window.document;
          
          // Extraire le contenu visible
          const visibleContent = extractVisibleContent(document);
          
          resolve({
            botName,
            userAgent,
            status: res.status,
            contentLength: data.length,
            visibleContent,
            rawHtml: data
          });
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function extractVisibleContent(document) {
  const content = {
    title: document.querySelector('title')?.textContent || '',
    headings: [],
    paragraphs: [],
    lists: [],
    links: [],
    images: [],
    staticContent: []
  };

  // Extraire les titres
  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
    const elements = document.querySelectorAll(tag);
    elements.forEach(el => {
      if (el.textContent.trim()) {
        content.headings.push({
          level: tag,
          text: el.textContent.trim()
        });
      }
    });
  });

  // Extraire les paragraphes
  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach(p => {
    if (p.textContent.trim()) {
      content.paragraphs.push(p.textContent.trim());
    }
  });

  // Extraire les listes
  const lists = document.querySelectorAll('ul, ol');
  lists.forEach(list => {
    const items = Array.from(list.querySelectorAll('li')).map(li => li.textContent.trim());
    if (items.length > 0) {
      content.lists.push(items);
    }
  });

  // Extraire les liens
  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    if (link.textContent.trim()) {
      content.links.push({
        text: link.textContent.trim(),
        href: link.getAttribute('href')
      });
    }
  });

  // Extraire les images
  const images = document.querySelectorAll('img[src]');
  images.forEach(img => {
    content.images.push({
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt') || ''
    });
  });

  // Extraire le contenu des classes sr-only (contenu pour les bots)
  const srOnlyElements = document.querySelectorAll('.sr-only');
  srOnlyElements.forEach(el => {
    if (el.textContent.trim()) {
      content.staticContent.push(el.textContent.trim());
    }
  });

  return content;
}

function analyzeContent(content) {
  const analysis = {
    score: 0,
    issues: [],
    strengths: []
  };

  // Vérifier le titre
  if (content.title) {
    analysis.score += 10;
    analysis.strengths.push(`Titre présent: "${content.title}"`);
  } else {
    analysis.issues.push('Titre manquant');
  }

  // Vérifier les titres H1
  const h1s = content.headings.filter(h => h.level === 'h1');
  if (h1s.length > 0) {
    analysis.score += 15;
    analysis.strengths.push(`${h1s.length} titre(s) H1 trouvé(s)`);
  } else {
    analysis.issues.push('Aucun titre H1 trouvé');
  }

  // Vérifier la structure des titres
  if (content.headings.length > 0) {
    analysis.score += 10;
    analysis.strengths.push(`${content.headings.length} titres structurés`);
  }

  // Vérifier le contenu textuel
  if (content.paragraphs.length > 0) {
    analysis.score += 15;
    analysis.strengths.push(`${content.paragraphs.length} paragraphes de contenu`);
  } else {
    analysis.issues.push('Aucun contenu textuel trouvé');
  }

  // Vérifier le contenu statique pour les bots
  if (content.staticContent.length > 0) {
    analysis.score += 20;
    analysis.strengths.push(`Contenu statique pour les bots présent`);
  } else {
    analysis.issues.push('Pas de contenu statique pour les bots');
  }

  // Vérifier les mots-clés importants
  const importantKeywords = ['Margoul1', 'Développeur', 'React', 'Next.js', 'Django', 'Node.js', 'Bordeaux'];
  const allText = [
    content.title,
    ...content.headings.map(h => h.text),
    ...content.paragraphs,
    ...content.staticContent
  ].join(' ').toLowerCase();

  const foundKeywords = importantKeywords.filter(keyword => 
    allText.includes(keyword.toLowerCase())
  );

  if (foundKeywords.length > 0) {
    analysis.score += foundKeywords.length * 5;
    analysis.strengths.push(`Mots-clés trouvés: ${foundKeywords.join(', ')}`);
  }

  return analysis;
}

async function runTests() {
  console.log('🤖 Test du contenu visible par les bots');
  console.log('=====================================\n');

  for (const [botName, userAgent] of Object.entries(botUserAgents)) {
    try {
      console.log(`🔍 Test avec ${botName.toUpperCase()}`);
      console.log(`User-Agent: ${userAgent}`);
      
      const result = await testBotContent(userAgent, botName);
      const analysis = analyzeContent(result.visibleContent);
      
      console.log(`📊 Score SEO: ${analysis.score}/100`);
      console.log(`📄 Taille du contenu: ${result.contentLength} caractères`);
      console.log(`📝 Titre: "${result.visibleContent.title}"`);
      console.log(`🏷️  Titres trouvés: ${result.visibleContent.headings.length}`);
      console.log(`📄 Paragraphes: ${result.visibleContent.paragraphs.length}`);
      console.log(`🔗 Liens: ${result.visibleContent.links.length}`);
      console.log(`🖼️  Images: ${result.visibleContent.images.length}`);
      console.log(`🤖 Contenu statique: ${result.visibleContent.staticContent.length} blocs`);
      
      if (analysis.strengths.length > 0) {
        console.log(`✅ Points forts:`);
        analysis.strengths.forEach(strength => console.log(`   - ${strength}`));
      }
      
      if (analysis.issues.length > 0) {
        console.log(`❌ Problèmes:`);
        analysis.issues.forEach(issue => console.log(`   - ${issue}`));
      }
      
      // Afficher un échantillon du contenu statique
      if (result.visibleContent.staticContent.length > 0) {
        console.log(`📖 Échantillon du contenu statique:`);
        result.visibleContent.staticContent.slice(0, 2).forEach((content, index) => {
          const preview = content.substring(0, 100) + (content.length > 100 ? '...' : '');
          console.log(`   ${index + 1}. ${preview}`);
        });
      }
      
      console.log('---\n');
      
    } catch (error) {
      console.error(`❌ Erreur pour ${botName}:`, error.message);
      console.log('---\n');
    }
  }
  
  console.log('🎉 Tests terminés!');
  console.log('\n💡 Recommandations:');
  console.log('   - Score > 70: Excellent pour les bots');
  console.log('   - Score 50-70: Bon mais peut être amélioré');
  console.log('   - Score < 50: Nécessite des améliorations');
}

// Vérifier si jsdom est installé
try {
  require('jsdom');
} catch (error) {
  console.error('❌ jsdom n\'est pas installé. Installez-le avec:');
  console.error('npm install --save-dev jsdom');
  process.exit(1);
}

runTests().catch(console.error); 