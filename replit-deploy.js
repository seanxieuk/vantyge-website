#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Creating Replit-optimized deployment...');

// Create the deployment directory structure
const deployDir = path.join(__dirname, 'dist');

// Create a simple Express server that serves static files correctly
const serverCode = `import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy for Replit
app.set('trust proxy', true);

// Serve static assets with proper headers
app.use('/assets', express.static(path.join(__dirname, 'assets'), {
  maxAge: '1y',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    }
    if (filePath.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    }
  }
}));

// Serve other static files
app.use(express.static(__dirname, {
  index: false
}));

// Handle all routes with index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`Vantyge Website running on port \${PORT}\`);
});`;

fs.writeFileSync(path.join(deployDir, 'app.js'), serverCode);

// Create package.json optimized for Replit deployment
const packageJson = {
  "name": "vantyge-website",
  "version": "1.0.0",
  "type": "module",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "engines": {
    "node": ">=18.0.0"
  }
};

fs.writeFileSync(path.join(deployDir, 'package.json'), JSON.stringify(packageJson, null, 2));

console.log('✅ Replit deployment configuration created');
console.log('✅ Server will properly serve React SPA');
console.log('✅ Static assets configured with correct MIME types');