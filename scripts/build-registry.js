import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
const rDir = path.join(publicDir, 'r');

// Read all JSON files from public/r/
const files = fs.readdirSync(rDir).filter(f => f.endsWith('.json'));

files.forEach(file => {
  const filePath = path.join(rDir, file);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Remove content property from files array
  if (content.files && Array.isArray(content.files)) {
    content.files = content.files.map(f => {
      const { content, ...rest } = f;
      return rest;
    });
  }

  // Write to public root (flat structure)
  const destPath = path.join(publicDir, file);
  fs.writeFileSync(destPath, JSON.stringify(content, null, 2));
  console.log(`Processed: ${file}`);
});

// Copy registry.json to public root
const registryPath = path.join(__dirname, '..', 'registry.json');
const registryDest = path.join(publicDir, 'registry.json');
fs.copyFileSync(registryPath, registryDest);
console.log('Copied: registry.json');

console.log('\nRegistry build complete!');
console.log(`Files are now at /[component].json (flat structure)`);
