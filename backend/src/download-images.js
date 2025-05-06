const https = require('https');
const fs = require('fs');
const path = require('path');

const images = {
  teams: {
    psg: 'https://clipart.info/images/ccovers/1518802542PSG-Png-Paris-Saint-Germain-Logo.png',
    realmadrid: 'https://logodetimes.com/times/real-madrid/logo-real-madrid-escudo-1024.png',
    mancity: 'https://pluspng.com/img-png/manchester-city-logo-png-file-manchester-city-fc-badge-svg-1024.png',
    bayern: 'https://th.bing.com/th/id/R.8466b4a5002017883c73914f6eb397b8?rik=SjqNXtDN1k19cA&pid=ImgRaw&r=0',
    inter: 'https://logodownload.org/wp-content/uploads/2017/02/inter-milan-logo.png',
    benfica: 'https://th.bing.com/th/id/R.3b5c4904aadc7d74f1731d1aaaf65ab3?rik=0nyulT08AZknSw&pid=ImgRaw&r=0',
    youngboys: 'https://th.bing.com/th/id/R.075e7de2913fca3e7552afb11340d9fa?rik=EQyLel3tTh0clg&pid=ImgRaw&r=0'
  },
  championships: {
    ligue1: 'https://vectorseek.com/wp-content/uploads/2024/04/LIGUE-1-New-Logo-Vector.png',
    laliga: 'https://1000logos.net/wp-content/uploads/2019/01/Spanish-La-Liga-Logo.png',
    premierleague: 'https://th.bing.com/th/id/OIP.xtzU85EYYQXBoaEAapzaUwHaJZ?rs=1&pid=ImgDetMain',
    bundesliga: 'https://logospng.org/download/bundesliga/logo-bundesliga-1536.png',
    seriea: 'https://www.liblogo.com/img-logo/se1113s89c-serie-a-logo-serie-a-2019-logo-vector-brand-logo-collection.png',
    ligaportugal: 'https://yallalive-english.com/wp-content/uploads/2024/01/Liga-Portugal-Table.png',
    superleague: 'https://vectorseek.com/wp-content/uploads/2023/11/Credit-Suisse-Super-League-Logo-Vector.svg-.png'
  },
  flags: {
    fr: 'https://flagcdn.com/w80/fr.png',
    es: 'https://flagcdn.com/w80/es.png',
    gb: 'https://flagcdn.com/w80/gb.png',
    de: 'https://flagcdn.com/w80/de.png',
    it: 'https://flagcdn.com/w80/it.png',
    pt: 'https://flagcdn.com/w80/pt.png',
    ch: 'https://flagcdn.com/w80/ch.png'
  }
};

// Chemin vers le dossier assets dans le frontend
const baseDir = path.join(__dirname, '../../../src/assets/images');

// Créer les dossiers s'ils n'existent pas
['teams', 'championships', 'flags'].forEach(dir => {
  const dirPath = path.join(baseDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Fonction pour télécharger une image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Télécharger toutes les images
async function downloadAllImages() {
  console.log('Starting download of all images...');
  console.log('Base directory:', baseDir);
  
  for (const [category, urls] of Object.entries(images)) {
    console.log(`\nDownloading ${category} images...`);
    for (const [name, url] of Object.entries(urls)) {
      const filepath = path.join(baseDir, category, `${name}.png`);
      try {
        await downloadImage(url, filepath);
      } catch (error) {
      }
    }
  }
}

downloadAllImages().catch(error => {
  console.error('Error in main process:', error);
}); 