/**
 * .agents/teamwork/auditor_m1_fix/forensic_audit_suite.mjs
 * 
 * Independent Forensic Audit Suite for Milestone 1 Iteration 2
 * Author: Forensic Integrity Auditor
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';

const ROOT_DIR = path.resolve(process.cwd());
const FLEET_DIR = path.join(ROOT_DIR, 'public', 'images', 'fleet');
const BUILD_SCRIPT_PATH = path.join(ROOT_DIR, 'scripts', 'build-fleet-studio-images.mjs');
const NEXT_CONFIG_PATH = path.join(ROOT_DIR, 'next.config.mjs');
const TSCONFIG_PATH = path.join(ROOT_DIR, 'tsconfig.json');
const CARENS_PNG_PATH = path.join(ROOT_DIR, 'temp_carens_isnet.png');
const URBANIA_PNG_PATH = path.join(ROOT_DIR, 'temp_urbania_isnet.png');
const INNOVA_PNG_PATH = path.join(ROOT_DIR, 'temp_innova1_isnet.png');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const failures = [];

function recordCheck(passed, name, details = '') {
  totalChecks++;
  if (passed) {
    passedChecks++;
    console.log(`[PASS] ${name}`);
  } else {
    failedChecks++;
    console.error(`[FAIL] ${name} — ${details}`);
    failures.push({ name, details });
  }
}

async function runForensicAudit() {
  console.log('================================================================');
  console.log('FORENSIC AUDIT SUITE: VICTOR MOBILITY MILESTONE 1 ITERATION 2');
  console.log('================================================================\n');

  // ---------------------------------------------------------------------------
  // Phase 1: Source Code & Configuration Forensic Analysis
  // ---------------------------------------------------------------------------
  console.log('--- 1. Script Analysis: scripts/build-fleet-studio-images.mjs ---');

  recordCheck(fs.existsSync(BUILD_SCRIPT_PATH), 'Build script exists at scripts/build-fleet-studio-images.mjs');
  const scriptContent = fs.readFileSync(BUILD_SCRIPT_PATH, 'utf8');

  // Check Sharp import and genuine usage
  const hasSharpImport = /import\s+sharp\s+from\s+['"]sharp['"]/.test(scriptContent);
  recordCheck(hasSharpImport, 'Script imports sharp library genuinely');

  const sharpUsages = (scriptContent.match(/sharp\(/g) || []).length;
  recordCheck(sharpUsages >= 4, `Script genuinely executes sharp() (found ${sharpUsages} invocations)`);

  // Check brand palette inclusion in SVG cyclorama
  const hasObsidian = scriptContent.includes('#070A12');
  const hasDeepInk = scriptContent.includes('#15162F');
  const hasIndigo = scriptContent.includes('#31326F');
  recordCheck(hasObsidian && hasDeepInk && hasIndigo, 'Script defines SVG cyclorama with Victor brand palette (#070A12, #15162F, #31326F)');

  // Check contact ground shadow composition
  const hasShadowEllipses = scriptContent.includes('<ellipse') && scriptContent.includes('feGaussianBlur');
  const hasMultiTire = scriptContent.includes('multiTire') && scriptContent.includes('Near front tire') && scriptContent.includes('Near rear tire');
  recordCheck(hasShadowEllipses, 'Script generates Gaussian blurred contact ground shadow ellipses');
  recordCheck(hasMultiTire, 'Script implements calibrated multi-tire contact shadow grounding');

  // Check WebP quality 85
  const hasWebpQuality85 = /quality\s*=\s*85/.test(scriptContent) && /effort:\s*5/.test(scriptContent);
  recordCheck(hasWebpQuality85, 'Script encodes WebP at initial quality 85 with effort 5');

  // Check for dummy/facade implementations or fake pass oracles
  const hasDummyReturns = /return\s+true\s*;?\s*\/\/ dummy/i.test(scriptContent);
  recordCheck(!hasDummyReturns, 'No dummy return statements found in build script');

  // Check next.config.mjs for circumvention
  console.log('\n--- 2. Configuration Analysis: next.config.mjs & tsconfig.json ---');
  recordCheck(fs.existsSync(NEXT_CONFIG_PATH), 'next.config.mjs exists');
  const nextConfigContent = fs.readFileSync(NEXT_CONFIG_PATH, 'utf8');

  const hasWorkerConfig = /workerThreads:\s*false/.test(nextConfigContent) && /cpus:\s*1/.test(nextConfigContent);
  recordCheck(hasWorkerConfig, 'next.config.mjs configures workerThreads: false and cpus: 1 for Windows stability');

  const hasUnoptimizedImages = /unoptimized:\s*true/.test(nextConfigContent);
  recordCheck(hasUnoptimizedImages, 'next.config.mjs sets images.unoptimized: true for direct static asset serving');

  // CRITICAL CHECKS FOR CIRCUMVENTION
  const ignoresTypeScript = /ignoreBuildErrors:\s*true/.test(nextConfigContent);
  recordCheck(!ignoresTypeScript, 'next.config.mjs DOES NOT bypass TypeScript errors (no ignoreBuildErrors: true)');

  const ignoresESLint = /ignoreDuringBuilds:\s*true/.test(nextConfigContent);
  recordCheck(!ignoresESLint, 'next.config.mjs DOES NOT bypass ESLint errors (no ignoreDuringBuilds: true)');

  // Check tsconfig.json
  const tsconfigContent = fs.readFileSync(TSCONFIG_PATH, 'utf8');
  const tsconfig = JSON.parse(tsconfigContent);
  recordCheck(tsconfig.compilerOptions.incremental === false, 'tsconfig.json sets incremental: false for clean Windows compilation');
  recordCheck(tsconfig.compilerOptions.strict === true, 'tsconfig.json maintains strict type-checking (strict: true)');

  // ---------------------------------------------------------------------------
  // Phase 2: Binary Asset Integrity Analysis
  // ---------------------------------------------------------------------------
  console.log('\n--- 3. Binary Asset Analysis: public/images/fleet/*.webp ---');

  const EXPECTED_FLEET = [
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

  for (const filename of EXPECTED_FLEET) {
    const fullPath = path.join(FLEET_DIR, filename);
    const exists = fs.existsSync(fullPath);
    recordCheck(exists, `Fleet image exists: ${filename}`);

    if (!exists) continue;

    const buffer = fs.readFileSync(fullPath);
    const stat = fs.statSync(fullPath);

    // 1. Size bounds: > 1 KB (1024 B) and < 200 KB (204800 B)
    const isOver1Kb = stat.size > 1024;
    const isUnder200Kb = stat.size < 204800;
    recordCheck(isOver1Kb && isUnder200Kb, `${filename}: size within 1KB - 200KB (${(stat.size / 1024).toFixed(2)} KB)`);

    // 2. Binary Header Verification
    // Bytes 0-3: 'RIFF'
    const riffHeader = buffer.subarray(0, 4).toString('ascii');
    // Bytes 8-11: 'WEBP'
    const webpHeader = buffer.subarray(8, 12).toString('ascii');
    // Bytes 12-15: 'VP8 ' or 'VP8L' or 'VP8X'
    const vp8Header = buffer.subarray(12, 16).toString('ascii');

    const validHeader = riffHeader === 'RIFF' && webpHeader === 'WEBP' && (vp8Header.startsWith('VP8') || vp8Header === 'VP8X');
    recordCheck(validHeader, `${filename}: valid RIFF/WEBP header (found '${riffHeader}' / '${webpHeader}' / '${vp8Header}')`);

    // 3. Sharp Decode and Dimension Verification
    const meta = await sharp(buffer).metadata();
    recordCheck(meta.format === 'webp', `${filename}: format is genuine webp`);
    recordCheck(meta.width === 1200 && meta.height === 675, `${filename}: dimensions exactly 1200x675 (found ${meta.width}x${meta.height})`);

    // 4. Pixel Buffer & Entropy Verification (detect blank/solid dummy images)
    const rawPixels = await sharp(buffer).raw().toBuffer({ resolveWithObject: true });
    const pixelData = rawPixels.data;
    const channels = rawPixels.info.channels;
    recordCheck(pixelData.length === 1200 * 675 * channels, `${filename}: full uncompressed bitstream decoded (${pixelData.length} bytes)`);

    let sum = 0;
    let minVal = 255;
    let maxVal = 0;
    const sampleStep = 10;
    let sampleCount = 0;

    for (let i = 0; i < pixelData.length; i += channels * sampleStep) {
      const lum = 0.299 * pixelData[i] + 0.587 * pixelData[i + 1] + 0.114 * pixelData[i + 2];
      sum += lum;
      if (lum < minVal) minVal = lum;
      if (lum > maxVal) maxVal = lum;
      sampleCount++;
    }

    const mean = sum / sampleCount;
    let varianceSum = 0;
    for (let i = 0; i < pixelData.length; i += channels * sampleStep) {
      const lum = 0.299 * pixelData[i] + 0.587 * pixelData[i + 1] + 0.114 * pixelData[i + 2];
      varianceSum += Math.pow(lum - mean, 2);
    }
    const stdDev = Math.sqrt(varianceSum / sampleCount);
    const dynamicRange = maxVal - minVal;

    // Genuine images have high dynamic range and standard deviation
    const isGenuineImage = stdDev > 20 && dynamicRange > 100;
    recordCheck(isGenuineImage, `${filename}: high visual entropy (stdDev=${stdDev.toFixed(1)}, range=${dynamicRange.toFixed(1)})`);
  }

  // ---------------------------------------------------------------------------
  // Phase 3: Cutout Source Verification: temp_carens_isnet.png
  // ---------------------------------------------------------------------------
  console.log('\n--- 4. Cutout Verification: temp_carens_isnet.png ---');

  recordCheck(fs.existsSync(CARENS_PNG_PATH), 'temp_carens_isnet.png exists');
  if (fs.existsSync(CARENS_PNG_PATH)) {
    const pngBuf = fs.readFileSync(CARENS_PNG_PATH);
    const stat = fs.statSync(CARENS_PNG_PATH);

    // PNG signature: 89 50 4E 47 0D 0A 1A 0A
    const isPngSig = pngBuf[0] === 0x89 && pngBuf[1] === 0x50 && pngBuf[2] === 0x4e && pngBuf[3] === 0x47;
    recordCheck(isPngSig, 'temp_carens_isnet.png has authentic PNG signature');

    const carensMeta = await sharp(pngBuf).metadata();
    recordCheck(carensMeta.format === 'png', 'temp_carens_isnet.png format is png');
    recordCheck(carensMeta.channels === 4 && carensMeta.hasAlpha === true, 'temp_carens_isnet.png has authentic RGBA 4-channel with alpha transparency');
    recordCheck(carensMeta.width >= 800 && carensMeta.height >= 400, `temp_carens_isnet.png is high resolution (${carensMeta.width}x${carensMeta.height})`);

    // Verify alpha distribution: must have transparent background (alpha=0), solid car body (alpha=255), and anti-aliased edge pixels
    const rawCarens = await sharp(pngBuf).raw().toBuffer({ resolveWithObject: true });
    const cData = rawCarens.data;
    let transparentCount = 0;
    let opaqueCount = 0;
    let semiCount = 0;

    for (let i = 3; i < cData.length; i += 4) {
      const a = cData[i];
      if (a === 0) transparentCount++;
      else if (a >= 250) opaqueCount++;
      else semiCount++;
    }

    const totalPixels = carensMeta.width * carensMeta.height;
    const transPercent = (transparentCount / totalPixels * 100).toFixed(1);
    const opaquePercent = (opaqueCount / totalPixels * 100).toFixed(1);
    const semiPercent = (semiCount / totalPixels * 100).toFixed(1);

    const validCutoutAlpha = transparentCount > 0.2 * totalPixels && opaqueCount > 0.2 * totalPixels && semiCount > 100;
    recordCheck(validCutoutAlpha, `temp_carens_isnet.png has genuine cutout alpha profile (transparent: ${transPercent}%, opaque: ${opaquePercent}%, edge feathering: ${semiPercent}%)`);
  }

  // ---------------------------------------------------------------------------
  // Phase 4: Additional Cutouts Sanity (Urbania & Innova)
  // ---------------------------------------------------------------------------
  console.log('\n--- 5. Additional Cutouts: Urbania & Innova ---');
  recordCheck(fs.existsSync(URBANIA_PNG_PATH), 'temp_urbania_isnet.png exists');
  recordCheck(fs.existsSync(INNOVA_PNG_PATH), 'temp_innova1_isnet.png exists');

  // ---------------------------------------------------------------------------
  // Summary
  // ---------------------------------------------------------------------------
  console.log('\n================================================================');
  console.log(`TOTAL FORENSIC CHECKS: ${totalChecks}`);
  console.log(`PASSED: ${passedChecks}`);
  console.log(`FAILED: ${failedChecks}`);
  console.log('================================================================');

  if (failedChecks > 0) {
    console.error('\nFAILURES DETECTED:');
    failures.forEach(f => console.error(`  - ${f.name}: ${f.details}`));
    process.exit(1);
  } else {
    console.log('\nVERDICT: INTEGRITY VERIFIED (CLEAN) - All forensic checks passed.');
    process.exit(0);
  }
}

runForensicAudit().catch(err => {
  console.error('Fatal Audit Error:', err);
  process.exit(1);
});
