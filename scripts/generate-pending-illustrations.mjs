import sharp from "sharp";
import path from "path";

function createPlaceholderSvg(title, subtitle) {
  return Buffer.from(`
    <svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stop-color="#FAFAF8" />
          <stop offset="60%" stop-color="#F0EFEA" />
          <stop offset="100%" stop-color="#E5E4DE" />
        </radialGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </linearGradient>
      </defs>
      
      <!-- Studio Background -->
      <rect width="1200" height="675" fill="url(#bg)" />
      
      <!-- Floor Horizon Line and Ground Shadow -->
      <ellipse cx="600" cy="520" rx="460" ry="38" fill="url(#ground)" />
      <line x1="80" y1="510" x2="1120" y2="510" stroke="#D5D4CE" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.6" />
      
      <!-- Graphic Container Card -->
      <g transform="translate(300, 160)">
        <rect x="0" y="0" width="600" height="300" rx="20" fill="#FFFFFF" fill-opacity="0.82" stroke="#D5D4CE" stroke-width="1.5" />
        
        <!-- Brand Badge -->
        <circle cx="300" cy="90" r="42" fill="#31326F" fill-opacity="0.06" stroke="#31326F" stroke-opacity="0.12" stroke-width="1.5" />
        <path d="M285,102 L300,75 L315,102 Z" fill="#31326F" opacity="0.45" />
        
        <!-- Typography -->
        <text x="300" y="165" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="700" fill="#1E1B4E" text-anchor="middle">
          ${title}
        </text>
        <text x="300" y="196" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#6E57A0" text-anchor="middle" letter-spacing="0.08em">
          ${subtitle.toUpperCase()}
        </text>
        
        <rect x="180" y="222" width="240" height="32" rx="16" fill="#31326F" fill-opacity="0.08" />
        <text x="300" y="243" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#31326F" text-anchor="middle">
          Reference illustration pending
        </text>
      </g>
      
      <!-- Footer Brand Watermark -->
      <text x="600" y="630" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#8E8C94" text-anchor="middle" letter-spacing="0.08em">
        VICTOR MOBILITY · INDIA FLEET
      </text>
    </svg>
  `);
}

async function run() {
  const items = [
    { file: "sml-22-seater-bus.webp", title: "SML — 22 Seater Bus", subtitle: "Commercial Executive Shuttle" },
    { file: "toyota-rumion.webp", title: "Toyota Rumion", subtitle: "7-Seater Executive MPV" },
    { file: "toyota-hyryder.webp", title: "Toyota Urban Cruiser Hyryder", subtitle: "Executive Hybrid SUV" },
  ];
  for (const item of items) {
    const svg = createPlaceholderSvg(item.title, item.subtitle);
    await sharp(svg).webp({ quality: 90 }).toFile(path.join("public/images/fleet", item.file));
    console.log("Created public/images/fleet/" + item.file);
  }
}

run().catch(console.error);
