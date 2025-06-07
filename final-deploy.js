#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Final deployment configuration...');

// Step 1: Clean and rebuild everything
try {
  if (fs.existsSync(path.join(__dirname, 'dist'))) {
    fs.rmSync(path.join(__dirname, 'dist'), { recursive: true, force: true });
  }
  
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

// Step 2: Fix deployment structure
const sourceDir = path.join(__dirname, 'dist', 'public');
const targetDir = path.join(__dirname, 'dist');

if (fs.existsSync(sourceDir)) {
  // Create production server that serves from the correct location
  const productionServer = `import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API routes (if needed)
app.use('/api', (req, res) => {
  res.json({ message: 'API ready' });
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`Production server running on port \${PORT}\`);
});`;

  fs.writeFileSync(path.join(targetDir, 'production-server.js'), productionServer);
  
  // Update package.json for production
  const packageJson = {
    "name": "vantyge-website",
    "version": "1.0.0",
    "type": "module",
    "main": "production-server.js",
    "scripts": {
      "start": "node production-server.js"
    },
    "dependencies": {
      "express": "^4.18.2"
    }
  };
  
  fs.writeFileSync(path.join(targetDir, 'package.json'), JSON.stringify(packageJson, null, 2));
  
  console.log('✅ Production deployment configured');
  console.log('✅ Server will serve React app from /public directory');
  console.log('✅ Ready for deployment');
  
} else {
  console.error('❌ Build output not found');
  process.exit(1);
}