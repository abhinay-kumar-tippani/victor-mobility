/**
 * scripts/build-fleet-studio-images.mjs
 * 
 * Victor Mobility Milestone 1: Studio Imagery Asset Generation & Pipeline
 * 
 * Generates and optimizes luxury automotive studio reference images for Victor Mobility's
 * authoritative India fleet in public/images/fleet/:
 * 
 * 1. Direct High-Resolution AI Studio Assets (Obsidian floor #070A12, Indigo cyclorama #15162F -> #31326F):
 *    - Hyundai Aura (Sedan, Petrol & CNG)
 *    - Tata Tigor EV (Sedan, Electric Vehicle - closed aero grille, teal humanity line, EV badge)
 *    - Mahindra Marazzo (SUV, Diesel - shark-tooth chrome grille, executive cabin)
 * 
 * 2. Precision Calibrated Studio Composites (SVG cyclorama + dual Gaussian ground shadows + ground baseline y ≈ 565px):
 *    - Force Urbania 12-seater (authentic modern European monocoque luxury passenger van)
 *    - Toyota Innova Crysta (executive SUV/MPV)
 *    - Kia Carens Clavis EV (SUV, Long Range Electric Vehicle)
 * 
 * 3. Validation:
 *    - Verifies all 10 fleet assets exist in public/images/fleet/
 *    - Format: WebP 1200 × 675 (16:9 widescreen)
 *    - Size: Strictly < 200 KB (and > 1 KB)
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const FLEET_DIR = path.join(ROOT_DIR, 'public', 'images', 'fleet');

if (!fs.existsSync(FLEET_DIR)) {
  fs.mkdirSync(FLEET_DIR, { recursive: true });
}

// -----------------------------------------------------------------------------
// Studio Cyclorama SVG Generator (Harmonized with Victor brand palette)
// -----------------------------------------------------------------------------
function createStudioCycloramaSvg(width = 1200, height = 675, shadowCx = 600, shadowCy = 565, shadowRx = 450, shadowRy = 35, multiTire = false) {
  const softBlurStd = multiTire ? 22 : 24;
  const crispBlurStd = multiTire ? 6 : 8;

  const shadowElements = multiTire
    ? `
  <!-- Broad ambient body occlusion shadow -->
  <ellipse cx="610" cy="535" rx="380" ry="38" fill="#000000" opacity="0.82" filter="url(#softBlur)" />

  <!-- Near front tire contact shadow -->
  <ellipse cx="635" cy="558" rx="85" ry="16" fill="#000000" opacity="0.95" filter="url(#crispBlur)" />
  <ellipse cx="635" cy="556" rx="110" ry="22" fill="#000000" opacity="0.85" filter="url(#medBlur)" />

  <!-- Near rear tire contact shadow -->
  <ellipse cx="930" cy="497" rx="70" ry="14" fill="#000000" opacity="0.92" filter="url(#crispBlur)" />
  <ellipse cx="930" cy="495" rx="90" ry="18" fill="#000000" opacity="0.80" filter="url(#medBlur)" />

  <!-- Far front tire contact shadow -->
  <ellipse cx="280" cy="536" rx="60" ry="12" fill="#000000" opacity="0.90" filter="url(#crispBlur)" />
`
    : `
  <!-- Dual Ground Contact Shadows: Soft ambient footprint + crisp tire contact ellipse -->
  <ellipse cx="${shadowCx}" cy="${shadowCy}" rx="${shadowRx}" ry="${shadowRy}" fill="#000000" opacity="0.88" filter="url(#softBlur)" />
  <ellipse cx="${shadowCx}" cy="${shadowCy + 5}" rx="${shadowRx * 0.8}" ry="${shadowRy * 0.5}" fill="#000000" opacity="0.96" filter="url(#crispBlur)" />
`;

  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Upper Cyclorama Gradient: Dark Ink #1E2048 to Indigo #181938 to Horizon #0E0F22 -->
    <linearGradient id="cycloramaGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1E2048" />
      <stop offset="35%" stop-color="#282B5C" />
      <stop offset="70%" stop-color="#181938" />
      <stop offset="100%" stop-color="#0E0F22" />
    </linearGradient>

    <!-- Overhead Softbox Spot: Victor Indigo #31326F and Blue #2D5090 -->
    <radialGradient id="softboxAura" cx="50%" cy="20%" r="55%">
      <stop offset="0%" stop-color="#31326F" stop-opacity="0.85" />
      <stop offset="40%" stop-color="#2D5090" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#15162F" stop-opacity="0" />
    </radialGradient>

    <!-- Obsidian Floor Gradient: Horizon #0E0F22 to Victor Obsidian #070A12 to Deep #04050A -->
    <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0E0F22" />
      <stop offset="10%" stop-color="#0A0C18" />
      <stop offset="45%" stop-color="#070A12" />
      <stop offset="100%" stop-color="#04050A" />
    </linearGradient>

    <!-- Floor Specular Sheen: Subtle directional reflective lighting across the ground plane -->
    <linearGradient id="floorSheen" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#070A12" />
      <stop offset="25%" stop-color="#15162F" stop-opacity="0.3" />
      <stop offset="50%" stop-color="#2D5090" stop-opacity="0.2" />
      <stop offset="75%" stop-color="#15162F" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#070A12" />
    </linearGradient>

    <!-- Dual / Multi Gaussian Shadow Filters for realistic automotive contact occlusion -->
    <filter id="softBlur" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="${softBlurStd}" />
    </filter>

    <filter id="medBlur" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="12" />
    </filter>

    <filter id="crispBlur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="${crispBlurStd}" />
    </filter>
  </defs>

  <!-- Wall Backdrop (top to y=385) -->
  <rect x="0" y="0" width="${width}" height="385" fill="url(#cycloramaGrad)" />
  <rect x="0" y="0" width="${width}" height="385" fill="url(#softboxAura)" />

  <!-- Floor Horizon Blend & Ground (y=380 to y=675) -->
  <rect x="0" y="380" width="${width}" height="295" fill="url(#floorGrad)" />
  <rect x="0" y="380" width="${width}" height="295" fill="url(#floorSheen)" />

  ${shadowElements}
</svg>
`;
}

// -----------------------------------------------------------------------------
// Direct Studio Image Processing (Resize & Optimize to < 200 KB WebP)
// -----------------------------------------------------------------------------
async function processDirectStudioImage(srcPath, destFilename, label) {
  const destPath = path.join(FLEET_DIR, destFilename);
  console.log(`\n[Direct Studio] Processing ${label}...`);
  console.log(`  Source: ${srcPath}`);

  if (!fs.existsSync(srcPath)) {
    throw new Error(`Direct studio asset not found: ${srcPath}`);
  }

  let quality = 85;
  let buffer;

  while (quality >= 60) {
    buffer = await sharp(srcPath)
      .resize(1200, 675, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality, effort: 5 })
      .toBuffer();

    if (buffer.length < 200 * 1024) break;
    quality -= 5;
  }

  fs.writeFileSync(destPath, buffer);
  const sizeKb = (buffer.length / 1024).toFixed(1);
  console.log(`  ✓ Saved ${destFilename}: ${sizeKb} KB (quality: ${quality})`);
  return { destFilename, size: buffer.length, sizeKb };
}

// -----------------------------------------------------------------------------
// Precision Calibrated Studio Compositing (Cutout onto SVG Cyclorama)
// -----------------------------------------------------------------------------
async function compositeVehicleStudio(cutoutPath, destFilename, label, options) {
  const destPath = path.join(FLEET_DIR, destFilename);
  console.log(`\n[Studio Composite] Compositing ${label}...`);
  console.log(`  Cutout: ${cutoutPath}`);

  if (!fs.existsSync(cutoutPath)) {
    throw new Error(`Vehicle cutout not found: ${cutoutPath}`);
  }

  const { maxW, maxH, groundY, shadowCx, shadowCy, shadowRx, shadowRy, offsetX = 0, multiTire = false } = options;

  // 1. Generate SVG backdrop buffer
  const svgContent = createStudioCycloramaSvg(1200, 675, shadowCx, shadowCy, shadowRx, shadowRy, multiTire);
  const bgBuffer = await sharp(Buffer.from(svgContent)).png().toBuffer();

  // 2. Trim and resize vehicle cutout
  const vehicleObj = await sharp(cutoutPath)
    .trim()
    .resize(maxW, maxH, { fit: 'inside' })
    .toBuffer({ resolveWithObject: true });

  const vW = vehicleObj.info.width;
  const vH = vehicleObj.info.height;
  const left = Math.round((1200 - vW) / 2) + offsetX;
  const top = groundY - vH;

  console.log(`  Trimmed & Scaled: ${vW} × ${vH}px | Placement: left=${left}, top=${top}`);

  // 3. Composite vehicle onto studio backdrop with adaptive WebP compression
  let quality = 85;
  let finalBuffer;

  while (quality >= 60) {
    finalBuffer = await sharp(bgBuffer)
      .composite([
        {
          input: vehicleObj.data,
          top: Math.max(0, top),
          left: Math.max(0, left)
        }
      ])
      .webp({ quality, effort: 5 })
      .toBuffer();

    if (finalBuffer.length < 200 * 1024) break;
    quality -= 5;
  }

  fs.writeFileSync(destPath, finalBuffer);
  const sizeKb = (finalBuffer.length / 1024).toFixed(1);
  console.log(`  ✓ Saved ${destFilename}: ${sizeKb} KB (quality: ${quality})`);
  return { destFilename, size: finalBuffer.length, sizeKb };
}

// -----------------------------------------------------------------------------
// Main Pipeline Execution
// -----------------------------------------------------------------------------
async function buildFleetStudioImages() {
  console.log('================================================================');
  console.log('Victor Mobility — Studio Imagery Generation & Optimization Pipeline');
  console.log('Target: 1200 × 675 (16:9 widescreen WebP, size < 200 KB)');
  console.log('================================================================');

  const BRAIN_DIR = 'C:/Users/tippa/.gemini/antigravity/brain/68a84c08-813a-4af1-889e-ef0c9a460c5a';

  // 1. Process 3 Direct High-Res AI Studio Images
  await processDirectStudioImage(
    path.join(BRAIN_DIR, 'hyundai_aura_studio_1792739374975.jpg'),
    'hyundai-aura.webp',
    'Hyundai Aura (Sedan, Petrol & CNG)'
  );

  await processDirectStudioImage(
    path.join(BRAIN_DIR, 'tata_tigor_ev_studio_1792739404208.jpg'),
    'tata-tigor-ev.webp',
    'Tata Tigor EV (Sedan, Electric Vehicle)'
  );

  await processDirectStudioImage(
    path.join(BRAIN_DIR, 'mahindra_marazzo_studio_1792739460812.jpg'),
    'mahindra-marazzo.webp',
    'Mahindra Marazzo (SUV, Diesel)'
  );

  // 2. Composite the Remaining 3 Vehicles onto Calibrated Studio Cyclorama
  // Force Urbania 12-seater (authentic modern executive monocoque luxury passenger van)
  await compositeVehicleStudio(
    path.join(ROOT_DIR, 'temp_urbania_isnet.png'),
    'force-urbania.webp',
    'Force Urbania 12-seater Luxury Passenger Van',
    {
      maxW: 820,
      maxH: 480,
      groundY: 565,
      shadowCx: 600,
      shadowCy: 565,
      shadowRx: 420,
      shadowRy: 36,
      offsetX: 10
    }
  );

  // Toyota Innova Crysta (benchmark executive SUV/MPV)
  await compositeVehicleStudio(
    path.join(ROOT_DIR, 'temp_innova1_isnet.png'),
    'innova-crysta.webp',
    'Toyota Innova Crysta (SUV, Diesel)',
    {
      maxW: 960,
      maxH: 420,
      groundY: 565,
      shadowCx: 600,
      shadowCy: 565,
      shadowRx: 460,
      shadowRy: 34,
      offsetX: 0
    }
  );

  // Kia Carens Clavis EV (next-gen long range electric SUV)
  await compositeVehicleStudio(
    path.join(ROOT_DIR, 'temp_carens_isnet.png'),
    'kia-carens-clavis-ev.webp',
    'Kia Carens Clavis EV (SUV, Long Range EV)',
    {
      maxW: 840,
      maxH: 465,
      groundY: 558,
      shadowCx: 610,
      shadowCy: 535,
      shadowRx: 380,
      shadowRy: 38,
      offsetX: 0,
      multiTire: true
    }
  );

  // 3. Verification of All 10 Authoritative Fleet Assets
  console.log('\n================================================================');
  console.log('Verifying All 10 Authoritative Fleet Images in public/images/fleet/');
  console.log('================================================================');

  const EXPECTED_FLEET = [
    { id: 'swift-dzire', filename: 'swift-dzire.webp' },
    { id: 'hyundai-aura', filename: 'hyundai-aura.webp' },
    { id: 'tata-tigor-ev', filename: 'tata-tigor-ev.webp' },
    { id: 'tata-nexon-ev', filename: 'tata-nexon-ev.webp' },
    { id: 'mg-zs-ev', filename: 'mg-zs-ev.webp' },
    { id: 'mahindra-marazzo', filename: 'mahindra-marazzo.webp' },
    { id: 'ertiga-cng', filename: 'ertiga-cng.webp' },
    { id: 'innova-crysta', filename: 'innova-crysta.webp' },
    { id: 'kia-carens-clavis-ev', filename: 'kia-carens-clavis-ev.webp' },
    { id: 'force-urbania', filename: 'force-urbania.webp' }
  ];

  let allPass = true;

  for (const item of EXPECTED_FLEET) {
    const fullPath = path.join(FLEET_DIR, item.filename);
    if (!fs.existsSync(fullPath)) {
      console.error(`  ✗ [FAIL] Missing file: ${item.filename}`);
      allPass = false;
      continue;
    }

    const stat = fs.statSync(fullPath);
    const meta = await sharp(fullPath).metadata();

    const isWebP = meta.format === 'webp';
    const is16by9 = meta.width === 1200 && meta.height === 675;
    const isUnder200Kb = stat.size < 200 * 1024;
    const isOver1Kb = stat.size > 1024;

    const valid = isWebP && is16by9 && isUnder200Kb && isOver1Kb;
    if (!valid) allPass = false;

    const statusMark = valid ? '✓ [PASS]' : '✗ [FAIL]';
    console.log(`  ${statusMark} ${item.filename.padEnd(26)}: ${meta.width}x${meta.height} ${meta.format}, ${(stat.size / 1024).toFixed(1)} KB`);
  }

  if (!allPass) {
    throw new Error('One or more fleet images failed verification checks!');
  }

  console.log('\n================================================================');
  console.log('RESULT: ALL 10 FLEET ASSETS VERIFIED (1200x675 WebP, < 200 KB)');
  console.log('================================================================');
}

buildFleetStudioImages().catch(err => {
  console.error('\nFatal Pipeline Error:', err);
  process.exit(1);
});
