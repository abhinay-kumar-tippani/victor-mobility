import fs from 'fs';

async function main() {
  const res = await fetch('https://www.cardekho.com/kia/carens-clavis-ev/pictures', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const html = await res.text();
  const re = /https:\/\/[^"'<>\s]+\.(?:jpg|png|webp)/gi;
  const matches = [...new Set(html.match(re) || [])];
  console.log('Total images found on CarDekho:', matches.length);
  matches.filter(m => m.includes('stimg') || m.includes('cardekho') || m.includes('upload')).slice(0, 20).forEach(m => console.log('  -', m));
}

main();
