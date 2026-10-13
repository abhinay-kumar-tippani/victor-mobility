async function search(q) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|size|extmetadata`;
  const res = await fetch(url, { headers: { 'User-Agent': 'VictorFleetBot/2.0' } });
  const data = await res.json();
  const pages = data.query?.pages || {};
  const list = [];
  for (const p of Object.values(pages)) {
    const info = p.imageinfo?.[0];
    if (info?.url && info.width >= 1920 && !p.title.endsWith('.pdf') && !p.title.endsWith('.tif') && !p.title.endsWith('.svg') && !p.title.endsWith('.djvu')) {
      const desc = info.extmetadata?.ImageDescription?.value || '';
      list.push({ title: p.title, width: info.width, height: info.height, url: info.url, desc: desc.slice(0, 100) });
    }
  }
  return list;
}

async function run() {
  const queries = [
    'luxury cars lineup',
    'luxury cars row',
    'Mercedes lineup',
    'Mercedes row',
    'BMW lineup',
    'Rolls-Royce lineup',
    'limousines row',
    'VIP fleet',
    'convoy luxury cars',
    'executive car fleet'
  ];

  for (const q of queries) {
    const res = await search(q);
    console.log(`\n=== "${q}" (${res.length}) ===`);
    for (const r of res) {
      console.log(`- [${r.width}x${r.height}] ${r.title}`);
      console.log(`  ${r.url}`);
    }
  }
}

run();
