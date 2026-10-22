// Source and licence: docs/uae-map-attribution.md. Produces an offline SVG-path database.
import fs from 'node:fs';
import crypto from 'node:crypto';

const source = fs.readFileSync(process.argv[2] || 'references/maps/uae-emirates-source.geojson');
const features = JSON.parse(source).features;
if (features.length !== 7) throw new Error('Expected seven emirates');
const ringsOf = geometry => geometry.type === 'MultiPolygon' ? geometry.coordinates.flat() : geometry.coordinates;
const rawProject = ([lon, lat]) => [lon * Math.cos(24 * Math.PI / 180), -lat];
const points = features.flatMap(f => ringsOf(f.geometry).flat().map(rawProject));
const minX = Math.min(...points.map(p => p[0])), maxX = Math.max(...points.map(p => p[0]));
const minY = Math.min(...points.map(p => p[1])), maxY = Math.max(...points.map(p => p[1]));
const scale = Math.min(580 / (maxX - minX), 380 / (maxY - minY));
const project = point => {
  const [x, y] = rawProject(point);
  return [+(320 + (x - (minX + maxX) / 2) * scale).toFixed(2), +(220 + (y - (minY + maxY) / 2) * scale).toFixed(2)];
};
const emirates = features.map(f => ({
  id: f.properties.shapeISO,
  name: f.properties.shapeName,
  path: ringsOf(f.geometry).map(ring => 'M' + ring.map(project).map(p => p.join(',')).join('L') + 'Z').join(''),
}));
const output = {
  viewBox: '0 0 640 440',
  source: 'https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/ARE/ADM1/geoBoundaries-ARE-ADM1_simplified.geojson',
  attribution: '© OpenStreetMap contributors; Wambacher; geoBoundaries',
  license: 'ODbL 1.0',
  sourceSha256: crypto.createHash('sha256').update(source).digest('hex'),
  emirates,
};
fs.mkdirSync('public/maps', { recursive: true });
fs.writeFileSync('public/maps/uae-emirates.json', JSON.stringify(output) + '\n');
console.log(`Generated ${emirates.length} emirates, ${fs.statSync('public/maps/uae-emirates.json').size} bytes`);
