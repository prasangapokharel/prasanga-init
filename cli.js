#!/usr/bin/env node

import { execSync } from "child_process";

const appName = process.argv[2] || "MyPrasangaApp";

console.log(`\n🚀 Creating new Prasanga Expo App: ${appName}...\n`);

try {
  execSync(`npx degit prasangapokharel/prasanga-init ${appName}`, { stdio: "inherit" });
  console.log(`\n✅ All done! Your Prasanga app is ready.\n`);
  console.log(`📍 Navigate to your app:`);
  console.log(`   cd ${appName}`);
  console.log(`   npm install`);
  console.log(`   npx expo start\n`);
} catch (error) {
  console.error(`\n❌ Error creating app:`, error.message);
  process.exit(1);
}
