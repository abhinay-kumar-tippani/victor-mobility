import sharp from 'sharp';
import fs from 'fs';

// 1200x675 Studio Cyclorama SVG
// Brand palette:
// Obsidian: #070A12
// Ink: #15162F
// Indigo: #31326F
// Blue highlight: #2D5090
const svgStudioBackground = `
<svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Upper Cyclorama Gradient -->
    <linearGradient id="cycloramaGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1B1C42" />
      <stop offset="45%" stop-color="#23254E" />
      <stop offset="75%" stop-color="#15162F" />
      <stop offset="100%" stop-color="#0E0F20" />
    </linearGradient>

    <!-- Overhead Softbox Spot -->
    <radialGradient id="softboxAura" cx="50%" cy="25%" r="45%">
      <stop offset="0%" stop-color="#31326F" stop-opacity="0.6" />
      <stop offset="50%" stop-color="#2D5090" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#15162F" stop-opacity="0" />
    </radialGradient>

    <!-- Floor Gradient -->
    <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0E0F20" />
      <stop offset="15%" stop-color="#0A0C16" />
      <stop offset="55%" stop-color="#070A12" />
      <stop offset="100%" stop-color="#04060B" />
    </linearGradient>

    <!-- Ground Contact Shadow -->
    <radialGradient id="contactShadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.85" />
      <stop offset="40%" stop-color="#000000" stop-opacity="0.6" />
      <stop offset="75%" stop-color="#070A12" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#070A12" stop-opacity="0" />
    </radialGradient>

    <!-- Floor Specular Sheen -->
    <linearGradient id="floorSheen" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#070A12" />
      <stop offset="30%" stop-color="#15162F" stop-opacity="0.4" />
      <stop offset="50%" stop-color="#2D5090" stop-opacity="0.15" />
      <stop offset="70%" stop-color="#15162F" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#070A12" />
    </linearGradient>
  </defs>

  <!-- Wall Backdrop (top to y=390) -->
  <rect x="0" y="0" width="1200" height="395" fill="url(#cycloramaGrad)" />
  <rect x="0" y="0" width="1200" height="395" fill="url(#softboxAura)" />

  <!-- Floor Horizon Blend & Ground (y=390 to y=675) -->
  <rect x="0" y="390" width="1200" height="285" fill="url(#floorGrad)" />
  <rect x="0" y="390" width="1200" height="285" fill="url(#floorSheen)" />

  <!-- Horizon Soft Transition Line -->
  <line x1="0" y1="392" x2="1200" y2="392" stroke="#15162F" stroke-width="3" opacity="0.6" />

  <!-- Elliptical Ground Ambient Occlusion Shadow -->
  <ellipse cx="610" cy="560" rx="460" ry="42" fill="url(#contactShadow)" />
  <ellipse cx="600" cy="565" rx="360" ry="24" fill="#000000" opacity="0.75" />
</svg>
`;

async function makeBackground() {
  const buf = Buffer.from(svgStudioBackground);
  await sharp(buf).png().toFile('temp_studio_bg.png');
  console.log('Generated temp_studio_bg.png');
}

makeBackground();
