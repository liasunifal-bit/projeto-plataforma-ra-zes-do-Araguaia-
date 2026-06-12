const fs = require('fs');
const https = require('https');
const path = require('path');

// Área de cobertura de Brejo Grande do Araguaia - PA
const ZOOM_MIN = 13;
const ZOOM_MAX = 20; // Limitado ao nível 17 para agilizar a criação do protótipo
const LAT_MIN = -5.77, LAT_MAX = -5.62;
const LON_MIN = -48.48, LON_MAX = -48.32;
const OUTPUT_DIR = path.join(__dirname, 'frontend', 'public', 'tiles');

// Função matemática para converter Coordenadas reais em quadrantes (X/Y) do Leaflet
function calcTile(lat_deg, lon_deg, zoom) {
  const lat_rad = (lat_deg * Math.PI) / 180;
  const n = Math.pow(2, zoom);
  const x = Math.floor(((lon_deg + 180) / 360) * n);
  const y = Math.floor(
    ((1.0 - Math.asinh(Math.tan(lat_rad)) / Math.PI) / 2.0) * n
  );
  return { x, y };
}

async function baixarTile(z, x, y) {
  const dir = path.join(OUTPUT_DIR, z.toString(), x.toString());
  const filepath = path.join(dir, `${y}.png`);
  
  if (fs.existsSync(filepath)) return; // Pula a imagem se já foi baixada
  fs.mkdirSync(dir, { recursive: true });

  const url = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;

  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'MarketplaceAraguaia' } }, (res) => {
      if (res.statusCode !== 200) return resolve();
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', () => resolve());
  });
}

async function iniciar() {
  console.log('Iniciando extração automatizada do mapa...');
  for (let z = ZOOM_MIN; z <= ZOOM_MAX; z++) {
    const t1 = calcTile(LAT_MIN, LON_MIN, z);
    const t2 = calcTile(LAT_MAX, LON_MAX, z);
    
    const startX = Math.min(t1.x, t2.x);
    const endX = Math.max(t1.x, t2.x);
    const startY = Math.min(t1.y, t2.y);
    const endY = Math.max(t1.y, t2.y);
    
    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        await baixarTile(z, x, y);
        // Pequena pausa (150ms) para não sobrecarregar e ser bloqueado pelo servidor público
        await new Promise(r => setTimeout(r, 150)); 
      }
    }
  }
  console.log('Download concluído! Atualize seu navegador e o fundo cinza desaparecerá.');
}

iniciar();