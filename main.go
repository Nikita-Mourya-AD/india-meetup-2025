package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

// Registration represents a user registration
type Registration struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Company   string    `json:"company"`
	Role      string    `json:"role"`
	CreatedAt time.Time `json:"createdAt"`
}

// RegistrationRequest represents the incoming registration data
type RegistrationRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Company string `json:"company"`
	Role    string `json:"role"`
}

// In-memory storage
var (
	registrations []Registration
	mu            sync.RWMutex
	nextID        int
)

func main() {
	// Initialize in-memory storage
	registrations = make([]Registration, 0)
	nextID = 1

	// Setup router
	r := mux.NewRouter()

	// API routes
	api := r.PathPrefix("/api").Subrouter()
	api.HandleFunc("/register", registerHandler).Methods("POST")
	api.HandleFunc("/registrations", getRegistrationsHandler).Methods("GET")

	// Health check endpoint
	r.HandleFunc("/health", healthHandler).Methods("GET")

	// Serve a simple frontend page
	r.HandleFunc("/", frontendHandler).Methods("GET")

	// CORS configuration
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"*"},
	})

	handler := c.Handler(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("🚀 AppDirect India Meetup 2025 Backend starting on port %s", port)
	log.Printf("📊 Using in-memory storage for registrations")
	log.Fatal(http.ListenAndServe(":"+port, handler))
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status":    "healthy",
		"service":   "AppDirect India Meetup 2025 Backend",
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func frontendHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	html := `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AppDirect India Meetup 2025</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.8s ease-out; }
    </style>
</head>
<body class="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
    <div class="container mx-auto px-4 py-8 animate-fade-in">
        <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-12">
                <h1 class="text-5xl font-bold text-gray-900 mb-4">🚀 AppDirect India Meetup 2025</h1>
                <p class="text-xl text-gray-600 mb-6">November 22, 2025 (Saturday) • 10:00 AM - 2:00 PM IST</p>
                <p class="text-lg text-gray-700">📍 Magarpatta City, Pune, Maharashtra, India</p>
            </div>

            <!-- Status Card -->
            <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">✅ Backend Status</h2>
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-green-50 p-4 rounded-lg">
                        <h3 class="font-semibold text-green-800">Backend API</h3>
                        <p class="text-green-600">✅ Running and healthy</p>
                        <p class="text-sm text-gray-600 mt-2">URL: <code class="bg-gray-100 px-2 py-1 rounded">https://india-meetup-2025-1041941408881.europe-west1.run.app</code></p>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h3 class="font-semibold text-blue-800">Available Endpoints</h3>
                        <ul class="text-blue-600 text-sm space-y-1">
                            <li>• <code>/health</code> - Health check</li>
                            <li>• <code>/api/register</code> - Register user</li>
                            <li>• <code>/api/registrations</code> - List registrations</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Quick Test -->
            <div class="bg-white rounded-lg shadow-lg p-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">🧪 Quick API Test</h2>
                <div class="space-y-4">
                    <button onclick="testHealth()" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Test Health Endpoint
                    </button>
                    <button onclick="testRegistrations()" class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Test Registrations API
                    </button>
                    <div id="result" class="mt-4 p-4 bg-gray-50 rounded-lg hidden">
                        <h3 class="font-semibold mb-2">API Response:</h3>
                        <pre id="response" class="text-sm bg-white p-3 rounded border overflow-x-auto"></pre>
                    </div>
                </div>
            </div>

            <!-- Next Steps -->
            <div class="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-yellow-800 mb-2">🚀 Next Steps</h3>
                <p class="text-yellow-700 mb-4">Your backend is working perfectly! To complete the setup:</p>
                <ol class="list-decimal list-inside text-yellow-700 space-y-2">
                    <li>Deploy the React frontend to Cloud Run</li>
                    <li>Set the backend URL in frontend environment variables</li>
                    <li>Your full-stack application will be live!</li>
                </ol>
            </div>
        </div>
    </div>

    <script>
        async function testHealth() {
            try {
                const response = await fetch('/health');
                const data = await response.json();
                showResult('Health Check', data);
            } catch (error) {
                showResult('Health Check Error', { error: error.message });
            }
        }

        async function testRegistrations() {
            try {
                const response = await fetch('/api/registrations');
                const data = await response.json();
                showResult('Registrations API', data);
            } catch (error) {
                showResult('Registrations API Error', { error: error.message });
            }
        }

        function showResult(title, data) {
            document.getElementById('result').classList.remove('hidden');
            document.getElementById('response').textContent = title + ':\n' + JSON.stringify(data, null, 2);
        }
    </script>
</body>
</html>`
	w.Write([]byte(html))
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	var req RegistrationRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	// Validate required fields
	if req.Name == "" || req.Email == "" || req.Company == "" || req.Role == "" {
		http.Error(w, "All fields are required", http.StatusBadRequest)
		return
	}

	// Create registration
	mu.Lock()
	registration := Registration{
		ID:        string(rune(nextID)),
		Name:      req.Name,
		Email:     req.Email,
		Company:   req.Company,
		Role:      req.Role,
		CreatedAt: time.Now(),
	}
	registrations = append(registrations, registration)
	nextID++
	mu.Unlock()

	log.Printf("✅ New registration: %s (%s) from %s", req.Name, req.Email, req.Company)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Registration successful",
		"id":      registration.ID,
	})
}

func getRegistrationsHandler(w http.ResponseWriter, r *http.Request) {
	mu.RLock()
	defer mu.RUnlock()

	// Return registrations in reverse chronological order
	result := make([]Registration, len(registrations))
	for i, reg := range registrations {
		result[len(registrations)-1-i] = reg
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}