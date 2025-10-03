# AppDirect India Meetup - Registration App

A full-stack web application for the AppDirect India Meetup Workshop featuring a React frontend with TailwindCSS and a Go backend with Google Firestore integration.

## 🎨 Design & Features

- **Color Scheme**: Blue & white professional theme
- **Frontend**: React with TailwindCSS for responsive design
- **Backend**: Go with REST API endpoints
- **Database**: Google Firestore (NoSQL)
- **Deployment**: Docker containers on Google Cloud Run

## 📁 Project Structure

```
India-Meetup/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Hero.js       # Hero section
│   │   │   ├── RegistrationForm.js
│   │   │   └── SuccessMessage.js
│   │   ├── App.js           # Main app component
│   │   ├── index.js         # Entry point
│   │   └── index.css        # TailwindCSS imports
│   ├── public/
│   ├── Dockerfile           # Frontend container
│   ├── nginx.conf           # Nginx configuration
│   └── package.json
├── backend/                 # Go application
│   ├── main.go             # Main server file
│   ├── go.mod              # Go dependencies
│   └── Dockerfile          # Backend container
└── README.md
```

## 🚀 Quick Start (Local Development)

### Prerequisites

- Node.js 18+ and npm
- Go 1.21+
- Google Cloud Project with Firestore enabled
- Google Cloud Service Account key (for local development)

### 1. Backend Setup

```bash
cd backend

# Install dependencies
go mod tidy

# Set up environment variables
export GOOGLE_APPLICATION_CREDENTIALS="path/to/your/service-account-key.json"
export PORT=8080

# Run the server
go run main.go
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set backend URL (optional, defaults to localhost:8080)
export REACT_APP_BACKEND_URL=http://localhost:8080

# Start development server
npm start
```

The application will be available at `http://localhost:3000`

## 🐳 Docker Deployment

### Build Images

```bash
# Build backend image
cd backend
docker build -t appdirect-meetup-backend .

# Build frontend image
cd ../frontend
docker build -t appdirect-meetup-frontend .
```

### Run Locally with Docker

```bash
# Run backend
docker run -p 8080:8080 \
  -e GOOGLE_APPLICATION_CREDENTIALS=/app/key.json \
  -v /path/to/service-account-key.json:/app/key.json \
  appdirect-meetup-backend

# Run frontend
docker run -p 3000:80 \
  -e REACT_APP_BACKEND_URL=http://localhost:8080 \
  appdirect-meetup-frontend
```

## ☁️ Google Cloud Run Deployment

### Prerequisites

- Google Cloud SDK installed and configured
- Docker installed
- Google Cloud Project with billing enabled
- Firestore API enabled

### 1. Set Up Google Cloud Project

```bash
# Set your project ID
export PROJECT_ID="your-project-id"
gcloud config set project $PROJECT_ID

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable firestore.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### 2. Deploy Backend

```bash
cd backend

# Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/$PROJECT_ID/appdirect-meetup-backend

# Deploy to Cloud Run
gcloud run deploy appdirect-meetup-backend \
  --image gcr.io/$PROJECT_ID/appdirect-meetup-backend \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-env-vars="GOOGLE_APPLICATION_CREDENTIALS=" \
  --memory=512Mi \
  --cpu=1 \
  --max-instances=10
```

### 3. Deploy Frontend

```bash
cd frontend

# Get the backend URL from previous deployment
export BACKEND_URL=$(gcloud run services describe appdirect-meetup-backend --region=asia-south1 --format="value(status.url)")

# Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/$PROJECT_ID/appdirect-meetup-frontend

# Deploy to Cloud Run
gcloud run deploy appdirect-meetup-frontend \
  --image gcr.io/$PROJECT_ID/appdirect-meetup-frontend \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-env-vars="REACT_APP_BACKEND_URL=$BACKEND_URL" \
  --memory=256Mi \
  --cpu=1 \
  --max-instances=5
```

### 4. Get Application URLs

```bash
# Get frontend URL
gcloud run services describe appdirect-meetup-frontend --region=asia-south1 --format="value(status.url)"

# Get backend URL
gcloud run services describe appdirect-meetup-backend --region=asia-south1 --format="value(status.url)"
```

## 🔧 Configuration

### Environment Variables

#### Backend
- `PORT`: Server port (default: 8080)
- `GOOGLE_APPLICATION_CREDENTIALS`: Path to service account key (local only)

#### Frontend
- `REACT_APP_BACKEND_URL`: Backend API URL

### Firestore Setup

1. Create a Firestore database in your Google Cloud Project
2. The application will automatically create a `registrations` collection
3. No additional configuration required

## 📊 API Endpoints

### POST /api/register
Register a new attendee

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Tech Corp",
  "role": "Software Engineer"
}
```

**Response:**
```json
{
  "message": "Registration successful",
  "id": "document-id"
}
```

### GET /api/registrations
Get all registrations (admin endpoint)

**Response:**
```json
[
  {
    "id": "document-id",
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Tech Corp",
    "role": "Software Engineer",
    "createdAt": "2024-03-15T10:30:00Z"
  }
]
```

### GET /health
Health check endpoint

**Response:**
```json
{
  "status": "healthy"
}
```

## 🎯 Features

### Frontend
- ✅ Responsive hero section with event details
- ✅ Registration form with validation
- ✅ Success message with registration details
- ✅ Blue & white professional theme
- ✅ Mobile-friendly design
- ✅ Loading states and error handling

### Backend
- ✅ REST API with CORS support
- ✅ Firestore integration
- ✅ Input validation
- ✅ Error handling
- ✅ Health check endpoint
- ✅ Admin endpoint for viewing registrations

## 🔒 Security

- CORS configured for cross-origin requests
- Input validation on all endpoints
- Environment-based configuration
- Service account authentication for Firestore
- Security headers in nginx configuration

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🛠️ Development

### Adding New Features

1. **Frontend**: Add new components in `frontend/src/components/`
2. **Backend**: Add new endpoints in `backend/main.go`
3. **Styling**: Use TailwindCSS classes for consistent design

### Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests (if added)
cd backend
go test ./...
```

## 📞 Support

For issues or questions:
- Email: events@appdirect.com
- Create an issue in the repository

## 📄 License

This project is proprietary to AppDirect Inc.
