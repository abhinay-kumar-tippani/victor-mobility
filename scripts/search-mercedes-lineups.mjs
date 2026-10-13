async function search(q) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=20&prop=imageinfo&iiprop=url|size|extmetadata`;
  const res = await fetch(url, { headers: { 'User-Agent': 'VictorMobilityResearch/9.0 (info@victormobility.com)' } });
  if (!res.ok) return [];
  const data = await res.json();
  const pages = data.query?.pages || {};
  const list = [];
  for (const p of Object.values(pages)) {
    const info = p.imageinfo?.[0];
    if (info && info.width >= 1920 && !p.title.endsWith('.pdf') && !p.title.endsWith('.tif') && !p.title.endsWith('.svg')) {
      const desc = (info.extmetadata?.ImageDescription?.value || '').replace(/<[^>]*>/g, '').slice(0, 100);
      list.push({ title: p.title, width: info.width, height: info.height, url: info.url, desc });
    }
  }
  return list;
}

async function run() {
  const queries = [
    'Mercedes lineup parked',
    'Mercedes fleet parked',
    'Mercedes-Benz row parked',
    'Mercedes-Benz fleet row',
    'BMW fleet parked',
    'Audi fleet parked',
    'luxury cars lineup parked',
    'luxury sedans lineup'
  ];

  for (const q of queries) {
    const items = await search(q);
    console.log(`\n=== "${q}" (${items.length}) ===`);
    for (const it of items) {
      console.log(`- [${it.width}x${it.height}] ${it.title}`);
      console.log(`  ${it.url}`);
      if (it.desc) console.log(`  ${it.desc}`);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
}

run();
