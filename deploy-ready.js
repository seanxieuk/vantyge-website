#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('Creating deployment-ready structure...');

// Create dist directory
fs.mkdirSync('dist', { recursive: true });

// Build server only (faster approach)
console.log('Building server bundle...');
execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js', { stdio: 'inherit' });

// Copy client source to dist for simple serving
console.log('Preparing client files...');
if (fs.existsSync('client')) {
  fs.cpSync('client', 'dist/client', { recursive: true });
}

// Create a simple deployment package.json with correct start command
const packageJson = {
  "name": "linkedin-ai-agent",
  "version": "1.0.0",
  "type": "module", 
  "main": "index.js",
  "scripts": {
    "start": "NODE_ENV=production node index.js"
  },
  "dependencies": {
    "express": "^4.21.2"
  },
  "engines": {
    "node": ">=18.0.0"
  }
};

fs.writeFileSync('dist/package.json', JSON.stringify(packageJson, null, 2));

// Create a simple startup script that ensures port 5000
const startupScript = `#!/usr/bin/env node
process.env.PORT = '5000';
process.env.NODE_ENV = 'production';
import('./index.js');
`;

fs.writeFileSync('dist/start.js', startupScript);

console.log('✅ Deployment structure created');
console.log('✅ Server will run on port 5000');
console.log('✅ Use "node index.js" or "npm start" to run');