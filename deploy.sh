#!/bin/bash

# AppDirect India Meetup - Deployment Script
# This script deploys both frontend and backend to Google Cloud Run

set -e

# Configuration
PROJECT_ID=${PROJECT_ID:-"india-tech-meetup-2025"}
REGION=${REGION:-"asia-south1"}
BACKEND_SERVICE="appdirect-meetup-backend"
FRONTEND_SERVICE="appdirect-meetup-frontend"

echo "🚀 Starting deployment to Google Cloud Run..."
echo "Project ID: $PROJECT_ID"
echo "Region: $REGION"

# Check if PROJECT_ID is set
if [ "$PROJECT_ID" = "your-project-id" ]; then
    echo "❌ Please set PROJECT_ID environment variable"
    echo "Example: export PROJECT_ID=my-gcp-project"
    exit 1
fi

# Set the project
gcloud config set project $PROJECT_ID

echo "📦 Building and deploying backend..."

# Deploy backend
cd backend
gcloud builds submit --tag gcr.io/$PROJECT_ID/$BACKEND_SERVICE
gcloud run deploy $BACKEND_SERVICE \
  --image gcr.io/$PROJECT_ID/$BACKEND_SERVICE \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars="GOOGLE_APPLICATION_CREDENTIALS=" \
  --memory=512Mi \
  --cpu=1 \
  --max-instances=10

# Get backend URL
BACKEND_URL=$(gcloud run services describe $BACKEND_SERVICE --region=$REGION --format="value(status.url)")
echo "✅ Backend deployed at: $BACKEND_URL"

echo "📦 Building and deploying frontend..."

# Deploy frontend
cd ../frontend
gcloud builds submit --tag gcr.io/$PROJECT_ID/$FRONTEND_SERVICE
gcloud run deploy $FRONTEND_SERVICE \
  --image gcr.io/$PROJECT_ID/$FRONTEND_SERVICE \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars="REACT_APP_BACKEND_URL=$BACKEND_URL" \
  --memory=256Mi \
  --cpu=1 \
  --max-instances=5

# Get frontend URL
FRONTEND_URL=$(gcloud run services describe $FRONTEND_SERVICE --region=$REGION --format="value(status.url)")
echo "✅ Frontend deployed at: $FRONTEND_URL"

echo ""
echo "🎉 Deployment completed successfully!"
echo "Frontend URL: $FRONTEND_URL"
echo "Backend URL: $BACKEND_URL"
echo ""
echo "📋 Next steps:"
echo "1. Test the registration form at: $FRONTEND_URL"
echo "2. Check registrations at: $BACKEND_URL/api/registrations"
echo "3. Monitor logs: gcloud run logs tail $FRONTEND_SERVICE --region=$REGION"
