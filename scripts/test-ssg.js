#!/usr/bin/env node

/**
 * Script pour tester le rendu côté serveur (SSG/ISR)
 * Simule un bot GoogleBot pour vérifier le contenu rendu
 */

const https = require('https');
const http = require('http');

const testUrls = [
  'http://localhost:3000',
  'http://localhost:3000/contact',
  'http://localhost:3000/seo-test'
];

const userAgent = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

function testUrl(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const options = {
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Cache-Control': 'no-cache'
      }
    };

    protocol.get(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          headers: res.headers,
          content: data,
          contentLength: data.length
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function runTests() {
  console.log('🔍 Test du rendu côté serveur (SSG/ISR)');
  console.log('User-Agent:', userAgent);
  console.log('=====================================\n');

  for (const url of testUrls) {
    try {
      console.log(`🧪 Test de: ${url}`);
      const result = await testUrl(url);
      
      console.log(`✅ Status: ${result.status}`);
      console.log(`📄 Taille du contenu: ${result.contentLength} caractères`);
      
      // Vérifier le contenu critique
      const criticalContent = [
        'Margoul1',
        'Développeur Web Full Stack',
        'React',
        'Next.js',
        'Django',
        'Node.js',
        'Bordeaux',
        'Bassin d\'Arcachon'
      ];
      
      const foundContent = criticalContent.filter(content => 
        result.content.includes(content)
      );
      
      console.log(`🎯 Contenu critique trouvé: ${foundContent.length}/${criticalContent.length}`);
      console.log(`   - ${foundContent.join(', ')}`);
      
      // Vérifier les métadonnées
      const hasTitle = result.content.includes('<title>');
      const hasDescription = result.content.includes('meta name="description"');
      const hasOG = result.content.includes('property="og:');
      const hasJsonLd = result.content.includes('application/ld+json');
      
      console.log(`📊 Métadonnées SEO:`);
      console.log(`   - Title: ${hasTitle ? '✅' : '❌'}`);
      console.log(`   - Description: ${hasDescription ? '✅' : '❌'}`);
      console.log(`   - Open Graph: ${hasOG ? '✅' : '❌'}`);
      console.log(`   - JSON-LD: ${hasJsonLd ? '✅' : '❌'}`);
      
      console.log('---\n');
      
    } catch (error) {
      console.error(`❌ Erreur pour ${url}:`, error.message);
      console.log('---\n');
    }
  }
  
  console.log('🎉 Tests terminés!');
  console.log('\n💡 Pour tester avec un vrai bot:');
  console.log('   - Utilisez Google Search Console');
  console.log('   - Testez avec l\'outil "Inspection d\'URL"');
  console.log('   - Vérifiez le rendu dans "Tester l\'URL en direct"');
}

runTests().catch(console.error); 