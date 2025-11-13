#!/bin/bash

echo "🚀 KidCam Local Setup"
echo "===================="

# Backend setup
echo "📦 Installing Backend Dependencies..."
cd backend
npm install

echo ""
echo "✅ Backend ready!"
echo "Run: npm run dev"

# Frontend setup
echo ""
echo "📦 Installing Frontend Dependencies..."
cd ../frontend
npm install

echo ""
echo "✅ Frontend ready!"
echo "Run: npm run dev"

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Add credentials to backend/.env"
echo "2. Add API URL to frontend/.env.local"
echo "3. Open 2 terminals:"
echo "   Terminal 1: cd backend && npm run dev"
echo "   Terminal 2: cd frontend && npm run dev"
echo "4. Open http://localhost:3000"
