async function queryOpenverse(query) {
  try {
    const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}&page_size=10&license_type=commercial`;
    const res = await fetch(url, { headers: { 'User-Agent': 'VictorMobilityResearch/1.0' } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || []).map(r => ({
      title: r.title,
      url: r.url,
      thumbnail: r.thumbnail,
      width: r.width,
      height: r.height,
      source: 'openverse'
    }));
  } catch (e) {
    return [];
  }
}

async function queryWikimedia(term) {
  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(term)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|size`;
    const res = await fetch(url, { headers: { 'User-Agent': 'VictorMobilityBot/2.0' } });
    const data = await res.json();
    const pages = data.query?.pages || {};
    const list = [];
    for (const p of Object.values(pages)) {
      const info = p.imageinfo?.[0];
      if (info?.url && info.width >= 1600 && !p.title.endsWith('.pdf') && !p.title.endsWith('.tif') && !p.title.endsWith('.svg')) {
        list.push({ title: p.title, width: info.width, height: info.height, url: info.url, source: 'wikimedia' });
      }
    }
    return list;
  } catch (e) {
    return [];
  }
}

async function run() {
  const terms = [
    'luxury cars fleet',
    'VIP motorcade black cars',
    'diplomatic motorcade',
    'Mercedes fleet parked',
    'executive fleet sedans',
    'black sedans motorcade',
    'luxury sedan fleet'
  ];

  for (const t of terms) {
    console.log(`\n=== SEARCHING: "${t}" ===`);
    const wiki = await queryWikimedia(t);
    for (const w of wiki.slice(0, 4)) {
      console.log(`[WIKI] [${w.width}x${w.height}] ${w.title}\n       ${w.url}`);
    }
    const ov = await queryOpenverse(t);
    for (const o of ov.slice(0, 4)) {
      console.log(`[OPENVERSE] [${o.width}x${o.height}] ${o.title}\n            ${o.url}`);
    }
  }
}

run();
