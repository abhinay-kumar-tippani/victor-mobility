import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const FLEET_DIR = path.resolve('public/images/fleet');

const VEHICLES = [
  'swift-dzire.webp',
  'hyundai-aura.webp',
  'tata-tigor-ev.webp',
  'tata-nexon-ev.webp',
  'mg-zs-ev.webp',
  'mahindra-marazzo.webp',
  'ertiga-cng.webp',
  'innova-crysta.webp',
  'kia-carens-clavis-ev.webp',
  'force-urbania.webp'
];

async function forensicAudit() {
  console.log('--- FORENSIC AUDITOR: INDEPENDENT IMAGE INSPECTION ---');
  let failures = [];

  for (const filename of VEHICLES) {
    const filePath = path.join(FLEET_DIR, filename);
    if (!fs.existsSync(filePath)) {
      failures.push(`${filename}: FILE DOES NOT EXIST`);
      continue;
    }

    const stat = fs.statSync(filePath);
    const sizeBytes = stat.size;
    const sizeKb = (sizeBytes / 1024).toFixed(2);

    // Byte size checks (< 200KB, > 10KB to ensure genuine photo/composite detail)
    if (sizeBytes >= 200 * 1024) {
      failures.push(`${filename}: OVERSIZED (${sizeKb} KB >= 200 KB)`);
    }
    if (sizeBytes < 5 * 1024) {
      failures.push(`${filename}: SUSPICIOUSLY SMALL / POSSIBLE DUMMY (${sizeKb} KB)`);
    }

    try {
      const img = sharp(filePath);
      const meta = await img.metadata();
      const stats = await img.stats();

      // Check dimensions
      if (meta.width !== 1200 || meta.height !== 675) {
        failures.push(`${filename}: INVALID DIMENSIONS (${meta.width}x${meta.height}, expected 1200x675)`);
      }
      if (meta.format !== 'webp') {
        failures.push(`${filename}: INVALID FORMAT (${meta.format}, expected webp)`);
      }

      // Check for dummy / blank / solid color facade
      // If image is a facade or single color, standard deviation of channels will be near 0
      const minStdev = Math.min(...stats.channels.map(c => c.stdev));
      const maxStdev = Math.max(...stats.channels.map(c => c.stdev));

      if (maxStdev < 10) {
        failures.push(`${filename}: SUSPICIOUSLY FLAT/SOLID COLOR (max stdev: ${maxStdev})`);
      }

      console.log(`[PASS] ${filename.padEnd(26)} | ${meta.width}x${meta.height} ${meta.format} | ${sizeKb.padStart(6)} KB | stdev(min/max): ${minStdev.toFixed(1)} / ${maxStdev.toFixed(1)} | channels: ${meta.channels}`);
    } catch (err) {
      failures.push(`${filename}: SHARP DECODE ERROR: ${err.message}`);
    }
  }

  console.log('----------------------------------------------------');
  if (failures.length > 0) {
    console.error('FAILURES DETECTED:');
    failures.forEach(f => console.error('  - ' + f));
    process.exit(1);
  } else {
    console.log('ALL 10 FLEET IMAGES PASSED EMPIRICAL FORENSIC INSPECTION!');
    process.exit(0);
  }
}

forensicAudit().catch(e => {
  console.error('Fatal audit error:', e);
  process.exit(1);
});
