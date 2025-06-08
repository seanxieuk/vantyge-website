#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('Building for deployment...');

// Create dist directory
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Build frontend only (faster)
console.log('Building frontend...');
try {
  execSync('npx vite build --outDir dist/client', { stdio: 'inherit' });
} catch (error) {
  console.error('Frontend build failed:', error.message);
  process.exit(1);
}

// Build server
console.log('Building server...');
try {
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js', { stdio: 'inherit' });
} catch (error) {
  console.error('Server build failed:', error.message);
  process.exit(1);
}

// Create deployment package.json
const deployPackage = {
  "name": "linkedin-ai-agent",
  "version": "1.0.0", 
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "NODE_ENV=production node index.js"
  },
  "dependencies": {
    "express": "^4.21.2",
    "drizzle-orm": "^0.39.1",
    "zod": "^3.24.2",
    "memorystore": "^1.6.7"
  },
  "engines": {
    "node": ">=18.0.0"
  }
};

fs.writeFileSync('dist/package.json', JSON.stringify(deployPackage, null, 2));

console.log('Deployment build complete!');
console.log('- Frontend built to dist/client');
console.log('- Server built to dist/index.js');
console.log('- Ready for deployment with: npm start');