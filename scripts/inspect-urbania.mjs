import sharp from 'sharp';

async function inspect() {
  const meta = await sharp('temp_urbania_banner.webp').metadata();
  console.log('Metadata:', meta);
  // Let's sample a few pixels or see if the background is transparent
  const stats = await sharp('temp_urbania_banner.webp').stats();
  console.log('Channels stats:', stats.channels.map(c => ({ min: c.min, max: c.max, mean: c.mean })));
}

inspect();
