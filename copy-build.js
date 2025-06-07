#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Source directory where Vite outputs the build
const sourceDir = path.join(__dirname, 'dist', 'public');
// Target directory where deployment expects the files
const targetDir = path.join(__dirname, 'dist');

function copyBuildFiles() {
  if (!fs.existsSync(sourceDir)) {
    console.error(`Source directory not found: ${sourceDir}`);
    process.exit(1);
  }

  console.log('Copying build files for deployment...');
  
  try {
    // Read all files in the source directory
    const files = fs.readdirSync(sourceDir);
    
    files.forEach(file => {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      
      // Check if it's a file (not a directory)
      if (fs.statSync(sourcePath).isFile()) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied: ${file}`);
      } else {
        // If it's a directory, copy recursively
        copyDirectory(sourcePath, targetPath);
      }
    });
    
    console.log('Build files copied successfully for deployment!');
  } catch (error) {
    console.error('Error copying build files:', error);
    process.exit(1);
  }
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const files = fs.readdirSync(src);
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

copyBuildFiles();