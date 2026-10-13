async function search(q) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=25&prop=imageinfo&iiprop=url|size|extmetadata`;
  const res = await fetch(url, { headers: { 'User-Agent': 'VictorMobilityResearch/3.0 (info@victormobility.com)' } });
  if (!res.ok) { console.log('HTTP', res.status); return []; }
  const data = await res.json();
  const pages = data.query?.pages || {};
  const list = [];
  for (const p of Object.values(pages)) {
    const info = p.imageinfo?.[0];
    if (info?.url && info.width >= 1920 && !p.title.endsWith('.pdf') && !p.title.endsWith('.tif') && !p.title.endsWith('.svg') && !p.title.endsWith('.djvu')) {
      const desc = (info.extmetadata?.ImageDescription?.value || '').replace(/<[^>]*>/g, '');
      list.push({ title: p.title, width: info.width, height: info.height, url: info.url, desc: desc.slice(0, 120) });
    }
  }
  return list;
}

async function run() {
  const queries = [
    'Mercedes-Benz motorcade',
    'Mercedes motorcade',
    'convoy Mercedes',
    'fleet Mercedes',
    'VIP motorcade',
    'presidential motorcade',
    'official motorcade',
    'convoy VIP'
  ];
  for (const q of queries) {
    const res = await search(q);
    console.log(`\n=== "${q}" (${res.length}) ===`);
    for (const r of res) {
      console.log(`- [${r.width}x${r.height}] ${r.title}`);
      console.log(`  ${r.url}`);
      if (r.desc) console.log(`  Desc: ${r.desc}`);
    }
    await new Promise(r => setTimeout(r, 1200));
  }
}

run();
