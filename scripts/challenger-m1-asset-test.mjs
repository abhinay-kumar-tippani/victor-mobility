/**
 * scripts/challenger-m1-asset-test.mjs
 * 
 * Victor Mobility Milestone 1: Studio Imagery Asset Generation & Pipeline
 * Challenger Empirical Stress Harness & Verification Test Suite
 * 
 * Adversarial assertions:
 * 1. Dataset Integrity & SSoT: All 10 fleet vehicles from src/content/india.json have valid images
 * 2. File Size Boundaries: Strictly > 1,024 bytes (1 KB) and < 204,800 bytes (200 KB)
 * 3. Exact Geometry: WebP format, width === 1200, height === 675, exact 16:9 aspect ratio
 * 4. Bitstream Corruption Probe: Decode full raw uncompressed pixel buffer `sharp(filePath).raw().toBuffer()`
 *    and assert buffer length equals `1200 * 675 * channels`
 * 5. Channel Sanity & Entropy: Compute R, G, B channel variance and dynamic range to ensure no blank/solid dummy files
 * 6. Live HTTP Serving: Probe Next.js HTTP server for all 10 assets to confirm HTTP 200 and Content-Type: image/webp
 */

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const FLEET_DIR = path.join(ROOT_DIR, 'public', 'images', 'fleet');
const INDIA_JSON_PATH = path.join(ROOT_DIR, 'src', 'content', 'india.json');

const EXPECTED_WIDTH = 1200;
const EXPECTED_HEIGHT = 675;
const MIN_SIZE_BYTES = 1024; // 1 KB
const MAX_SIZE_BYTES = 204800; // 200 KB
const MIN_CHANNEL_VARIANCE = 20; // Ensure non-solid color / high entropy
const MIN_DYNAMIC_RANGE = 50; // Max - Min pixel value

const results = [];
let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;

function assert(condition, message, context = {}) {
  totalAssertions++;
  if (!condition) {
    failedAssertions++;
    const err = new Error(`Assertion Failed: ${message}`);
    err.context = context;
    results.push({ passed: false, message, context });
    console.error(`  ❌ [FAIL] ${message}`, context);
    throw err;
  } else {
    passedAssertions++;
    results.push({ passed: true, message });
    console.log(`  ✓ [PASS] ${message}`);
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Check if an HTTP port is open and responding
function checkPortResponding(port) {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port,
      path: '/images/fleet/swift-dzire.webp',
      method: 'HEAD',
      timeout: 1000,
    }, (res) => {
      resolve(true);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

// Fetch asset over HTTP
function fetchAssetHttp(port, assetPath) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port,
      path: assetPath,
      method: 'GET',
      timeout: 5000,
    }, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(chunks),
        });
      });
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${assetPath}`));
    });
    req.end();
  });
}

async function runEmpiricalStressTest() {
  console.log('================================================================================');
  console.log('   CHALLENGER M1: EMPIRICAL STRESS TEST FOR FLEET STUDIO ASSETS');
  console.log('================================================================================\n');

  // ---------------------------------------------------------------------------
  // STEP 1: Verify Dataset SSoT in src/content/india.json
  // ---------------------------------------------------------------------------
  console.log('--- Step 1: Validating Fleet Vehicles SSoT in india.json ---');
  assert(fs.existsSync(INDIA_JSON_PATH), `india.json exists at ${INDIA_JSON_PATH}`);
  const indiaContent = JSON.parse(fs.readFileSync(INDIA_JSON_PATH, 'utf-8'));
  assert(Array.isArray(indiaContent.fleetVehicles), 'india.json contains fleetVehicles array');
  assert(indiaContent.fleetVehicles.length === 10, `fleetVehicles length is exactly 10 (got ${indiaContent.fleetVehicles.length})`);

  const authoritativeAssets = indiaContent.fleetVehicles.map((v) => ({
    id: v.id,
    name: v.name,
    imageRef: v.image,
    filename: path.basename(v.image),
    fullPath: path.join(ROOT_DIR, 'public', v.image.replace(/^\//, '')),
  }));

  // ---------------------------------------------------------------------------
  // STEP 2 & 3 & 4: Deep Bitstream, Dimensional, Size, and Channel Entropy Tests
  // ---------------------------------------------------------------------------
  console.log('\n--- Step 2: Probing Deep Bitstream, Exact 1200x675 Geometry & Size Bounds ---');

  for (const asset of authoritativeAssets) {
    console.log(`\nTesting Asset: ${asset.name} (${asset.filename})`);

    // 2.1 File existence
    assert(fs.existsSync(asset.fullPath), `Asset file exists: ${asset.filename}`);

    // 2.2 File size limits: strictly > 1,024 B and < 204,800 B (200 KB)
    const stat = fs.statSync(asset.fullPath);
    const sizeBytes = stat.size;
    const sizeKb = (sizeBytes / 1024).toFixed(2);
    assert(
      sizeBytes > MIN_SIZE_BYTES && sizeBytes < MAX_SIZE_BYTES,
      `File size is within [${MIN_SIZE_BYTES} B, ${MAX_SIZE_BYTES} B]: got ${sizeBytes} B (${sizeKb} KB)`,
      { sizeBytes, min: MIN_SIZE_BYTES, max: MAX_SIZE_BYTES }
    );

    // 2.3 Format & Dimensions via sharp metadata
    const meta = await sharp(asset.fullPath).metadata();
    assert(meta.format === 'webp', `Format is WebP: got '${meta.format}'`);
    assert(meta.width === EXPECTED_WIDTH, `Width is exactly ${EXPECTED_WIDTH}px: got ${meta.width}`);
    assert(meta.height === EXPECTED_HEIGHT, `Height is exactly ${EXPECTED_HEIGHT}px: got ${meta.height}`);
    assert(
      meta.width * 9 === meta.height * 16,
      `Aspect ratio is strictly 16:9 (${meta.width}:${meta.height})`
    );

    // 2.4 Deep Bitstream Corruption Probe: Full uncompressed raw pixel decompression
    console.log(`  Probing full raw uncompressed bitstream decompression for ${asset.filename}...`);
    const { data: rawBuffer, info: rawInfo } = await sharp(asset.fullPath)
      .raw()
      .toBuffer({ resolveWithObject: true });

    assert(rawInfo.width === EXPECTED_WIDTH, `Decompressed width is ${EXPECTED_WIDTH}`);
    assert(rawInfo.height === EXPECTED_HEIGHT, `Decompressed height is ${EXPECTED_HEIGHT}`);
    assert(
      rawInfo.channels === 3 || rawInfo.channels === 4,
      `Decompressed channels is 3 or 4: got ${rawInfo.channels}`
    );

    const expectedRawByteLength = EXPECTED_WIDTH * EXPECTED_HEIGHT * rawInfo.channels;
    assert(
      rawBuffer.length === expectedRawByteLength,
      `Raw uncompressed pixel buffer matches 1200*675*channels: ${rawBuffer.length} === ${expectedRawByteLength}`
    );

    // 2.5 Channel Sanity & Visual Entropy (Adversarial defense against solid blank dummy images)
    console.log(`  Analyzing channel variance and color entropy for ${asset.filename}...`);
    const channels = rawInfo.channels;
    const totalPixels = EXPECTED_WIDTH * EXPECTED_HEIGHT;

    let sumR = 0, sumG = 0, sumB = 0;
    let sumSqR = 0, sumSqG = 0, sumSqB = 0;
    let minR = 255, maxR = 0;
    let minG = 255, maxG = 0;
    let minB = 255, maxB = 0;

    // Sample distinct colors across sample grid
    const sampledColors = new Set();
    const sampleStep = 10; // sample every 10th pixel for performance

    for (let i = 0; i < rawBuffer.length; i += channels) {
      const r = rawBuffer[i];
      const g = rawBuffer[i + 1];
      const b = rawBuffer[i + 2];

      sumR += r; sumG += g; sumB += b;
      sumSqR += r * r; sumSqG += g * g; sumSqB += b * b;

      if (r < minR) minR = r; if (r > maxR) maxR = r;
      if (g < minG) minG = g; if (g > maxG) maxG = g;
      if (b < minB) minB = b; if (b > maxB) maxB = b;

      if ((i / channels) % sampleStep === 0) {
        sampledColors.add((r << 16) | (g << 8) | b);
      }
    }

    const meanR = sumR / totalPixels;
    const meanG = sumG / totalPixels;
    const meanB = sumB / totalPixels;

    const varR = (sumSqR / totalPixels) - (meanR * meanR);
    const varG = (sumSqG / totalPixels) - (meanG * meanG);
    const varB = (sumSqB / totalPixels) - (meanB * meanB);

    const rangeR = maxR - minR;
    const rangeG = maxG - minG;
    const rangeB = maxB - minB;

    console.log(`    RGB Means: [${meanR.toFixed(1)}, ${meanG.toFixed(1)}, ${meanB.toFixed(1)}]`);
    console.log(`    RGB Variances: [${varR.toFixed(1)}, ${varG.toFixed(1)}, ${varB.toFixed(1)}]`);
    console.log(`    RGB Dynamic Ranges: [${rangeR}, ${rangeG}, ${rangeB}]`);
    console.log(`    Distinct sampled colors: ${sampledColors.size}`);

    assert(
      varR > MIN_CHANNEL_VARIANCE && varG > MIN_CHANNEL_VARIANCE && varB > MIN_CHANNEL_VARIANCE,
      `Channel variances strictly exceed threshold (${MIN_CHANNEL_VARIANCE}): R=${varR.toFixed(1)}, G=${varG.toFixed(1)}, B=${varB.toFixed(1)}`
    );

    assert(
      rangeR > MIN_DYNAMIC_RANGE && rangeG > MIN_DYNAMIC_RANGE && rangeB > MIN_DYNAMIC_RANGE,
      `Channel dynamic ranges strictly exceed threshold (${MIN_DYNAMIC_RANGE}): R=${rangeR}, G=${rangeG}, B=${rangeB}`
    );

    assert(
      sampledColors.size > 500,
      `Visual entropy test: sampled distinct color count > 500 (got ${sampledColors.size})`
    );
  }

  // ---------------------------------------------------------------------------
  // STEP 3: HTTP Serving Verification against Next.js Local Server
  // ---------------------------------------------------------------------------
  console.log('\n--- Step 3: Probing Live Next.js Server HTTP 200 & Content-Type ---');

  let testPort = 3000;
  let serverProcess = null;

  // Check if port 3000 is responding, or port 3008
  const is3000Active = await checkPortResponding(3000);
  if (is3000Active) {
    console.log('Detected active Next.js server on port 3000.');
    testPort = 3000;
  } else {
    // Start Next.js server on dedicated test port 3008
    testPort = 3008;
    console.log(`Starting Next.js server on port ${testPort} for HTTP probe...`);
    serverProcess = spawn(
      process.execPath,
      [path.join(ROOT_DIR, 'node_modules', 'next', 'dist', 'bin', 'next'), 'start', '-p', String(testPort)],
      { cwd: ROOT_DIR, stdio: ['ignore', 'pipe', 'pipe'] }
    );

    serverProcess.stdout.on('data', (d) => {
      const msg = d.toString();
      if (msg.includes('Ready') || msg.includes('started')) {
        // console.log(`[Next.js Server] ${msg.trim()}`);
      }
    });

    serverProcess.stderr.on('data', (d) => {
      // console.error(`[Next.js Server Error] ${d.toString().trim()}`);
    });

    // Wait up to 15 seconds for server to respond
    let ready = false;
    for (let attempts = 0; attempts < 30; attempts++) {
      await sleep(500);
      ready = await checkPortResponding(testPort);
      if (ready) break;
    }

    if (!ready) {
      if (serverProcess) serverProcess.kill();
      throw new Error(`Next.js server failed to respond on port ${testPort} within 15s`);
    }
    console.log(`Next.js server ready and listening on port ${testPort}.`);
  }

  try {
    for (const asset of authoritativeAssets) {
      console.log(`Probing HTTP delivery for ${asset.imageRef}...`);
      const res = await fetchAssetHttp(testPort, asset.imageRef);

      assert(res.statusCode === 200, `HTTP status is 200: got ${res.statusCode} for ${asset.imageRef}`);

      const contentType = res.headers['content-type'] || '';
      assert(
        contentType.includes('image/webp'),
        `Content-Type header is image/webp: got '${contentType}' for ${asset.imageRef}`
      );

      assert(
        res.body.length > MIN_SIZE_BYTES && res.body.length < MAX_SIZE_BYTES,
        `Served HTTP body size is valid: ${res.body.length} bytes for ${asset.imageRef}`
      );

      // Verify that the served HTTP body parses cleanly through Sharp
      const httpMeta = await sharp(res.body).metadata();
      assert(httpMeta.format === 'webp', `Served body is valid WebP for ${asset.imageRef}`);
      assert(
        httpMeta.width === EXPECTED_WIDTH && httpMeta.height === EXPECTED_HEIGHT,
        `Served body dimensions match 1200x675 for ${asset.imageRef}`
      );
    }
  } finally {
    if (serverProcess) {
      console.log('\nTearing down temporary Next.js server...');
      serverProcess.kill();
    }
  }

  // ---------------------------------------------------------------------------
  // SUMMARY AND VERDICT
  // ---------------------------------------------------------------------------
  console.log('\n================================================================================');
  console.log('   CHALLENGER STRESS HARNESS SUMMARY');
  console.log('================================================================================');
  console.log(`Total Assertions: ${totalAssertions}`);
  console.log(`Passed:           ${passedAssertions}`);
  console.log(`Failed:           ${failedAssertions}`);

  if (failedAssertions === 0) {
    console.log('\nVERDICT: CONFIRM_CORRECTNESS (100% PASS across all adversarial stress tests)');
    process.exit(0);
  } else {
    console.error(`\nVERDICT: REJECT (${failedAssertions} assertions failed)`);
    process.exit(1);
  }
}

runEmpiricalStressTest().catch((err) => {
  console.error('\nFATAL TEST EXECUTION ERROR:', err);
  process.exit(1);
});
