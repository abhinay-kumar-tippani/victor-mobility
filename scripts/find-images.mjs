async function test() {
  try {
    const r = await fetch('https://forceurbania.co.in/gallery/', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await r.text();
    const re = /https?:\/\/[^\s"'<>]+\.(?:webp|jpg|jpeg|png)/gi;
    const matches = [...html.matchAll(re)].map(m => m[0]);
    const unique = [...new Set(matches)].filter(u => u.includes('uploads'));
    console.log('Found images count:', unique.length);
    console.log(unique);
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
