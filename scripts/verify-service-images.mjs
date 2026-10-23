import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const SLUGS = [
  "employee-transportation",
  "bus-shuttle-transport",
  "event-transportation",
  "airport-transfers",
  "chauffeur-luxury",
  "rent-a-car",
  "tourism-travel",
];

const TARGET_DIRS = [
  { name: "Services Root", dir: path.join(ROOT_DIR, "public", "images", "services") },
  { name: "India Services", dir: path.join(ROOT_DIR, "public", "images", "india", "services") },
  { name: "UAE Services", dir: path.join(ROOT_DIR, "public", "images", "uae", "services") },
];

const MAX_SIZE_BYTES = 200 * 1024; // 200 KB
const EXPECTED_WIDTH = 1200;
const EXPECTED_HEIGHT = 675;

async function verifyDirectory(dirInfo) {
  console.log(`\nChecking directory: ${dirInfo.name} (${dirInfo.dir})`);
  let dirPass = true;

  for (const slug of SLUGS) {
    const filename = `${slug}.webp`;
    const fullPath = path.join(dirInfo.dir, filename);

    if (!fs.existsSync(fullPath)) {
      console.error(`  ✗ [MISSING] File not found: ${fullPath}`);
      dirPass = false;
      continue;
    }

    const stat = fs.statSync(fullPath);
    const sizeKb = (stat.size / 1024).toFixed(1);

    if (stat.size >= MAX_SIZE_BYTES) {
      console.error(`  ✗ [SIZE OVERFLOW] ${filename}: ${sizeKb} KB (exceeds 200 KB limit)`);
      dirPass = false;
      continue;
    }

    try {
      const meta = await sharp(fullPath).metadata();

      if (meta.format !== "webp") {
        console.error(`  ✗ [FORMAT ERROR] ${filename}: format is ${meta.format}, expected webp`);
        dirPass = false;
        continue;
      }

      if (meta.width !== EXPECTED_WIDTH || meta.height !== EXPECTED_HEIGHT) {
        console.error(`  ✗ [DIMENSION ERROR] ${filename}: ${meta.width}x${meta.height}, expected ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}`);
        dirPass = false;
        continue;
      }

      console.log(`  ✓ [PASS] ${filename}: ${meta.width}x${meta.height} WebP, ${sizeKb} KB (< 200 KB)`);
    } catch (err) {
      console.error(`  ✗ [DECODE ERROR] ${filename}: Failed to decode: ${err.message}`);
      dirPass = false;
    }
  }

  return dirPass;
}

async function run() {
  console.log("============================================================");
  console.log("Victor Mobility — Service Image Verification Suite");
  console.log("Criteria: 1200x675, WebP format, File size < 200 KB");
  console.log("============================================================");

  let allPass = true;
  for (const dirInfo of TARGET_DIRS) {
    const passed = await verifyDirectory(dirInfo);
    if (!passed) allPass = false;
  }

  console.log("\n============================================================");
  if (allPass) {
    console.log("RESULT: ALL 7 SERVICE IMAGES VERIFIED ACROSS ALL 3 DIRECTORIES!");
    console.log("Total verified assets: 21 files (7 services * 3 directories)");
    console.log("Status: 100% PASS");
    process.exit(0);
  } else {
    console.error("RESULT: VERIFICATION FAILED. See errors above.");
    process.exit(1);
  }
}

run();
