const fs = require('fs');
const path = require('path');

const india = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../src/content/india.json'), 'utf8'));
const rc = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../src/content/rate-card.json'), 'utf8'));
const cor = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../src/content/corridors.json'), 'utf8'));

console.log('--- Checking india.json ---');
console.log('fleetVehicles count:', india.fleetVehicles ? india.fleetVehicles.length : 'MISSING');
if (india.fleetVehicles) {
  india.fleetVehicles.forEach((v, i) => {
    console.log(`${i+1}. ${v.name} | ${v.cabType} | ${v.fuelType} | EV:${v.isElectric} | img:${v.image}`);
  });
}

console.log('\nfleetPresentation.items prices:');
india.fleetPresentation.items.forEach(item => {
  console.log(`- ${item.id}: price=${item.price}`);
});

console.log('pricingSource in fleetPresentation:', 'pricingSource' in india.fleetPresentation ? india.fleetPresentation.pricingSource : 'None (properly removed)');
console.log('priceDisplay in fleetPresentation:', india.fleetPresentation.priceDisplay);
console.log('priceNote in fleetPresentation:', india.fleetPresentation.priceNote);
console.log('sharedNote in fleetPresentation:', india.fleetPresentation.sharedNote);

console.log('\n--- Checking rate-card.json (india) ---');
rc.india.categories.forEach(cat => {
  console.log(`Category: ${cat.id} (${cat.name})`);
  console.log(`  Models: ${cat.models}`);
  console.log(`  Capacity: ${cat.capacity}`);
  console.log(`  Rates:`, JSON.stringify(cat.rates));
});

console.log('\n--- Checking corridors.json (india) ---');
console.log('Note:', cor.india.note);
cor.india.vehicleTiers.forEach(t => {
  console.log(`Tier: ${t.id} (${t.name}) | Models: ${t.models} | Capacity: ${t.capacity} | Hourly: ${t.hourlyRetainer}`);
});
console.log('\nCorridors check (basePrice & priceRange):');
cor.india.corridors.forEach(c => {
  const ranges = Object.entries(c.priceRange).map(([k, v]) => `${k}:${v}`).join(', ');
  console.log(`- ${c.name}: basePrice=${c.basePrice}, ranges=[${ranges}]`);
});
