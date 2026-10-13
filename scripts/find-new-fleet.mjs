async function search(term) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(term)}&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url|size`;
  const res = await fetch(url, { headers: { 'User-Agent': 'VictorMobilityBot/2.0 (contact@victormobility.com)' } });
  const data = await res.json();
  const pages = data.query?.pages || {};
  const list = [];
  for (const p of Object.values(pages)) {
    const info = p.imageinfo?.[0];
    if (info?.url && info.width >= 1920 && !p.title.endsWith('.pdf') && !p.title.endsWith('.tif')) {
      list.push({ title: p.title, width: info.width, height: info.height, url: info.url });
    }
  }
  return list;
}

async function main() {
  const terms = [
    'Mercedes-Benz motorcade',
    'VIP fleet cars',
    'G20 fleet Mercedes',
    'black sedans lineup',
    'fleet of Mercedes-Benz',
    'limousine motorcade',
    'luxury cars parked row'
  ];

  const results = {};
  for (const t of terms) {
    results[t] = await search(t);
    console.log(`Term: "${t}" -> found ${results[t].length}`);
    for (const r of results[t]) {
      console.log(`  - [${r.width}x${r.height}] ${r.title}: ${r.url}`);
    }
  }
}

main().catch(console.error);
