#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Quick deployment structure fix...');

const sourceDir = path.join(__dirname, 'dist', 'public');
const targetDir = path.join(__dirname, 'dist');

if (!fs.existsSync(sourceDir)) {
  console.log('No dist/public directory found. Run npm run build first.');
  process.exit(0);
}

// Get list of server files to preserve
const existingFiles = fs.existsSync(targetDir) ? fs.readdirSync(targetDir) : [];
const serverFiles = existingFiles.filter(file => file.endsWith('.js') && file !== 'index.html');

// Copy all client files from dist/public to dist
function copyRecursive(src, dest) {
  const files = fs.readdirSync(src);
  
  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copyRecursive(srcPath, destPath);
    } else {
      // Don't overwrite server files
      if (!serverFiles.includes(file)) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

copyRecursive(sourceDir, targetDir);

// Verify index.html exists
const indexPath = path.join(targetDir, 'index.html');
if (fs.existsSync(indexPath)) {
  console.log('✅ Deployment structure fixed - index.html is now in dist/');
} else {
  console.log('❌ index.html not found in dist/');
  process.exit(1);
}

console.log('✅ Ready for deployment');