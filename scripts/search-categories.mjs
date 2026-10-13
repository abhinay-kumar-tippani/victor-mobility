async function getCategoryImages(category) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=categorymembers&gcmtitle=Category:${encodeURIComponent(category)}&gcmnamespace=6&gcmlimit=25&prop=imageinfo&iiprop=url|size|extmetadata`;
  const res = await fetch(url, { headers: { 'User-Agent': 'VictorMobilityBot/2.0 (contact@victormobility.com)' } });
  const data = await res.json();
  const pages = data.query?.pages || {};
  const list = [];
  for (const p of Object.values(pages)) {
    const info = p.imageinfo?.[0];
    if (info?.url && info.width >= 1600 && !p.title.endsWith('.pdf') && !p.title.endsWith('.tif') && !p.title.endsWith('.svg')) {
      const desc = info.extmetadata?.ImageDescription?.value || '';
      list.push({ title: p.title, width: info.width, height: info.height, url: info.url, desc: desc.slice(0, 100) });
    }
  }
  return list;
}

async function run() {
  const categories = [
    'Motorcades',
    'Presidential motorcades',
    'Motorcades in the United States',
    '2018 G20 Buenos Aires summit motorcades',
    '2017 G20 Hamburg summit motorcades',
    'G20 summits',
    'World Economic Forum in Davos',
    'Mercedes-Benz limousines',
    'Mercedes-Benz W222',
    'Mercedes-Benz W221',
    'Lines of cars',
    'Rows of cars'
  ];

  for (const cat of categories) {
    try {
      const imgs = await getCategoryImages(cat);
      console.log(`\n=== Category: ${cat} (${imgs.length} high-res images) ===`);
      for (const img of imgs) {
        console.log(`- [${img.width}x${img.height}] ${img.title}`);
        console.log(`  URL: ${img.url}`);
        if (img.desc) console.log(`  Desc: ${img.desc}`);
      }
    } catch (e) {
      console.error(`Error on ${cat}:`, e.message);
    }
  }
}

run();
