async function listCategory(cat) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=${encodeURIComponent(cat)}&cmtype=file&cmlimit=30&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'VictorMobilityStudio/1.0' } });
  const data = await res.json();
  console.log(data.query.categorymembers);
}

listCategory('Category:Kia Carens (KY)');
