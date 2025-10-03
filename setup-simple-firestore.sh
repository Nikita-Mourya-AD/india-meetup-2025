#!/bin/bash

# Simple Firestore Setup - Using Personal Google Account

echo "🔥 Simple Firestore Setup for AppDirect India Tech Meetup 2025"
echo "=============================================================="

# Set the project ID
PROJECT_ID="india-tech-meetup-2025"

echo "📋 Using project: $PROJECT_ID"

# Check if gcloud CLI is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Google Cloud CLI is not installed."
    echo "Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

echo "✅ Google Cloud CLI found"

# Authenticate with Google Cloud
echo "🔐 Authenticating with Google Cloud..."
gcloud auth login

# Set the project
echo "🔧 Setting project to $PROJECT_ID..."
gcloud config set project $PROJECT_ID

# Enable Firestore API
echo "🔧 Enabling Firestore API..."
gcloud services enable firestore.googleapis.com

# Check if Firestore database already exists
if gcloud firestore databases describe --database="(default)" &>/dev/null; then
    echo "✅ Firestore database already exists"
else
    echo "🗄️ Creating Firestore database..."
    gcloud firestore databases create --region=asia-south1 --type=firestore-native
fi

echo ""
echo "🎉 Firestore setup completed!"
echo "=============================="
echo ""
echo "📋 Next steps:"
echo "1. Test the setup:"
echo "   cd backend && go run main.go"
echo ""
echo "2. Deploy to Cloud Run:"
echo "   ./deploy.sh"
echo ""
echo "📊 Monitor your data:"
echo "   https://console.cloud.google.com/firestore/data?project=$PROJECT_ID"
echo ""
echo "💡 Note:"
echo "   - Using your personal Google account credentials"
echo "   - No service account key needed"
echo "   - Perfect for development and testing"
