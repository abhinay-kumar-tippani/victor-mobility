import fs from 'fs';
import sharp from 'sharp';

async function checkOtherCutouts() {
  for (const name of ['temp_urbania_isnet.png', 'temp_innova1_isnet.png']) {
    const buf = fs.readFileSync(name);
    const img = sharp(buf);
    const meta = await img.metadata();
    const raw = await img.raw().toBuffer({ resolveWithObject: true });
    const data = raw.data;
    
    let transparent = 0;
    let solid = 0;
    let feather = 0;
    
    for (let i = 3; i < data.length; i += 4) {
      const a = data[i];
      if (a === 0) transparent++;
      else if (a >= 250) solid++;
      else feather++;
    }
    const total = meta.width * meta.height;
    console.log(`${name}: ${meta.width}x${meta.height}, transparent: ${(transparent/total*100).toFixed(1)}%, solid: ${(solid/total*100).toFixed(1)}%, feather: ${(feather/total*100).toFixed(1)}%`);
  }
}

checkOtherCutouts();
