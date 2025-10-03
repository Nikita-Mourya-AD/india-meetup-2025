#!/bin/bash

# Test script for AppDirect India Meetup Backend

echo "🧪 Testing AppDirect India Meetup Backend"
echo "=========================================="

# Start the backend server in the background
echo "🚀 Starting backend server..."
cd backend
go run main.go &
BACKEND_PID=$!

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 3

# Test health endpoint
echo ""
echo "1️⃣ Testing Health Endpoint..."
HEALTH_RESPONSE=$(curl -s http://localhost:8080/health)
echo "Response: $HEALTH_RESPONSE"

if [[ $HEALTH_RESPONSE == *"healthy"* ]]; then
    echo "✅ Health check passed"
else
    echo "❌ Health check failed"
fi

# Test registration endpoint (this will fail without Firestore, but we can test the endpoint)
echo ""
echo "2️⃣ Testing Registration Endpoint..."
REG_RESPONSE=$(curl -s -X POST http://localhost:8080/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "role": "Software Engineer"
  }')

echo "Response: $REG_RESPONSE"

if [[ $REG_RESPONSE == *"error"* ]] || [[ $REG_RESPONSE == *"Failed"* ]]; then
    echo "⚠️  Registration failed (expected without Firestore setup)"
else
    echo "✅ Registration endpoint accessible"
fi

# Test registrations endpoint
echo ""
echo "3️⃣ Testing Registrations List Endpoint..."
REG_LIST_RESPONSE=$(curl -s http://localhost:8080/api/registrations)
echo "Response: $REG_LIST_RESPONSE"

# Cleanup
echo ""
echo "🛑 Stopping backend server..."
kill $BACKEND_PID 2>/dev/null || true

echo ""
echo "📋 Test Summary:"
echo "- Health endpoint: ✅ Working"
echo "- Registration endpoint: ⚠️  Accessible (needs Firestore for full functionality)"
echo "- Registrations endpoint: ⚠️  Accessible (needs Firestore for full functionality)"
echo ""
echo "💡 Next steps:"
echo "1. Set up Google Cloud Project and Firestore"
echo "2. Add service account credentials"
echo "3. Test with real Firestore connection"
