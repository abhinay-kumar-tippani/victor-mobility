import fs from 'fs';
import sharp from 'sharp';

function createStudioCycloramaSvg(width = 1200, height = 675) {
  // Placement: left = 180, top = 100, vehicle width = 837, height = 461
  // Near front tire: left + 450 = 630, top + 459 = 559
  // Near rear tire: left + 750 = 930, top + 397 = 497
  // Far front tire: left + 100 = 280, top + 436 = 536
  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cycloramaGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1E2048" />
      <stop offset="35%" stop-color="#282B5C" />
      <stop offset="70%" stop-color="#181938" />
      <stop offset="100%" stop-color="#0E0F22" />
    </linearGradient>

    <radialGradient id="softboxAura" cx="50%" cy="20%" r="55%">
      <stop offset="0%" stop-color="#31326F" stop-opacity="0.85" />
      <stop offset="40%" stop-color="#2D5090" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#15162F" stop-opacity="0" />
    </radialGradient>

    <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0E0F22" />
      <stop offset="10%" stop-color="#0A0C18" />
      <stop offset="45%" stop-color="#070A12" />
      <stop offset="100%" stop-color="#04050A" />
    </linearGradient>

    <linearGradient id="floorSheen" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#070A12" />
      <stop offset="25%" stop-color="#15162F" stop-opacity="0.3" />
      <stop offset="50%" stop-color="#2D5090" stop-opacity="0.2" />
      <stop offset="75%" stop-color="#15162F" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#070A12" />
    </linearGradient>

    <filter id="softBlur" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="22" />
    </filter>

    <filter id="medBlur" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="12" />
    </filter>

    <filter id="crispBlur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" />
    </filter>
  </defs>

  <rect x="0" y="0" width="${width}" height="385" fill="url(#cycloramaGrad)" />
  <rect x="0" y="0" width="${width}" height="385" fill="url(#softboxAura)" />

  <rect x="0" y="380" width="${width}" height="295" fill="url(#floorGrad)" />
  <rect x="0" y="380" width="${width}" height="295" fill="url(#floorSheen)" />

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
</svg>
`;
}

async function testComposite() {
  const cutoutPath = '.agents/teamwork/explorer_m1_fix1/temp_clavis_ev_isnet.png';
  const destPath = '.agents/teamwork/explorer_m1_fix1/test_kia_carens_clavis_ev_v3.webp';

  const svgContent = createStudioCycloramaSvg(1200, 675);
  const bgBuffer = await sharp(Buffer.from(svgContent)).png().toBuffer();

  const vehicleObj = await sharp(cutoutPath)
    .trim()
    .resize(837, 461, { fit: 'inside' })
    .toBuffer({ resolveWithObject: true });

  const left = 180;
  const top = 100;

  const finalBuffer = await sharp(bgBuffer)
    .composite([
      {
        input: vehicleObj.data,
        top,
        left
      }
    ])
    .webp({ quality: 85, effort: 5 })
    .toBuffer();

  fs.writeFileSync(destPath, finalBuffer);
  console.log(`Saved composite v3 to ${destPath}: ${(finalBuffer.length / 1024).toFixed(1)} KB`);
}

testComposite();
