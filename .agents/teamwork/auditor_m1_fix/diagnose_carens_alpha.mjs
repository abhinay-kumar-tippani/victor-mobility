import fs from 'fs';
import sharp from 'sharp';

async function diagnose() {
  const buf = fs.readFileSync('temp_carens_isnet.png');
  const img = sharp(buf);
  const meta = await img.metadata();
  console.log('Metadata:', meta);
  
  const raw = await img.raw().toBuffer({ resolveWithObject: true });
  console.log('Raw info:', raw.info);
  const data = raw.data;
  
  const histogram = {};
  for (let i = 3; i < data.length; i += 4) {
    const a = data[i];
    histogram[a] = (histogram[a] || 0) + 1;
  }
  
  const sorted = Object.entries(histogram).sort((a, b) => b[1] - a[1]);
  console.log('Top 15 alpha values by frequency:');
  for (let i = 0; i < Math.min(15, sorted.length); i++) {
    console.log(`  alpha=${sorted[i][0]}: ${sorted[i][1]} pixels (${(sorted[i][1] / (meta.width * meta.height) * 100).toFixed(2)}%)`);
  }
}

diagnose();
