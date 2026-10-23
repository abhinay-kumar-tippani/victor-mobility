import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const SERVICES_DIR = path.join(ROOT_DIR, "public", "images", "services");
const INDIA_SERVICES_DIR = path.join(ROOT_DIR, "public", "images", "india", "services");
const UAE_SERVICES_DIR = path.join(ROOT_DIR, "public", "images", "uae", "services");

// Ensure target directories exist
for (const dir of [SERVICES_DIR, INDIA_SERVICES_DIR, UAE_SERVICES_DIR]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export const SERVICE_ASSET_MANIFEST = [
  {
    slug: "employee-transportation",
    filename: "employee-transportation.webp",
    legacyName: "service-employee-transport.webp",
    legacyJpg: "service-employee-transport.jpg",
    title: "Employee Transportation",
    badge: "Workplace Commute Solutions",
    masterPath: path.join(INDIA_SERVICES_DIR, "service-employee-transport.jpg"),
    fallbackEndpoint: "https://image.pollinations.ai/prompt/Corporate%20employee%20commuter%20coaches%20and%20shuttles%20outside%20modern%20tech%20park%20in%20daylight?width=1376&height=768&nologo=true&seed=812401",
    prompt:
      "High-end commercial photograph of modern executive corporate commuter coaches and premium passenger shuttles lined up outside a gleaming glass-and-steel technology park in bright daylight. Professional uniformed drivers standing attentively beside spotless vehicles. Executive passengers in business attire boarding in an orderly fashion. Deep obsidian and navy accents, crisp automotive reflections on vehicle panels, pristine concrete driveway, clean architectural lines, editorial commercial corporate transit photography, authentic lighting.",
    alt: "Corporate employee commuter coach and shuttle fleet outside modern technology park",
    sourceDescription: "Commercial corporate mobility photography; executive shuttles and sedans outside Innovation Campus",
  },
  {
    slug: "bus-shuttle-transport",
    filename: "bus-shuttle-transport.webp",
    legacyName: "service-bus-shuttle.webp",
    legacyJpg: "service-bus-shuttle.jpg",
    title: "Bus & Shuttle Transport",
    badge: "Group & Campus Shuttles",
    masterPath: path.join(INDIA_SERVICES_DIR, "service-bus-shuttle.jpg"),
    fallbackEndpoint: "https://image.pollinations.ai/prompt/High-capacity%20modern%20luxury%20corporate%20coach%20bus%20on%20urban%20business%20corridor?width=1376&height=768&nologo=true&seed=812402",
    prompt:
      "Commercial photograph of a high-capacity modern luxury corporate coach bus smoothly traveling along an elevated modern urban transit corridor. Architectural glass corporate skyscrapers in the background during golden morning daylight. Elegant silver and navy corporate livery, tinted aerodynamic windows, crisp road reflections, professional commercial transit photography, realistic motion blur on wheels conveying punctual transit, high-end editorial automotive capture.",
    alt: "High-capacity executive corporate bus on an urban business transit corridor",
    sourceDescription: "Commercial corporate coach photography; luxury group coaches outside Tech Headquarters",
  },
  {
    slug: "event-transportation",
    filename: "event-transportation.webp",
    legacyName: "service-event-transport.webp",
    legacyJpg: "service-event-transport.jpg",
    title: "Event Transportation",
    badge: "Weddings, Galas & Summits",
    masterPath: path.join(INDIA_SERVICES_DIR, "service-event-transport.jpg"),
    fallbackEndpoint: "https://image.pollinations.ai/prompt/Synchronized%20motorcade%20of%20black%20luxury%20executive%20sedans%20outside%20grand%20summit%20palace?width=1376&height=768&nologo=true&seed=812403",
    prompt:
      "Pristine commercial evening photograph of a synchronized motorcade lineup of black luxury executive saloons and premium passenger MPVs parked outside an illuminated grand convention center and gala summit entrance. Subtle red carpet leading to entrance, ambient warm architectural accent lighting contrasting against a deep indigo twilight sky (#15162F). Crisp reflections on polished black vehicle hoods, impeccably dressed chauffeurs standing beside cars, VIP summit grandeur, 8k photography.",
    alt: "Synchronized motorcade of luxury executive sedans and vans outside conference summit venue",
    sourceDescription: "Commercial summit motorcade photography; black executive saloons lined up outside grand venue",
  },
  {
    slug: "airport-transfers",
    filename: "airport-transfers.webp",
    legacyName: "service-airport-transfers.webp",
    legacyJpg: "service-airport-transfers.jpg",
    title: "Airport Transfers",
    badge: "Terminal Punctuality",
    masterPath: path.join(INDIA_SERVICES_DIR, "service-airport-transfers.jpg"),
    fallbackEndpoint: "https://image.pollinations.ai/prompt/Uniformed%20chauffeur%20greeting%20passenger%20beside%20black%20Mercedes%20at%20private%20airport%20terminal?width=1376&height=768&nologo=true&seed=812404",
    prompt:
      "Editorial commercial photograph of a courteous, uniformed professional chauffeur in a tailored dark suit and tie holding a sleek digital name tablet, warmly greeting an executive business traveler beside an open door of a pristine black executive Mercedes-Benz S-Class sedan. Curbside at a modern international airport VIP terminal with dramatic glass architectural canopies and warm evening dusk lighting. Sleek executive luggage beside the vehicle, pristine tarmac, cinematic depth of field, authentic hospitality.",
    alt: "Uniformed professional chauffeur greeting executive passenger curbside at airport terminal",
    sourceDescription: "Editorial VIP airport chauffeur photography; Mercedes-Benz S-Class curbside at private terminal",
  },
  {
    slug: "chauffeur-luxury",
    filename: "chauffeur-luxury.webp",
    legacyName: "service-chauffeur-luxury.webp",
    legacyJpg: "service-chauffeur-luxury.jpg",
    title: "Luxury Chauffeur Service",
    badge: "Executive & VIP Travel",
    masterPath: path.join(INDIA_SERVICES_DIR, "service-chauffeur-luxury.jpg"),
    fallbackEndpoint: "https://image.pollinations.ai/prompt/Luxury%20black%20executive%20saloon%20with%20chauffeur%20outside%20corporate%20headquarters%20at%20night?width=1376&height=768&nologo=true&seed=812405",
    prompt:
      "Luxury commercial automotive photograph of a flagship black executive saloon parked on polished granite pavement outside an illuminated multinational corporate headquarters at blue hour. Dramatic cinematic studio-grade exterior lighting highlighting sleek body contours, crystal-clear chrome trims, and gloss paint. Professional chauffeur in pristine dark uniform standing attentively by the rear passenger door. Deep obsidian and indigo brand palette (#070A12, #15162F), pinnacle corporate prestige, ultra-luxury automotive editorial.",
    alt: "Luxury executive saloon with attentive chauffeur outside illuminated corporate headquarters at night",
    sourceDescription: "Ultra-luxury executive chauffeur photography; Mercedes S-Class outside illuminated corporate headquarters",
  },
  {
    slug: "rent-a-car",
    filename: "rent-a-car.webp",
    legacyName: "service-rent-a-car.webp",
    legacyJpg: "service-rent-a-car.jpg",
    title: "Rent-a-Car Fleet",
    badge: "Flexible Fleet Rental",
    masterPath: path.join(INDIA_SERVICES_DIR, "service-rent-a-car.jpg"),
    fallbackEndpoint: "https://image.pollinations.ai/prompt/Executive%20rental%20cars%20fleet%20including%20sedans%20and%20SUVs%20outside%20modern%20office%20building?width=1376&height=768&nologo=true&seed=812406",
    prompt:
      "Commercial photograph of an immaculate lineup of diverse executive rental vehicles, including premium sedans, executive SUVs, and luxury crossovers, parked in an angled row outside a contemporary glass corporate office in bright midday sunlight. Pristine vehicle condition, polished reflections on hoods, clean valet staging area, professional enterprise car rental and fleet leasing presentation, crisp focus, commercial automotive advertising aesthetic.",
    alt: "Premium executive car rental fleet parked in front of modern corporate glass building",
    sourceDescription: "Commercial corporate fleet photography; executive sedans and luxury vans outside corporate building",
  },
  {
    slug: "tourism-travel",
    filename: "tourism-travel.webp",
    legacyName: "service-tourism-travel.webp",
    legacyJpg: "service-tourism-travel.jpg",
    title: "Tourism & City Travel (UAE)",
    badge: "Private Tours & Excursions",
    masterPath: path.join(ROOT_DIR, "public", "images", "uae", "uae-hero.jpg"),
    fallbackEndpoint: "https://image.pollinations.ai/prompt/Luxury%20black%20SUV%20overlooking%20Dubai%20skyline%20at%20golden%20hour?width=1376&height=768&nologo=true&seed=812407",
    prompt:
      "Luxury commercial travel photograph of a pristine black executive SUV parked on an elegant palm-fringed boulevard overlooking iconic modern Dubai architectural landmarks during golden hour. Warm desert sunset lighting reflecting off tinted glass and chrome wheels, blending into a twilight indigo sky. Courteous chauffeur assisting discerning executive travelers, premier Arabian tourism, world-class luxury excursions, 8k commercial photography.",
    alt: "Luxury chauffeured executive vehicle on scenic boulevard with Dubai skyline at sunset",
    sourceDescription: "Luxury Arabian tourism photography; Rolls-Royce Cullinan & Mercedes S-Class overlooking Dubai skyline",
  },
];

async function loadBuffer(item) {
  // First check if master image exists locally
  if (fs.existsSync(item.masterPath)) {
    console.log(`  Source: Local high-resolution master asset: ${item.masterPath}`);
    return fs.readFileSync(item.masterPath);
  }

  // Otherwise fetch from endpoint
  console.log(`  Source: Fetching from endpoint: ${item.fallbackEndpoint}`);
  const res = await fetch(item.fallbackEndpoint, {
    headers: { "User-Agent": "VictorMobilityAssetPipeline/1.0" },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch from ${item.fallbackEndpoint}: ${res.status} ${res.statusText}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

async function optimizeAndDeployAsset(item) {
  console.log(`\n============================================================`);
  console.log(`Processing: [${item.slug}] - ${item.title}`);
  console.log(`============================================================`);

  const rawBuffer = await loadBuffer(item);
  console.log(`  Loaded input: ${rawBuffer.length} bytes`);

  // Target: 1200x675 (16:9 widescreen), WebP format, quality <= 85, effort 5, size strictly < 200 KB
  let quality = 85;
  let webpBuffer;

  while (quality >= 70) {
    webpBuffer = await sharp(rawBuffer)
      .resize(1200, 675, {
        fit: "cover",
        position: "center",
      })
      .webp({
        quality,
        effort: 5,
      })
      .toBuffer();

    if (webpBuffer.length < 200 * 1024) {
      break;
    }
    quality -= 2;
  }

  const webpSizeKb = (webpBuffer.length / 1024).toFixed(1);
  console.log(`  WebP optimized at quality ${quality}: ${webpSizeKb} KB (< 200 KB threshold met)`);

  if (webpBuffer.length >= 200 * 1024) {
    throw new Error(`Failed to compress ${item.filename} below 200 KB (current: ${webpSizeKb} KB)`);
  }

  // 1. Write to public/images/services/
  const targetServicesPath = path.join(SERVICES_DIR, item.filename);
  fs.writeFileSync(targetServicesPath, webpBuffer);
  console.log(`  ✓ Saved: ${targetServicesPath}`);

  // 2. Mirror to public/images/india/services/ (slug name + legacy webp name)
  const targetIndiaSlug = path.join(INDIA_SERVICES_DIR, item.filename);
  fs.writeFileSync(targetIndiaSlug, webpBuffer);
  if (item.legacyName && item.legacyName !== item.filename) {
    const targetIndiaLegacy = path.join(INDIA_SERVICES_DIR, item.legacyName);
    fs.writeFileSync(targetIndiaLegacy, webpBuffer);
  }
  console.log(`  ✓ Mirrored to India: ${targetIndiaSlug}`);

  // 3. Mirror to public/images/uae/services/ (slug name + legacy webp name)
  const targetUaeSlug = path.join(UAE_SERVICES_DIR, item.filename);
  fs.writeFileSync(targetUaeSlug, webpBuffer);
  if (item.legacyName && item.legacyName !== item.filename) {
    const targetUaeLegacy = path.join(UAE_SERVICES_DIR, item.legacyName);
    fs.writeFileSync(targetUaeLegacy, webpBuffer);
  }
  console.log(`  ✓ Mirrored to UAE: ${targetUaeSlug}`);

  // 4. Also optimize legacy JPG counterpart if applicable (replacing legacy 2.6MB/2.1MB files)
  if (item.legacyJpg) {
    const legacyJpgPath = path.join(INDIA_SERVICES_DIR, item.legacyJpg);
    const jpgBuffer = await sharp(rawBuffer)
      .resize(1200, 675, { fit: "cover", position: "center" })
      .jpeg({ quality: 84, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(legacyJpgPath, jpgBuffer);
    console.log(`  ✓ Optimized legacy JPG: ${legacyJpgPath} (${(jpgBuffer.length / 1024).toFixed(1)} KB)`);
  }

  return {
    slug: item.slug,
    title: item.title,
    filename: item.filename,
    dimensions: "1200x675 (16:9)",
    sizeKb: `${webpSizeKb} KB`,
    status: "PASS",
  };
}

async function run() {
  console.log("============================================================");
  console.log("Victor Mobility Service Photographic Pipeline (Sharp)");
  console.log("Target Directories:");
  console.log(`  1. ${SERVICES_DIR}`);
  console.log(`  2. ${INDIA_SERVICES_DIR}`);
  console.log(`  3. ${UAE_SERVICES_DIR}`);
  console.log("============================================================");

  const results = [];
  for (const item of SERVICE_ASSET_MANIFEST) {
    try {
      const res = await optimizeAndDeployAsset(item);
      results.push(res);
    } catch (err) {
      console.error(`✗ Pipeline error on ${item.slug}:`, err.message);
      process.exit(1);
    }
  }

  console.log("\n============================================================");
  console.log("Pipeline Summary — All 7 Service Assets Deployed");
  console.log("============================================================");
  console.table(results);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  run().catch((err) => {
    console.error("Fatal pipeline error:", err);
    process.exit(1);
  });
}
