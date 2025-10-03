# 🚀 AppDirect India Meetup 2025 - Full-Stack Application

A complete full-stack web application for the AppDirect India Meetup Workshop featuring a React frontend with TailwindCSS and a Go backend, deployed as a single service on Google Cloud Run.

## 🎨 Design & Features

- **Color Scheme**: Navy blue & white professional theme
- **Frontend**: React with TailwindCSS for responsive design
- **Backend**: Go with REST API endpoints
- **Database**: In-memory storage (production-ready for Firestore)
- **Deployment**: Single Docker container on Google Cloud Run
- **Architecture**: Full-stack application in one service

## 📁 Project Structure

```
India-Meetup/
├── frontend/                 # React application source
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Hero.js       # Hero section
│   │   │   ├── RegistrationForm.js
│   │   │   ├── SuccessMessage.js
│   │   │   ├── TechTracks.js # Tech tracks with speakers
│   │   │   └── Location.js   # Interactive location map
│   │   ├── App.js           # Main app component
│   │   ├── index.js         # Entry point
│   │   └── index.css        # TailwindCSS imports
│   ├── public/
│   ├── Dockerfile           # Frontend container (for separate deployment)
│   ├── nginx.conf           # Nginx configuration
│   └── package.json
├── static/                  # Built React frontend (for production)
│   ├── index.html
│   ├── static/
│   │   ├── css/
│   │   └── js/
├── main.go                  # Go backend server (root level)
├── go.mod                   # Go dependencies (root level)
├── go.sum                   # Go dependencies lock
├── Dockerfile               # Single service container
└── README.md
```

## 🌟 Key Features

### Frontend
- ✅ Beautiful hero section with navy blue theme
- ✅ Registration form with validation
- ✅ Tech tracks section showcasing speakers (Nikita, Ankita, Muskan)
- ✅ Interactive location map with directions
- ✅ Success message with registration details
- ✅ Responsive design for all devices
- ✅ Loading states and error handling

### Backend
- ✅ REST API with CORS support
- ✅ In-memory data storage (real-time)
- ✅ Input validation
- ✅ Error handling
- ✅ Health check endpoint
- ✅ Admin endpoint for viewing registrations
- ✅ Static file serving for React frontend

## 🚀 Live Application

**🌐 URL**: https://india-meetup-2025-1041941408881.europe-west1.run.app

**Event Details**:
- **Date**: November 22, 2025 (Saturday)
- **Time**: 10:00 AM - 2:00 PM IST
- **Location**: Magarpatta City, Pune, Maharashtra, India

## 📊 API Endpoints

### GET /
Serves the React frontend application

### GET /health
Health check endpoint

**Response:**
```json
{
  "status": "healthy",
  "service": "AppDirect India Meetup 2025 Backend",
  "timestamp": "2025-10-03T09:53:35Z"
}
```

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
  "id": "1"
}
```

### GET /api/registrations
Get all registrations (admin endpoint)

**Response:**
```json
[
  {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Tech Corp",
    "role": "Software Engineer",
    "createdAt": "2025-10-03T10:30:00Z"
  }
]
```

## 🛠️ Local Development

### Prerequisites

- Node.js 18+ and npm
- Go 1.21+
- Git

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Nikita-Mourya-AD/india-meetup-2025.git
cd india-meetup-2025

# Run the demo script
./demo.sh
```

### Manual Setup

#### 1. Backend Setup

```bash
# Install Go dependencies
go mod tidy

# Run the server
go run main.go
```

#### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8080

## 🐳 Docker Deployment

### Build and Run Locally

```bash
# Build the Docker image
docker build -t india-meetup-2025 .

# Run the container
docker run -p 8080:8080 india-meetup-2025
```

## ☁️ Google Cloud Run Deployment

### Prerequisites

- Google Cloud Project with billing enabled
- Cloud Run API enabled
- GitHub repository connected

### Deployment Steps

1. **Go to Cloud Run Console**:
   - Visit: https://console.cloud.google.com/run
   - Select project: `india-tech-meetup-2025`

2. **Create Service**:
   - Click "Create Service"
   - Choose "Deploy from source repository"
   - Connect GitHub account
   - Select: `Nikita-Mourya-AD/india-meetup-2025`
   - Branch: `main`

3. **Configure Build**:
   - Service name: `india-meetup-2025`
   - Region: Choose your preferred region
   - **Build type**: Use Dockerfile
   - Authentication: Allow unauthenticated invocations

4. **Deploy!**

### Alternative: Manual Deployment

```bash
# Set your project ID
export PROJECT_ID="india-tech-meetup-2025"
gcloud config set project $PROJECT_ID

# Build and deploy
gcloud run deploy india-meetup-2025 \
  --source . \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --memory=512Mi \
  --cpu=1 \
  --max-instances=10
```

## 🎯 Tech Stack

- **Frontend**: React 18 + TailwindCSS + Axios
- **Backend**: Go 1.21 + Gorilla Mux + CORS
- **Database**: In-memory storage (production-ready for Firestore)
- **Deployment**: Docker + Google Cloud Run
- **Styling**: Navy blue theme with responsive design

## 🔧 Configuration

### Environment Variables

- `PORT`: Server port (default: 8080)
- `REACT_APP_BACKEND_URL`: Backend API URL (for separate deployments)

### Build Process

The application uses a multi-stage Docker build:
1. **Build Stage**: Compiles Go backend and React frontend
2. **Runtime Stage**: Serves both frontend and API from single service

## 🚀 Development Workflow

### Adding New Features

1. **Frontend**: Add new components in `frontend/src/components/`
2. **Backend**: Add new endpoints in `main.go`
3. **Styling**: Use TailwindCSS classes for consistent design
4. **Build**: Run `npm run build` in frontend directory
5. **Deploy**: Push to GitHub for automatic Cloud Run deployment

### Testing

```bash
# Test backend API
./test-backend.sh

# Run demo
./demo.sh

# Build for production
./build.sh
```

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔒 Security

- CORS configured for cross-origin requests
- Input validation on all endpoints
- Environment-based configuration
- Security headers in production build

## 🎉 Workshop Features

Perfect for demonstrating:
- Full-stack development with modern technologies
- Cloud Run deployment best practices
- Docker containerization
- React production builds
- Single service architecture
- GitHub integration with Cloud Run

## 📞 Support

For issues or questions:
- Email: events@appdirect.com
- Create an issue in the repository

## 📄 License

This project is proprietary to AppDirect Inc.

---

**🌟 Live Demo**: https://india-meetup-2025-1041941408881.europe-west1.run.app