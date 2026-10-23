/**
 * scripts/adversarial-challenger-m1-2.mjs
 * 
 * Adversarial Challenge Suite for Milestone 1: Studio Imagery Asset Generation & Pipeline
 * Author: Challenger M1_2 (EMPIRICAL CHALLENGER)
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';

const ROOT_DIR = process.cwd();
const FLEET_DIR = path.join(ROOT_DIR, 'public', 'images', 'fleet');
const INDIA_JSON_PATH = path.join(ROOT_DIR, 'src', 'content', 'india.json');
const SHUTTLE_PATH = path.join(ROOT_DIR, 'public', 'images', 'india', 'employee-shuttle.png');

async function runAdversarialChallenge() {
  console.log('================================================================');
  console.log('CHALLENGER M1_2: ADVERSARIAL VERIFICATION & STRESS SUITE');
  console.log('================================================================\n');

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  const findings = [];

  function assert(condition, testName, failureDetail = '') {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`  ✓ [PASS] ${testName}`);
    } else {
      failedTests++;
      console.log(`  ✗ [FAIL] ${testName} - ${failureDetail}`);
      findings.push({ testName, failureDetail });
    }
  }

  // ---------------------------------------------------------------------------
  // SECTION 1: Single Source of Truth (SOT) and Fleet Parity (Task 4)
  // ---------------------------------------------------------------------------
  console.log('--- SECTION 1: SOT & Fleet Parity (india.json vs public/images/fleet/) ---');

  const indiaData = JSON.parse(fs.readFileSync(INDIA_JSON_PATH, 'utf8'));
  const fleetVehicles = indiaData.fleetVehicles;

  assert(Array.isArray(fleetVehicles), 'india.json contains fleetVehicles array');
  assert(fleetVehicles.length === 10, 'fleetVehicles contains exactly 10 vehicles', `Found ${fleetVehicles.length}`);

  const diskFiles = fs.readdirSync(FLEET_DIR).filter(f => f.endsWith('.webp'));
  assert(diskFiles.length === 10, 'public/images/fleet/ contains exactly 10 WebP files', `Found ${diskFiles.length}`);

  const expectedFilenames = [
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

  for (const exp of expectedFilenames) {
    const exists = diskFiles.includes(exp);
    assert(exists, `Expected file exists on disk: ${exp}`);
  }

  for (const vehicle of fleetVehicles) {
    const filename = path.basename(vehicle.image);
    const fullPath = path.join(FLEET_DIR, filename);
    const fileExists = fs.existsSync(fullPath);
    assert(fileExists, `Vehicle ${vehicle.name} (${vehicle.id}) image exists on disk: ${vehicle.image}`);

    if (fileExists) {
      const stat = fs.statSync(fullPath);
      const meta = await sharp(fullPath).metadata();
      assert(meta.format === 'webp', `Vehicle ${vehicle.name} format is webp (is ${meta.format})`);
      assert(meta.width === 1200 && meta.height === 675, `Vehicle ${vehicle.name} dimensions 1200x675 (is ${meta.width}x${meta.height})`);
      assert(stat.size < 200 * 1024, `Vehicle ${vehicle.name} size < 200 KB (is ${(stat.size / 1024).toFixed(1)} KB)`);
      assert(stat.size > 1024, `Vehicle ${vehicle.name} size > 1 KB (is ${stat.size} bytes)`);
    }
  }

  // ---------------------------------------------------------------------------
  // SECTION 2: Force Urbania Model & Silhouette Analysis (Task 1)
  // ---------------------------------------------------------------------------
  console.log('\n--- SECTION 2: Force Urbania Silhouette & Integrity (Task 1) ---');

  const urbaniaPath = path.join(FLEET_DIR, 'force-urbania.webp');
  const urbaniaExists = fs.existsSync(urbaniaPath);
  assert(urbaniaExists, 'force-urbania.webp exists');

  if (urbaniaExists && fs.existsSync(SHUTTLE_PATH)) {
    const urbaniaBuf = fs.readFileSync(urbaniaPath);
    const shuttleBuf = fs.readFileSync(SHUTTLE_PATH);
    const urbaniaHash = crypto.createHash('sha256').update(urbaniaBuf).digest('hex');
    const shuttleHash = crypto.createHash('sha256').update(shuttleBuf).digest('hex');
    assert(urbaniaHash !== shuttleHash, 'force-urbania.webp is NOT employee-shuttle.png (hash divergence confirmed)');

    const shuttleMeta = await sharp(SHUTTLE_PATH).metadata();
    assert(shuttleMeta.width !== 1200 || shuttleMeta.format !== 'webp', 'employee-shuttle.png is distinct format/dimensions from force-urbania.webp');
  }

  // Inspect cutout source temp_urbania_isnet.png
  const urbaniaCutout = path.join(ROOT_DIR, 'temp_urbania_isnet.png');
  assert(fs.existsSync(urbaniaCutout), 'Urbania cutout source temp_urbania_isnet.png exists');

  // ---------------------------------------------------------------------------
  // SECTION 3: EV Front Fascia & Badging Verification (Task 2)
  // ---------------------------------------------------------------------------
  console.log('\n--- SECTION 3: EV Styling & Front Fascia (Task 2) ---');

  // Tata Tigor EV
  const tigorPath = path.join(FLEET_DIR, 'tata-tigor-ev.webp');
  assert(fs.existsSync(tigorPath), 'tata-tigor-ev.webp exists');

  // Kia Carens Clavis EV
  const carensPath = path.join(FLEET_DIR, 'kia-carens-clavis-ev.webp');
  assert(fs.existsSync(carensPath), 'kia-carens-clavis-ev.webp exists');

  const carensCutout = path.join(ROOT_DIR, 'temp_carens_isnet.png');
  assert(fs.existsSync(carensCutout), 'Kia Carens cutout temp_carens_isnet.png exists');

  // ---------------------------------------------------------------------------
  // SECTION 4: Elimination of Casual Street Snapshots (Task 3)
  // ---------------------------------------------------------------------------
  console.log('\n--- SECTION 4: Casual Street Snapshot Elimination (Task 3) ---');

  const innovaPath = path.join(FLEET_DIR, 'innova-crysta.webp');
  assert(fs.existsSync(innovaPath), 'innova-crysta.webp exists');

  const marazzoPath = path.join(FLEET_DIR, 'mahindra-marazzo.webp');
  assert(fs.existsSync(marazzoPath), 'mahindra-marazzo.webp exists');

  // ---------------------------------------------------------------------------
  // Summary
  // ---------------------------------------------------------------------------
  console.log('\n================================================================');
  console.log(`TOTAL TESTS: ${totalTests}`);
  console.log(`PASSED: ${passedTests}`);
  console.log(`FAILED: ${failedTests}`);
  console.log('================================================================');

  if (failedTests > 0) {
    console.log('\nFailed Tests:');
    findings.forEach(f => console.log(`  - ${f.testName}: ${f.failureDetail}`));
    process.exit(1);
  } else {
    console.log('\nAll programmatic assertions passed successfully!');
    process.exit(0);
  }
}

runAdversarialChallenge().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
