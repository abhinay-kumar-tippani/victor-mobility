import fs from 'fs';

const content = fs.readFileSync('.next/server/chunks/7472.js', 'utf8');
const pos = 23157;
const snippet = content.substring(Math.max(0, pos - 200), Math.min(content.length, pos + 200));
console.log('Snippet around 23157:\n', snippet);
