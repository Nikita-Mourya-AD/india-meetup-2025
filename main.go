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