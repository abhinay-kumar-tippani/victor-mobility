async function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=20&prop=imageinfo&iiprop=url|size|extmetadata`;
  const res = await fetch(url, { headers: { 'User-Agent': 'VictorFleetResearch/1.0' } });
  const data = await res.json();
  const pages = data.query?.pages || {};
  const list = [];
  for (const p of Object.values(pages)) {
    const info = p.imageinfo?.[0];
    if (info?.url && info.width >= 1920 && !p.title.endsWith('.pdf') && !p.title.endsWith('.tif') && !p.title.endsWith('.svg') && !p.title.endsWith('.djvu')) {
      const desc = (info.extmetadata?.ImageDescription?.value || '').replace(/<[^>]*>/g, '');
      list.push({ title: p.title, width: info.width, height: info.height, url: info.url, desc: desc.slice(0, 150) });
    }
  }
  return list;
}

async function run() {
  const queries = [
    'motorcade "black cars"',
    'motorcade "Mercedes"',
    '"official fleet" cars',
    '"official car" fleet',
    'G20 "motorcade"',
    '"presidential motorcade" cars',
    'VIP "convoy"',
    'lineup of "Mercedes"',
    'row of "Mercedes-Benz"',
    'fleet of "BMW"',
    'fleet of "Audi"',
    'fleet of "limousines"',
    '"black sedans" line'
  ];

  for (const q of queries) {
    const res = await searchCommons(q);
    console.log(`\n=== "${q}" (${res.length}) ===`);
    for (const r of res) {
      console.log(`- [${r.width}x${r.height}] ${r.title}`);
      console.log(`  ${r.url}`);
      if (r.desc) console.log(`  Desc: ${r.desc}`);
    }
  }
}

run();
