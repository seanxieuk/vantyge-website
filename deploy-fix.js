#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Deployment Fix: Resolving build output structure...');

// The issue is that Vite outputs to dist/public but deployment expects files in dist
// This script addresses the deployment configuration mismatch

const sourceDir = path.join(__dirname, 'dist', 'public');
const targetDir = path.join(__dirname, 'dist');

function fixDeploymentStructure() {
  // Check if build output exists
  if (!fs.existsSync(sourceDir)) {
    console.log('No build output found yet. Run the build first.');
    return;
  }

  console.log('Found build output, fixing deployment structure...');
  
  try {
    // First, backup any existing server files in dist
    const distFiles = fs.existsSync(targetDir) ? fs.readdirSync(targetDir) : [];
    const serverFiles = distFiles.filter(file => 
      file.endsWith('.js') && !file.includes('assets') && file !== 'index.html'
    );
    
    // Copy all client files from dist/public to dist
    const files = fs.readdirSync(sourceDir);
    
    files.forEach(file => {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      
      if (fs.statSync(sourcePath).isFile()) {
        // Always copy client files, but preserve server files
        if (!serverFiles.includes(file)) {
          fs.copyFileSync(sourcePath, targetPath);
          console.log(`✓ Copied: ${file}`);
        } else {
          console.log(`⚠ Preserved server file: ${file}`);
        }
      } else if (fs.statSync(sourcePath).isDirectory()) {
        // Copy directories recursively (like assets folder)
        if (!fs.existsSync(targetPath)) {
          fs.mkdirSync(targetPath, { recursive: true });
        }
        copyDirectoryRecursive(sourcePath, targetPath);
        console.log(`✓ Copied directory: ${file}`);
      }
    });
    
    // Verify index.html is in the right place
    const indexPath = path.join(targetDir, 'index.html');
    if (fs.existsSync(indexPath)) {
      console.log('✅ index.html found in dist/ - deployment structure is correct');
    } else {
      console.error('❌ index.html not found in dist/ - deployment may fail');
    }
    
    console.log('✅ Deployment structure fixed successfully!');
    console.log('📁 Static files are now in the correct location for deployment.');
    
  } catch (error) {
    console.error('❌ Error fixing deployment structure:', error.message);
    process.exit(1);
  }
}

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

// Run the fix
fixDeploymentStructure();