import fs from 'node:fs';

async function download(url, filename) {
  const res = await fetch(url, { headers: { 'User-Agent': 'VictorMobilityResearch/8.0' } });
  if (res.ok) {
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync('docs/inspection/' + filename, buf);
    console.log('Saved', filename, buf.length);
  }
}

async function run() {
  await download('https://upload.wikimedia.org/wikipedia/commons/8/84/Ukraine_Air_Enterprise_Il-62.JPG', 'ukraine-il62.jpg');
  await download('https://upload.wikimedia.org/wikipedia/commons/a/a8/100411-F-6188A-170_%284517451303%29.jpg', 'ukraine-motorcade.jpg');
  await download('https://upload.wikimedia.org/wikipedia/commons/8/8a/Nuclear_Security_Summit_DVIDS268165.jpg', 'nss-motorcade.jpg');
}

run();
