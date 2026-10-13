async function search(q) {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=' + encodeURIComponent(q) + '&gsrnamespace=6&gsrlimit=20&prop=imageinfo&iiprop=url|size|extmetadata';
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
    'VIP fleet cars',
    'Presidential motorcade cars',
    'summit motorcade cars',
    'G20 motorcade',
    'limousines row',
    'sedans row fleet',
    'black cars lineup'
  ];
  for (const q of queries) {
    const items = await search(q);
    console.log(`\n=== "${q}" (${items.length}) ===`);
    for (const it of items) {
      console.log(`- [${it.width}x${it.height}] ${it.title}`);
      console.log(`  ${it.url}`);
      if (it.desc) console.log(`  Desc: ${it.desc}`);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
}
run();
