import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
const rDir = path.join(publicDir, 'r');

function stripContent(srcDir, destDir) {
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.json'));
  files.forEach(file => {
    const filePath = path.join(srcDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (content.files && Array.isArray(content.files)) {
      content.files = content.files.map(f => {
        const { content, ...rest } = f;
        return rest;
      });
    }
    const destPath = path.join(destDir, file);
    fs.writeFileSync(destPath, JSON.stringify(content, null, 2));
    console.log(`Processed: ${path.relative(publicDir, destPath)}`);
  });
}

// Process React registry files: public/r/*.json → public/*.json
stripContent(rDir, publicDir);

// Process Vue registry files: public/r/vue/*.json → public/vue/*.json
const vueRDir = path.join(rDir, 'vue');
if (fs.existsSync(vueRDir)) {
  stripContent(vueRDir, path.join(publicDir, 'vue'));
}

// Copy registry.json to public root
const registryPath = path.join(__dirname, '..', 'registry.json');
const registryDest = path.join(publicDir, 'registry.json');
fs.copyFileSync(registryPath, registryDest);
console.log('Copied: registry.json');

console.log('\nRegistry build complete!');
console.log(`Files are now at /[component].json (flat structure)`);
