#!/usr/bin/env node

import fs from 'fs';
import { execSync } from 'child_process';

console.log('Creating minimal deployment package...');

// Create dist directory
fs.mkdirSync('dist', { recursive: true });

// Build only the server (fast)
execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js');

// Copy essential client files for serving
if (fs.existsSync('client/src')) {
  fs.mkdirSync('dist/client', { recursive: true });
  fs.cpSync('client', 'dist/client', { recursive: true });
}

// Create deployment package.json with correct start command
const packageJson = {
  "name": "linkedin-ai-agent",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.21.2"
  },
  "engines": {
    "node": ">=18.0.0"
  }
};

fs.writeFileSync('dist/package.json', JSON.stringify(packageJson, null, 2));

console.log('Deployment package created successfully');
console.log('Run command: npm start (not vantyge)');
console.log('Server port: 5000 (as configured)');