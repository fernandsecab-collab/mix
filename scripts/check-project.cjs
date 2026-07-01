const fs = require('node:fs');

const required = [
  'package.json',
  'index.html',
  'vite.config.ts',
  'tsconfig.json',
  'electron/main.ts',
  'electron/preload.ts',
  'electron/tsconfig.json',
  'src/main.tsx',
  'src/styles/app.css',
  '.github/workflows/build-windows.yml'
];

const missing = required.filter((file) => !fs.existsSync(file));

if (missing.length) {
  console.error('Fichiers manquants :');
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

console.log('FM Remix Forge Studio V32 : structure OK');
