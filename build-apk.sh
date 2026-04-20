#!/usr/bin/env bash
# ───────────────────────────────────────────────────────
#  mes-comptes — APK build helper
#  Run this after making any change to the React code
# ───────────────────────────────────────────────────────
set -e

echo "📦 Building web app..."
npm run build

echo "📱 Syncing to Android..."
npx cap sync android

echo ""
echo "✅ Done! Now open Android Studio:"
echo "   npx cap open android"
echo ""
echo "   In Android Studio:"
echo "   Build → Build Bundle(s) / APK(s) → Build APK(s)"
echo "   The APK will be at:"
echo "   android/app/build/outputs/apk/debug/app-debug.apk"
