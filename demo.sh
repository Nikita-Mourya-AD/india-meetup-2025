#!/bin/bash

# AppDirect India Meetup - Demo Script
# This script demonstrates the full application functionality

echo "🎉 AppDirect India Meetup - Application Demo"
echo "============================================="
echo ""

# Check prerequisites
echo "🔍 Checking prerequisites..."

if ! command -v go &> /dev/null; then
    echo "❌ Go is not installed. Please install Go 1.21+"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js 18+"
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Start backend
echo "🚀 Starting backend server..."
go run main.go &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 3

# Test backend endpoints
echo ""
echo "🧪 Testing Backend API..."
echo "------------------------"

echo "1️⃣ Health Check:"
HEALTH_RESPONSE=$(curl -s http://localhost:8080/health)
echo "   Response: $HEALTH_RESPONSE"

if [[ $HEALTH_RESPONSE == *"healthy"* ]]; then
    echo "   ✅ Backend is healthy"
else
    echo "   ❌ Backend health check failed"
    kill $BACKEND_PID 2>/dev/null || true
    exit 1
fi

echo ""
echo "2️⃣ Registration Test:"
REG_RESPONSE=$(curl -s -X POST http://localhost:8080/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Demo User",
    "email": "demo@appdirect.com",
    "company": "AppDirect",
    "role": "Software Engineer"
  }')

echo "   Response: $REG_RESPONSE"

if [[ $REG_RESPONSE == *"successful"* ]]; then
    echo "   ✅ Registration successful"
else
    echo "   ❌ Registration failed"
fi

echo ""
echo "3️⃣ Registrations List:"
REG_LIST_RESPONSE=$(curl -s http://localhost:8080/api/registrations)
echo "   Response: $REG_LIST_RESPONSE"

if [[ $REG_LIST_RESPONSE == *"Demo User"* ]]; then
    echo "   ✅ Registration stored successfully"
else
    echo "   ❌ Registration not found in list"
fi

echo ""
echo "🎨 Starting Frontend..."
echo "----------------------"

# Start frontend
cd ../frontend
npm start &
FRONTEND_PID=$!

echo "⏳ Waiting for frontend to start..."
sleep 10

echo ""
echo "✅ Demo Setup Complete!"
echo "======================="
echo ""
echo "🌐 Application URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8080"
echo ""
echo "📋 Available Endpoints:"
echo "   GET  /health                    - Health check"
echo "   POST /api/register             - Register user"
echo "   GET  /api/registrations        - List registrations"
echo ""
echo "🎯 Demo Instructions:"
echo "   1. Open http://localhost:3000 in your browser"
echo "   2. Fill out the registration form"
echo "   3. Submit the form"
echo "   4. View the success message"
echo "   5. Check registrations at http://localhost:8080/api/registrations"
echo ""
echo "🛑 To stop the demo:"
echo "   Press Ctrl+C or run: pkill -f 'go run main.go' && pkill -f 'npm start'"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping demo servers..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    echo "✅ Demo stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for user to stop
echo "Press Ctrl+C to stop the demo..."
wait
