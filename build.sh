#!/bin/bash

# Build script for AppDirect India Meetup
echo "🏗️ Building AppDirect India Meetup for Cloud Run"
echo "================================================"

# Build backend
echo "📦 Building backend..."
go mod tidy
go build -o main .
echo "✅ Backend built successfully"

# Build frontend
echo "📦 Building frontend..."
cd ../frontend
npm install
npm run build
echo "✅ Frontend built successfully"

echo ""
echo "🎉 Build completed successfully!"
echo "================================"
echo ""
echo "📋 Ready for deployment:"
echo "1. Commit and push to GitHub"
echo "2. Connect repository to Cloud Run"
echo "3. Deploy automatically"
echo ""
echo "📁 Build artifacts:"
echo "   - main (Go binary)"
echo "   - frontend/build (React build)"
echo "   - Dockerfiles ready for Cloud Run"
