# 🔥 Google Firestore Setup Guide

## Step 1: Create Google Cloud Project

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create New Project**
   - Click "Select a project" → "New Project"
   - Project name: `appdirect-india-meetup` (or your preferred name)
   - Click "Create"

3. **Enable Billing**
   - Go to "Billing" in the left menu
   - Link a billing account (Firestore has a free tier)

## Step 2: Enable Firestore API

1. **Navigate to Firestore**
   - Go to "Firestore" in the left menu
   - Click "Create database"

2. **Choose Mode**
   - Select "Start in test mode" (for development)
   - Click "Next"

3. **Choose Location**
   - Select "asia-south1" (Mumbai) for India
   - Click "Done"

## Step 3: Create Service Account

1. **Go to IAM & Admin**
   - Navigate to "IAM & Admin" → "Service Accounts"
   - Click "Create Service Account"

2. **Service Account Details**
   - Name: `appdirect-meetup-service`
   - Description: `Service account for AppDirect India Meetup`
   - Click "Create and Continue"

3. **Grant Access**
   - Role: "Cloud Datastore User" or "Firestore User"
   - Click "Continue" → "Done"

4. **Create Key**
   - Click on the created service account
   - Go to "Keys" tab
   - Click "Add Key" → "Create new key"
   - Choose "JSON" format
   - Download the key file

## Step 4: Configure Local Environment

1. **Set Environment Variable**
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-key.json"
   ```

2. **Update Project ID**
   - Note your Project ID from the Google Cloud Console
   - Update the project ID in the Go code

## Step 5: Test the Setup

1. **Run with Firestore**
   ```bash
   cd backend
   go run main.go
   ```

2. **Test Registration**
   - Register a user through the frontend
   - Check Firestore console to see the data

## Step 6: Deploy to Cloud Run

1. **Build and Deploy**
   ```bash
   ./deploy.sh
   ```

2. **Set Environment Variables**
   - In Cloud Run, set `GOOGLE_APPLICATION_CREDENTIALS=""` (empty for default service account)

## 🔧 Troubleshooting

### Common Issues:
1. **Permission Denied**: Check service account roles
2. **Project Not Found**: Verify project ID
3. **Billing Not Enabled**: Enable billing in GCP console

### Free Tier Limits:
- 1GB storage
- 50K reads/day
- 20K writes/day
- 20K deletes/day

## 📊 Monitoring

- **Firestore Console**: View data in real-time
- **Cloud Logging**: Monitor API calls
- **Cloud Monitoring**: Track usage and performance
