import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const docsDir = path.join(rootDir, 'src/pages/docs');
const exampleDir = path.join(rootDir, 'registry/default/example');
const registryPath = path.join(rootDir, 'registry.json');

// Map component names to their doc file names
function getDocFileName(componentName) {
  // Convert kebab-case to PascalCase + Doc
  const pascal = componentName
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
  return `${pascal}Doc.tsx`;
}

// Extract usageCode from a doc file
function extractUsageCode(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  // Try usageCode first, then reactUsageCode
  const match = content.match(/const (?:usageCode|reactUsageCode) = `([\s\S]*?)`/);
  if (match) {
    let code = match[1];
    // If the code doesn't have export default, wrap it
    if (!code.includes('export default')) {
      // Find the function name or component name
      const funcMatch = code.match(/(?:function|const)\s+(\w+)/);
      if (funcMatch) {
        code = code + `\nexport default ${funcMatch[1]}`;
      }
    }
    return code;
  }
  return null;
}

// Ensure example directory exists
if (!fs.existsSync(exampleDir)) {
  fs.mkdirSync(exampleDir, { recursive: true });
}

// Read registry.json
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

let created = 0;
let skipped = 0;
let updated = 0;

for (const item of registry.items) {
  if (item.type !== 'registry:ui') continue;

  const componentName = item.name;
  const docFileName = getDocFileName(componentName);
  const docFilePath = path.join(docsDir, docFileName);

  let exampleCode = null;

  if (fs.existsSync(docFilePath)) {
    exampleCode = extractUsageCode(docFilePath);
  }

  if (!exampleCode) {
    // Generate a minimal fallback example
    const pascal = componentName
      .split('-')
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join('');
    exampleCode = `import { ${pascal} } from "@/components/ui/${componentName}"

export default function ${pascal}Demo() {
  return <${pascal} />
}`;
    console.log(`  [fallback] ${componentName} — no usageCode found in doc`);
  }

  // Write example file
  const exampleFileName = `${componentName}-demo.tsx`;
  const exampleFilePath = path.join(exampleDir, exampleFileName);
  fs.writeFileSync(exampleFilePath, exampleCode);
  created++;

  // Add example file to registry item if not already present
  const exampleRegistryPath = `registry/default/example/${exampleFileName}`;
  const hasExample = item.files?.some(f => f.path === exampleRegistryPath);
  if (!hasExample) {
    if (!item.files) item.files = [];
    item.files.push({
      path: exampleRegistryPath,
      type: 'registry:example',
      target: `components/example/${exampleFileName}`
    });
    updated++;
  }
}

// Write updated registry.json
fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n');

console.log(`\nDone! Created ${created} example files, updated ${updated} registry entries, skipped ${skipped}.`);
