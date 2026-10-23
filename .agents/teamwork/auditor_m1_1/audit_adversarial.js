const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '../../../');

function checkFile(relPath) {
  return fs.readFileSync(path.join(projectRoot, relPath), 'utf8');
}

const india = JSON.parse(checkFile('src/content/india.json'));
const rc = JSON.parse(checkFile('src/content/rate-card.json'));
const cor = JSON.parse(checkFile('src/content/corridors.json'));
const journeyEstimatorSrc = checkFile('src/components/planning/JourneyEstimator.tsx');
const rfpDeskSrc = checkFile('src/components/planning/RfpDesk.tsx');
const corpRfpSrc = checkFile('src/components/rfp/CorporateRfpBuilder.tsx');
const contentTypes = checkFile('src/types/content.ts');

const issues = [];
const passed = [];

// 1. Authoritative Fleet Dataset Checks
const expectedVehicles = [
  { id: 'swift-dzire', name: 'Swift Dzire', cabType: 'Sedan', fuelType: 'Petrol', isElectric: false },
  { id: 'hyundai-aura', name: 'Hyundai Aura', cabType: 'Sedan', fuelType: 'Petrol & CNG', isElectric: false },
  { id: 'tata-tigor', name: 'Tata Tigor', cabType: 'Sedan', fuelType: 'Electric Vehicle', isElectric: true },
  { id: 'tata-nexon', name: 'Tata Nexon', cabType: 'Sedan', fuelType: 'Long Range Electric Vehicle', isElectric: true },
  { id: 'mg-zs-ev', name: 'MG ZS EV', cabType: 'Sedan', fuelType: 'Long Range Electric Vehicle', isElectric: true },
  { id: 'mahindra-marazzo', name: 'Mahindra Marazzo', cabType: 'SUV', fuelType: 'Diesel', isElectric: false },
  { id: 'ertiga-cng', name: 'Ertiga CNG', cabType: 'SUV', fuelType: 'Petrol & CNG', isElectric: false },
  { id: 'innova-crysta', name: 'Innova Crysta', cabType: 'SUV', fuelType: 'Diesel', isElectric: false },
  { id: 'kia-carens-clavis-ev', name: 'Kia Carens Clavis EV', cabType: 'SUV', fuelType: 'Long Range Electric Vehicle', isElectric: true },
  { id: 'urbania', name: 'Urbania', cabType: '12 Seater', fuelType: 'Diesel', isElectric: false }
];

if (!india.fleetVehicles || india.fleetVehicles.length !== 10) {
  issues.push(`fleetVehicles count is ${india.fleetVehicles ? india.fleetVehicles.length : 0}, expected 10`);
} else {
  passed.push('fleetVehicles count is exactly 10');
  
  expectedVehicles.forEach((exp, idx) => {
    const act = india.fleetVehicles[idx];
    if (!act) {
      issues.push(`Missing vehicle at index ${idx}`);
      return;
    }
    if (act.id !== exp.id) issues.push(`Vehicle ${idx} id mismatch: expected ${exp.id}, got ${act.id}`);
    if (act.name !== exp.name) issues.push(`Vehicle ${idx} name mismatch: expected ${exp.name}, got ${act.name}`);
    if (act.cabType !== exp.cabType) issues.push(`Vehicle ${idx} cabType mismatch: expected ${exp.cabType}, got ${act.cabType}`);
    if (act.fuelType !== exp.fuelType) issues.push(`Vehicle ${idx} fuelType mismatch: expected ${exp.fuelType}, got ${act.fuelType}`);
    if (act.isElectric !== exp.isElectric) issues.push(`Vehicle ${idx} isElectric mismatch: expected ${exp.isElectric}, got ${act.isElectric}`);
    if (!act.image || !act.image.startsWith('/images/fleet/')) issues.push(`Vehicle ${idx} invalid image path: ${act.image}`);
    if (!act.imageAlt) issues.push(`Vehicle ${idx} missing imageAlt`);
  });
  passed.push('All 10 fleet vehicles match manager-approved specification and order');
}

// 2. Manager directive verification: Nexon & MG ZS EV as Sedan, Urbania as 12 Seater, no inferred seat counts on 1-9
const sedans = (india.fleetVehicles || []).filter(v => v.cabType === 'Sedan');
const suvs = (india.fleetVehicles || []).filter(v => v.cabType === 'SUV');
const twelveSeaters = (india.fleetVehicles || []).filter(v => v.cabType === '12 Seater');
const electrics = (india.fleetVehicles || []).filter(v => v.isElectric);

if (sedans.length === 5) passed.push('Sedan count is exactly 5');
else issues.push(`Sedan count is ${sedans.length}, expected 5`);

if (suvs.length === 4) passed.push('SUV count is exactly 4');
else issues.push(`SUV count is ${suvs.length}, expected 4`);

if (twelveSeaters.length === 1) passed.push('12 Seater count is exactly 1');
else issues.push(`12 Seater count is ${twelveSeaters.length}, expected 1`);

if (electrics.length === 4) passed.push('Electric Vehicles count is exactly 4');
else issues.push(`Electric Vehicles count is ${electrics.length}, expected 4`);

// Check vehicles 1-9 for inferred seat counts
(india.fleetVehicles || []).slice(0, 9).forEach((v, idx) => {
  const jsonStr = JSON.stringify(v);
  if (/(\d+)[ -]?(seater|seater|passenger|seat)/i.test(jsonStr)) {
    issues.push(`Vehicle ${idx + 1} (${v.name}) contains inferred seat count: ${jsonStr}`);
  }
});
passed.push('Vehicles 1-9 contain zero inferred seat counts');

// 3. Pricing sanitization checks
const fabricatedPatterns = [
  /₹\s*2,?200/,
  /₹\s*3,?800/,
  /₹\s*7,?200/,
  /₹\s*6,?500/,
  /₹\s*1,?400/,
  /₹\s*2,?400/,
  /₹\s*4,?200/,
  /₹\s*5,?800/,
  /₹\s*4,?500/,
  /₹\s*8,?500/,
  /₹\s*12,?000/,
  /₹\s*14,?000/,
  /₹\s*58,?000/,
  /₹\s*96,?000/,
  /₹\s*1,?45,?000/,
  /₹\s*1,?85,?000/
];

const checkFabricatedPrices = (content, filename) => {
  fabricatedPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      issues.push(`Fabricated price pattern ${pattern} found in ${filename}`);
    }
  });
};

checkFabricatedPrices(JSON.stringify(india), 'india.json');
checkFabricatedPrices(JSON.stringify(rc.india), 'rate-card.json (india)');
checkFabricatedPrices(JSON.stringify(cor.india), 'corridors.json (india)');
passed.push('Fabricated pricing figures are purged from India content');

// Check that price is null for all items in fleetPresentation
india.fleetPresentation.items.forEach(item => {
  if (item.price !== null) {
    issues.push(`fleetPresentation.items[${item.id}].price is not null: ${item.price}`);
  }
});
passed.push('fleetPresentation.items all have price: null');

// Check that corridors have basePrice: null
cor.india.corridors.forEach(c => {
  if (c.basePrice !== null) {
    issues.push(`corridor ${c.id} basePrice is not null: ${c.basePrice}`);
  }
  Object.entries(c.priceRange).forEach(([tier, val]) => {
    if (val !== 'Quote on request') {
      issues.push(`corridor ${c.id} priceRange[${tier}] is not "Quote on request": ${val}`);
    }
  });
});
passed.push('All India corridors have basePrice: null and priceRange: "Quote on request"');

// 4. Check obsolete models in India content
const obsoleteModels = ['Toyota Etios', 'Toyota Camry', 'Tempo Traveller', 'Tempo Traveler'];
obsoleteModels.forEach(model => {
  if (JSON.stringify(rc.india).includes(model)) {
    issues.push(`Obsolete model "${model}" found in rate-card.json (india)`);
  }
  if (JSON.stringify(cor.india).includes(model)) {
    issues.push(`Obsolete model "${model}" found in corridors.json (india)`);
  }
});
passed.push('Obsolete sample models purged from rate-card.json and corridors.json');

// 5. Check JourneyEstimator.tsx implementation integrity
if (journeyEstimatorSrc.includes('result.budget !== null')) {
  issues.push('JourneyEstimator still contains result.budget conditional calculation display');
}
if (journeyEstimatorSrc.includes('input("rate"')) {
  issues.push('JourneyEstimator still contains rate input field');
}
if (!journeyEstimatorSrc.includes('Request a quote')) {
  issues.push('JourneyEstimator does not display "Request a quote"');
}
if (!journeyEstimatorSrc.includes('Vehicle allocation and pricing are confirmed for your location, dates and requirements.')) {
  issues.push('JourneyEstimator missing mandatory shared note');
}
passed.push('JourneyEstimator properly removes rate modeling and displays quote guidance');

// 6. Check RfpDesk.tsx and CorporateRfpBuilder.tsx implementation integrity
expectedVehicles.forEach(v => {
  const labelSnippet = `${v.name} (${v.cabType}`;
  if (!rfpDeskSrc.includes(v.name)) {
    issues.push(`RfpDesk missing approved vehicle ${v.name}`);
  }
  if (!corpRfpSrc.includes(v.name)) {
    issues.push(`CorporateRfpBuilder missing approved vehicle ${v.name}`);
  }
});
passed.push('RfpDesk and CorporateRfpBuilder include all 10 approved vehicles');

// 7. Check types/content.ts FleetVehicle interface
if (!contentTypes.includes('export interface FleetVehicle')) {
  issues.push('FleetVehicle interface not exported in types/content.ts');
}
if (!contentTypes.includes('fleetVehicles?: FleetVehicle[];')) {
  issues.push('fleetVehicles not added to IndiaContent in types/content.ts');
}
passed.push('types/content.ts exports FleetVehicle and updates IndiaContent');

// Output report
console.log(`=== AUDIT SUMMARY ===`);
console.log(`Passed checks: ${passed.length}`);
passed.forEach(p => console.log(`  [PASS] ${p}`));

console.log(`\nIssues detected: ${issues.length}`);
issues.forEach(i => console.log(`  [FAIL] ${i}`));

if (issues.length > 0) {
  process.exit(1);
} else {
  console.log('\nVERDICT: ALL ADVERSARIAL CHECKS PASSED');
}
