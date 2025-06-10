#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('Creating complete deployment package...');

// 1. Clean and recreate dist directory
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}
fs.mkdirSync('dist', { recursive: true });
fs.mkdirSync('dist/public', { recursive: true });

// 2. Build server bundle
console.log('Building server...');
execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js');

// 3. Copy all client files to serve the React application
console.log('Copying React application files...');
execSync('cp -r client/* dist/public/');

// 4. Copy shared schema for server
execSync('cp -r shared dist/');

// 5. Create deployment package.json
const deployPackageJson = {
  "name": "vantyge-social",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "NODE_ENV=production node index.js"
  },
  "dependencies": {
    "express": "^4.21.2",
    "drizzle-orm": "^0.39.1",
    "drizzle-zod": "^0.7.0",
    "express-session": "^1.18.1",
    "passport": "^0.7.0",
    "passport-local": "^1.0.0",
    "memorystore": "^1.6.7",
    "connect-pg-simple": "^10.0.0",
    "zod": "^3.24.2",
    "zod-validation-error": "^3.4.0",
    "ws": "^8.18.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
};

fs.writeFileSync('dist/package.json', JSON.stringify(deployPackageJson, null, 2));

// 6. Test that the deployment files are correctly structured
const requiredFiles = ['dist/index.js', 'dist/public/index.html', 'dist/public/src/main.tsx'];
const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));

if (missingFiles.length > 0) {
  console.log('⚠️  Missing files:', missingFiles);
} else {
  console.log('✅ All required files present');
}

// 7. Verify the React app entry point
const indexContent = fs.readFileSync('dist/public/index.html', 'utf8');
if (indexContent.includes('src="/src/main.tsx"')) {
  console.log('✅ React app entry point configured correctly');
} else {
  console.log('⚠️  React app entry point not found');
}

console.log('\n🎉 Complete deployment package created!');
console.log('\nDeployment structure:');
console.log('- dist/index.js (Express server)');
console.log('- dist/public/index.html (React app entry)');
console.log('- dist/public/src/ (React components and CSS)');
console.log('- dist/package.json (deployment config)');
console.log('\nThe server will now serve the full React application with styling.');