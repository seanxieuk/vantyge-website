#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Starting deployment build process...');

// Step 1: Clean previous build
try {
  if (fs.existsSync(path.join(__dirname, 'dist'))) {
    console.log('Cleaning previous build...');
    fs.rmSync(path.join(__dirname, 'dist'), { recursive: true, force: true });
  }
} catch (error) {
  console.log('No previous build to clean');
}

// Step 2: Run the build commands
try {
  console.log('Building client application...');
  execSync('vite build', { 
    stdio: 'inherit',
    cwd: path.join(__dirname, 'client')
  });
  
  console.log('Building server...');
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', {
    stdio: 'inherit'
  });
  
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}

// Step 3: Fix deployment structure
console.log('Fixing deployment structure...');

const sourceDir = path.join(__dirname, 'dist', 'public');
const targetDir = path.join(__dirname, 'dist');

function copyDirectoryRecursive(src, dest) {
  const files = fs.readdirSync(src);
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copyDirectoryRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

if (fs.existsSync(sourceDir)) {
  const files = fs.readdirSync(sourceDir);
  
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    
    if (fs.statSync(sourcePath).isFile()) {
      // Don't overwrite server index.js
      if (file !== 'index.js') {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`✓ Copied: ${file}`);
      }
    } else if (fs.statSync(sourcePath).isDirectory()) {
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
      }
      copyDirectoryRecursive(sourcePath, targetPath);
      console.log(`✓ Copied directory: ${file}`);
    }
  });
  
  // Clean up the public directory since files are now in dist
  fs.rmSync(sourceDir, { recursive: true, force: true });
  console.log('✓ Cleaned up temporary public directory');
  
  // Verify deployment structure
  const indexPath = path.join(targetDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('✅ Deployment structure is correct - index.html found in dist/');
  } else {
    console.error('❌ index.html not found in dist/ - deployment may fail');
    process.exit(1);
  }
  
  console.log('✅ Build completed successfully!');
  console.log('📁 Files are ready for deployment in the dist/ directory');
  
} else {
  console.error('❌ Build output not found in dist/public/');
  process.exit(1);
}