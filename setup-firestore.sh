#!/bin/bash

# AppDirect India Meetup - Firestore Setup Script

echo "🔥 Setting up Google Firestore for AppDirect India Meetup"
echo "========================================================"

# Check if gcloud CLI is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Google Cloud CLI is not installed."
    echo "Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

echo "✅ Google Cloud CLI found"

# Check if user is authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "🔐 Please authenticate with Google Cloud:"
    gcloud auth login
fi

echo "✅ User authenticated"

# Get current project
CURRENT_PROJECT=$(gcloud config get-value project 2>/dev/null)

if [ -z "$CURRENT_PROJECT" ]; then
    echo "❌ No project selected. Please select a project:"
    gcloud projects list
    echo ""
    read -p "Enter your project ID: " PROJECT_ID
    gcloud config set project $PROJECT_ID
else
    echo "✅ Current project: $CURRENT_PROJECT"
    read -p "Do you want to use this project? (y/n): " USE_CURRENT
    if [ "$USE_CURRENT" != "y" ]; then
        gcloud projects list
        read -p "Enter your project ID: " PROJECT_ID
        gcloud config set project $PROJECT_ID
    fi
fi

PROJECT_ID=$(gcloud config get-value project)
echo "✅ Using project: $PROJECT_ID"

# Enable Firestore API
echo "🔧 Enabling Firestore API..."
gcloud services enable firestore.googleapis.com

# Create Firestore database
echo "🗄️ Creating Firestore database..."
gcloud firestore databases create --region=asia-south1 --type=firestore-native

# Create service account
echo "👤 Creating service account..."
gcloud iam service-accounts create appdirect-meetup-service \
    --description="Service account for AppDirect India Meetup" \
    --display-name="AppDirect Meetup Service"

# Grant necessary permissions
echo "🔑 Granting permissions..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:appdirect-meetup-service@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/datastore.user"

# Create and download service account key
echo "📄 Creating service account key..."
gcloud iam service-accounts keys create ./service-account-key.json \
    --iam-account=appdirect-meetup-service@$PROJECT_ID.iam.gserviceaccount.com

echo ""
echo "🎉 Firestore setup completed!"
echo "=============================="
echo ""
echo "📋 Next steps:"
echo "1. Set environment variable:"
echo "   export GOOGLE_APPLICATION_CREDENTIALS=\"$(pwd)/service-account-key.json\""
echo ""
echo "2. Update the project ID in backend/main.go:"
echo "   Change 'appdirect-india-meetup' to '$PROJECT_ID'"
echo ""
echo "3. Test the setup:"
echo "   cd backend && go run main.go"
echo ""
echo "4. Deploy to Cloud Run:"
echo "   ./deploy.sh"
echo ""
echo "🔒 Security Note:"
echo "   - Keep service-account-key.json secure"
echo "   - Add it to .gitignore"
echo "   - Don't commit it to version control"
echo ""
echo "📊 Monitor your data:"
echo "   https://console.cloud.google.com/firestore/data?project=$PROJECT_ID"
