#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Starting deployment build process...');

// Step 1: Run the build command
try {
  console.log('Building application...');
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

// Step 2: Copy static files to deployment location
const sourceDir = path.join(__dirname, 'dist', 'public');
const targetDir = path.join(__dirname, 'dist');

if (fs.existsSync(sourceDir)) {
  console.log('Copying static files for deployment...');
  
  try {
    const files = fs.readdirSync(sourceDir);
    
    files.forEach(file => {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      
      if (fs.statSync(sourcePath).isFile()) {
        // Don't overwrite server files
        if (!fs.existsSync(targetPath) || file.endsWith('.html') || file.endsWith('.css') || file.startsWith('assets/')) {
          fs.copyFileSync(sourcePath, targetPath);
          console.log(`Copied: ${file}`);
        }
      } else if (fs.statSync(sourcePath).isDirectory()) {
        // Copy directories recursively
        if (!fs.existsSync(targetPath)) {
          fs.mkdirSync(targetPath, { recursive: true });
        }
        copyDirectory(sourcePath, targetPath);
      }
    });
    
    console.log('Deployment build completed successfully!');
    console.log('Static files are now in the correct location for deployment.');
    
  } catch (error) {
    console.error('Error copying files:', error);
    process.exit(1);
  }
} else {
  console.warn('No static files found to copy. Build may have failed.');
}

function copyDirectory(src, dest) {
  const files = fs.readdirSync(src);
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}