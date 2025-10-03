#!/bin/bash

# AppDirect India Tech Meetup 2025 - Firestore Setup Script

echo "🔥 Setting up Firestore for AppDirect India Tech Meetup 2025"
echo "============================================================"

# Set the project ID (you can change this if needed)
PROJECT_ID="india-tech-meetup-2025"

echo "📋 Using project: $PROJECT_ID"

# Check if gcloud CLI is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Google Cloud CLI is not installed."
    echo "Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

echo "✅ Google Cloud CLI found"

# Set the project
echo "🔧 Setting project to $PROJECT_ID..."
gcloud config set project $PROJECT_ID

# Check if user is authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "🔐 Please authenticate with Google Cloud:"
    gcloud auth login
fi

echo "✅ User authenticated"

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

# Create service account (if it doesn't exist)
SERVICE_ACCOUNT="appdirect-meetup-service@$PROJECT_ID.iam.gserviceaccount.com"

if gcloud iam service-accounts describe $SERVICE_ACCOUNT &>/dev/null; then
    echo "✅ Service account already exists"
else
    echo "👤 Creating service account..."
    gcloud iam service-accounts create appdirect-meetup-service \
        --description="Service account for AppDirect India Tech Meetup 2025" \
        --display-name="AppDirect Meetup Service"
fi

# Grant necessary permissions
echo "🔑 Granting permissions..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT" \
    --role="roles/datastore.user"

# Create and download service account key
echo "📄 Creating service account key..."
gcloud iam service-accounts keys create ./service-account-key.json \
    --iam-account=$SERVICE_ACCOUNT

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
