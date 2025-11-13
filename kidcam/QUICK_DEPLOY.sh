#!/bin/bash

echo "🚀 KidCam Deployment Script"
echo "============================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
  echo "Initializing git repository..."
  git init
fi

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Frontend build failed"
  exit 1
fi
cd ..

echo "✅ Frontend built successfully"
echo ""

# Commit changes
echo "📝 Committing changes..."
git add .
git commit -m "Production deployment: $(date '+%Y-%m-%d %H:%M:%S')"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ ========================================"
  echo "   Deployment Started! 🎉"
  echo "========================================="
  echo ""
  echo "Next steps:"
  echo "1. Check Vercel: https://vercel.com/dashboard"
  echo "2. Check Render: https://dashboard.render.com"
  echo "3. Wait 3-5 minutes for deployment"
  echo "4. Visit: https://kidcam.com"
  echo ""
else
  echo "❌ Push to GitHub failed"
  exit 1
fi
