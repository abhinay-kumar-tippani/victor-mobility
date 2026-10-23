async function getWikimediaUrl(title) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|size|mime&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'VictorMobilityStudio/1.0' } });
  const data = await res.json();
  const pages = data.query.pages;
  for (const k in pages) {
    if (pages[k].imageinfo && pages[k].imageinfo[0]) {
      console.log(title, '->', pages[k].imageinfo[0].url);
      return pages[k].imageinfo[0].url;
    }
  }
}

async function listCategory(cat) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=${encodeURIComponent(cat)}&cmtype=file&cmlimit=20&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'VictorMobilityStudio/1.0' } });
  const data = await res.json();
  console.log(data.query.categorymembers);
}

async function run() {
  await getWikimediaUrl('File:Toyota Innova Crysta 2.4 Z front right.jpg');
  await getWikimediaUrl('File:Toyota Innova Crysta.jpg');
  await listCategory('Category:Toyota Innova (AN140)');
}

run();
