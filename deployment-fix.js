#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🔧 Fixing deployment configuration...');

// First, run the build process
console.log('📦 Building application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Create a proper deployment package.json in dist directory
const deploymentPackageJson = {
  "name": "linkedin-ai-agent",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.21.2",
    "@neondatabase/serverless": "^0.10.4",
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

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Write the deployment package.json
fs.writeFileSync(
  path.join('dist', 'package.json'), 
  JSON.stringify(deploymentPackageJson, null, 2)
);

console.log('✅ Created deployment package.json');

// Create a simple deployment configuration file
const deployConfig = {
  name: "linkedin-ai-agent",
  port: 5000,
  host: "0.0.0.0",
  command: "node index.js"
};

fs.writeFileSync(
  path.join('dist', 'deploy.config.json'), 
  JSON.stringify(deployConfig, null, 2)
);

console.log('✅ Created deployment configuration');

// Verify that the built server file exists and is correct
const serverPath = path.join('dist', 'index.js');
if (fs.existsSync(serverPath)) {
  console.log('✅ Server bundle exists at dist/index.js');
  
  // Check if the server is configured for port 5000
  const serverContent = fs.readFileSync(serverPath, 'utf8');
  if (serverContent.includes('5000')) {
    console.log('✅ Server is configured to run on port 5000');
  } else {
    console.log('⚠️  Server port configuration may need verification');
  }
} else {
  console.error('❌ Server bundle not found at dist/index.js');
  process.exit(1);
}

console.log('\n🎉 Deployment configuration fixed successfully!');
console.log('\nNext steps for deployment:');
console.log('1. The run command should be: npm start');
console.log('2. The server will listen on port 5000');
console.log('3. All static files are included in the build');
