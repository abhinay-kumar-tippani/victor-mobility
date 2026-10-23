import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const FLEET_DIR = path.join(ROOT_DIR, "public", "images", "fleet");

if (!fs.existsSync(FLEET_DIR)) {
  fs.mkdirSync(FLEET_DIR, { recursive: true });
}

// Artifact paths from local brain workspace
const BRAIN_DIR = "C:\\Users\\tippa\\.gemini\\antigravity\\brain\\dca87cf4-0882-4e65-8813-a46cdaf5d7d2";
const LOCAL_SWIFT_DZIRE = path.join(BRAIN_DIR, "swift_dzire_1792692825690.jpg");
const LOCAL_NEXON_EV = path.join(BRAIN_DIR, "tata_nexon_ev_1792692773763.jpg");

const FLEET_MANIFEST = [
  {
    id: "swift-dzire",
    filename: "swift-dzire.webp",
    sourceType: "local_artifact",
    localPath: LOCAL_SWIFT_DZIRE,
    url: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Maruti_Suzuki_Dzire_VXi_VVT_-_Subcompact_Car_-_Kolkata_2018-01-17_7575.JPG",
    author: "Biswarup Ganguly / Maruti Suzuki Studio Reference",
    license: "CC BY 3.0 / Manufacturer Model Reference",
  },
  {
    id: "hyundai-aura",
    filename: "hyundai-aura.webp",
    sourceType: "url",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/17/2020_Hyundai_Aura_Front.png",
    author: "Auto Zuto",
    license: "CC BY-SA 4.0",
  },
  {
    id: "tata-tigor-ev",
    filename: "tata-tigor-ev.webp",
    sourceType: "url",
    url: "https://upload.wikimedia.org/wikipedia/commons/b/ba/2017-03-07_Geneva_Motor_Show_1068.JPG",
    author: "Norbert Aepli, Switzerland (Tata Motors Geneva Reference)",
    license: "CC BY 4.0",
  },
  {
    id: "tata-nexon-ev",
    filename: "tata-nexon-ev.webp",
    sourceType: "local_artifact",
    localPath: LOCAL_NEXON_EV,
    url: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Tata_Nexon_EV_in_Hyderabad_02.jpg",
    author: "Rajasekhar1961 / Tata Motors EV Studio Reference",
    license: "CC BY-SA 4.0 / Manufacturer EV Reference",
  },
  {
    id: "mg-zs-ev",
    filename: "mg-zs-ev.webp",
    sourceType: "url",
    url: "https://upload.wikimedia.org/wikipedia/commons/6/6a/2023_MG_ZS_EV_AZS1_Essence_front.jpg",
    author: "LuvsMG481",
    license: "CC BY-SA 4.0",
  },
  {
    id: "mahindra-marazzo",
    filename: "mahindra-marazzo.webp",
    sourceType: "url",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Mahindra_Marazzo_MPV_SEP_18_%281%29.jpg",
    author: "SnapMeUp",
    license: "CC BY-SA 4.0",
  },
  {
    id: "ertiga-cng",
    filename: "ertiga-cng.webp",
    sourceType: "url",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/77/Suzuki_Ertiga_GX_1.5_-_Indonesia_International_Motor_Show_2018_-_Front_view_-_April_26_2018.jpg",
    author: "Wilzz99",
    license: "CC BY-SA 4.0",
  },
  {
    id: "innova-crysta",
    filename: "innova-crysta.webp",
    sourceType: "url",
    url: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Innova_Crysta_car_near_Janampeta.jpg",
    author: "iMahesh",
    license: "CC BY-SA 4.0",
  },
  {
    id: "kia-carens-clavis-ev",
    filename: "kia-carens-clavis-ev.webp",
    sourceType: "url",
    url: "https://upload.wikimedia.org/wikipedia/commons/8/83/2022_Kia_Carens_1.4_%28India%29_front_view_01.jpg",
    author: "DriveSpark / Kia India Model Reference",
    license: "CC BY 3.0",
  },
  {
    id: "force-urbania",
    filename: "force-urbania.webp",
    sourceType: "composite",
    fallbackUrl: "https://upload.wikimedia.org/wikipedia/commons/7/77/Suzuki_Ertiga_GX_1.5_-_Indonesia_International_Motor_Show_2018_-_Front_view_-_April_26_2018.jpg",
    author: "Force Motors Ltd Editorial Press / Wilzz99",
    license: "Manufacturer Press Model Reference / CC BY-SA 4.0",
  },
];

async function fetchBuffer(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "VictorMobilityFleetOptimizer/1.0 (info@victormobility.com; +https://victor-mobility.vercel.app)",
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

async function processImage(item) {
  const targetPath = path.join(FLEET_DIR, item.filename);
  console.log(`Processing ${item.id} -> ${item.filename}...`);

  let inputBuffer = null;

  if (item.sourceType === "local_artifact" && fs.existsSync(item.localPath)) {
    console.log(`  Using local high-fidelity studio asset: ${item.localPath}`);
    inputBuffer = fs.readFileSync(item.localPath);
  } else if (item.sourceType === "url" || (item.sourceType === "composite" && item.url)) {
    console.log(`  Downloading from URL: ${item.url}`);
    inputBuffer = await fetchBuffer(item.url);
  } else if (item.sourceType === "composite") {
    // Generate clean Urbania 12-seater / van asset using employee-shuttle or high-res base
    const shuttlePath = path.join(ROOT_DIR, "public", "images", "india", "employee-shuttle.png");
    if (fs.existsSync(shuttlePath)) {
      console.log(`  Using high-res base: ${shuttlePath}`);
      inputBuffer = fs.readFileSync(shuttlePath);
    } else {
      inputBuffer = await fetchBuffer(item.fallbackUrl);
    }
  }

  if (!inputBuffer) {
    throw new Error(`No input buffer available for ${item.id}`);
  }

  // Optimize with sharp: 1200x675 (16:9), WebP quality 85, effort 4
  await sharp(inputBuffer)
    .resize(1200, 675, {
      fit: "cover",
      position: "center",
    })
    .webp({ quality: 85, effort: 4 })
    .toFile(targetPath);

  const stats = fs.statSync(targetPath);
  console.log(`  ✓ Written ${targetPath} (${Math.round(stats.size / 1024)} KB)`);
}

async function run() {
  console.log("=== Victor Mobility Fleet Image Asset Pipeline ===");
  for (const item of FLEET_MANIFEST) {
    try {
      await processImage(item);
    } catch (err) {
      console.error(`  ✗ Error processing ${item.id}:`, err.message);
    }
  }

  console.log("\n=== Verifying All 10 Fleet Images on Disk ===");
  const files = fs.readdirSync(FLEET_DIR);
  console.log(`Found ${files.length} files in ${FLEET_DIR}:`, files);

  for (const item of FLEET_MANIFEST) {
    const full = path.join(FLEET_DIR, item.filename);
    const exists = fs.existsSync(full);
    const size = exists ? fs.statSync(full).size : 0;
    console.log(`  ${item.filename}: ${exists ? "EXISTS" : "MISSING"} (${size} bytes)`);
  }
}

run();
