#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Source directory where Vite outputs the build
const sourceDir = path.join(__dirname, 'dist', 'public');
// Target directory where deployment expects the files
const targetDir = path.join(__dirname, 'dist');

function copyBuildFiles() {
  if (!fs.existsSync(sourceDir)) {
    console.error(`Source directory not found: ${sourceDir}`);
    console.log('This is normal if the build hasn\'t been run yet or failed.');
    process.exit(0);
  }

  console.log('Copying build files for deployment...');
  
  try {
    // Read all files in the source directory
    const files = fs.readdirSync(sourceDir);
    
    files.forEach(file => {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      
      // Skip if file already exists in target to avoid overwriting server files
      if (fs.existsSync(targetPath) && !file.endsWith('.html') && !file.endsWith('.js') && !file.endsWith('.css')) {
        console.log(`Skipped existing: ${file}`);
        return;
      }
      
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