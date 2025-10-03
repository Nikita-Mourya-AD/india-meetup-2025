#!/bin/bash

# AppDirect India Meetup - Local Development Script
# This script starts both frontend and backend for local development

set -e

echo "🚀 Starting local development environment..."

# Check if required tools are installed
if ! command -v go &> /dev/null; then
    echo "❌ Go is not installed. Please install Go 1.21+"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js 18+"
    exit 1
fi

# Check if service account key is set
if [ -z "$GOOGLE_APPLICATION_CREDENTIALS" ]; then
    echo "⚠️  GOOGLE_APPLICATION_CREDENTIALS not set"
    echo "Please set it to your service account key file:"
    echo "export GOOGLE_APPLICATION_CREDENTIALS=path/to/your/key.json"
    echo ""
    echo "Continuing without Firestore (will show connection errors)..."
fi

echo "📦 Installing backend dependencies..."
cd backend
go mod tidy

echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

echo "🔧 Starting backend server..."
cd ../backend
go run main.go &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

echo "🎨 Starting frontend development server..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo ""
echo "✅ Development environment started!"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:8080"
echo "Backend Health: http://localhost:8080/health"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    echo "✅ Servers stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for user to stop
wait
