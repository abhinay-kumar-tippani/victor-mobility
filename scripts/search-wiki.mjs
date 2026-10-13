async function searchWiki(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|size`;
  const res = await fetch(url, { headers: { 'User-Agent': 'VictorMobilityBot/1.0 (contact@victormobility.com)' } });
  const data = await res.json();
  const pages = data.query?.pages || {};
  console.log(`=== Query: ${query} ===`);
  for (const p of Object.values(pages)) {
    const info = p.imageinfo?.[0];
    if (info?.url) {
      console.log(p.title, `${info.width}x${info.height}`, info.url);
    }
  }
}

async function main() {
  await searchWiki('G20 motorcade cars');
  await searchWiki('summit cars fleet');
  await searchWiki('Audi fleet Berlin');
  await searchWiki('BMW fleet');
  await searchWiki('Mercedes-Benz lineup row');
}

main().catch(console.error);
