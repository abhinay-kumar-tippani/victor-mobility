import sharp from 'sharp';
import fs from 'fs';

// Enhanced Studio Background with blurred contact shadows & floor reflections
function createStudioSvg(width = 1200, height = 675, shadowCx = 600, shadowCy = 550, shadowRx = 480, shadowRy = 35) {
  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Upper Cyclorama Gradient -->
    <linearGradient id="cycloramaGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1E2048" />
      <stop offset="35%" stop-color="#282B5C" />
      <stop offset="70%" stop-color="#181938" />
      <stop offset="100%" stop-color="#0E0F22" />
    </linearGradient>

    <!-- Overhead Softbox Spot -->
    <radialGradient id="softboxAura" cx="50%" cy="20%" r="55%">
      <stop offset="0%" stop-color="#31326F" stop-opacity="0.8" />
      <stop offset="40%" stop-color="#2D5090" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#15162F" stop-opacity="0" />
    </radialGradient>

    <!-- Floor Gradient -->
    <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0E0F22" />
      <stop offset="10%" stop-color="#0A0C18" />
      <stop offset="45%" stop-color="#070A12" />
      <stop offset="100%" stop-color="#04050A" />
    </linearGradient>

    <!-- Floor Specular Sheen -->
    <linearGradient id="floorSheen" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#070A12" />
      <stop offset="25%" stop-color="#15162F" stop-opacity="0.3" />
      <stop offset="50%" stop-color="#2D5090" stop-opacity="0.2" />
      <stop offset="75%" stop-color="#15162F" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#070A12" />
    </linearGradient>

    <filter id="softBlur" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="24" />
    </filter>

    <filter id="crispBlur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" />
    </filter>
  </defs>

  <!-- Wall Backdrop -->
  <rect x="0" y="0" width="${width}" height="385" fill="url(#cycloramaGrad)" />
  <rect x="0" y="0" width="${width}" height="385" fill="url(#softboxAura)" />

  <!-- Floor Horizon Blend & Ground -->
  <rect x="0" y="380" width="${width}" height="295" fill="url(#floorGrad)" />
  <rect x="0" y="380" width="${width}" height="295" fill="url(#floorSheen)" />

  <!-- Soft Ambient Occlusion Ground Shadow -->
  <ellipse cx="${shadowCx}" cy="${shadowCy}" rx="${shadowRx}" ry="${shadowRy}" fill="#000000" opacity="0.85" filter="url(#softBlur)" />
  <ellipse cx="${shadowCx}" cy="${shadowCy + 5}" rx="${shadowRx * 0.8}" ry="${shadowRy * 0.5}" fill="#000000" opacity="0.95" filter="url(#crispBlur)" />
</svg>
`;
}

async function testCompositeUrbania() {
  const bgSvg = createStudioSvg(1200, 675, 590, 565, 430, 38);
  const bgBuffer = await sharp(Buffer.from(bgSvg)).png().toBuffer();

  // Resize and position Urbania
  // Height ~500px, width ~790px, perfectly balanced in 1200x675
  const urbaniaImg = await sharp('temp_urbania_isnet.png')
    .trim()
    .resize(null, 500, { fit: 'inside' })
    .toBuffer({ resolveWithObject: true });

  const uWidth = urbaniaImg.info.width;
  const uHeight = urbaniaImg.info.height;
  const left = Math.round((1200 - uWidth) / 2) + 15;
  const top = 560 - uHeight; // baseline rests on ground contact line

  console.log('Urbania dimensions:', uWidth, 'x', uHeight, 'pos:', left, top);

  const finalImage = await sharp(bgBuffer)
    .composite([
      {
        input: urbaniaImg.data,
        top: Math.max(0, top),
        left: Math.max(0, left)
      }
    ])
    .webp({ quality: 85, effort: 5 })
    .toFile('temp_urbania_studio.webp');

  const stats = fs.statSync('temp_urbania_studio.webp');
  console.log('Urbania studio composite created:', stats.size, 'bytes');
}

testCompositeUrbania();
