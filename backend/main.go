package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	"cloud.google.com/go/firestore"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"google.golang.org/api/option"
)

// Registration represents a user registration
type Registration struct {
	ID        string    `json:"id" firestore:"id"`
	Name      string    `json:"name" firestore:"name"`
	Email     string    `json:"email" firestore:"email"`
	Company   string    `json:"company" firestore:"company"`
	Role      string    `json:"role" firestore:"role"`
	CreatedAt time.Time `json:"createdAt" firestore:"createdAt"`
}

// RegistrationRequest represents the incoming registration data
type RegistrationRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Company string `json:"company"`
	Role    string `json:"role"`
}

var firestoreClient *firestore.Client

func main() {
	// Initialize Firestore client
	ctx := context.Background()
	
	// Check if we're running in Cloud Run (service account) or locally
	var client *firestore.Client
	var err error
	
	if os.Getenv("GOOGLE_APPLICATION_CREDENTIALS") != "" {
		// Running locally with service account key
		client, err = firestore.NewClient(ctx, "india-tech-meetup-2025", option.WithCredentialsFile(os.Getenv("GOOGLE_APPLICATION_CREDENTIALS")))
	} else {
		// Running in Cloud Run with default service account
		client, err = firestore.NewClient(ctx, "india-tech-meetup-2025")
	}
	
	if err != nil {
		log.Fatalf("Failed to create Firestore client: %v", err)
	}
	firestoreClient = client
	defer client.Close()

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

	log.Printf("Server starting on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "healthy"})
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
	registration := Registration{
		Name:      req.Name,
		Email:     req.Email,
		Company:   req.Company,
		Role:      req.Role,
		CreatedAt: time.Now(),
	}

	// Save to Firestore
	ctx := context.Background()
	docRef, _, err := firestoreClient.Collection("registrations").Add(ctx, registration)
	if err != nil {
		log.Printf("Error saving registration: %v", err)
		http.Error(w, "Failed to save registration", http.StatusInternalServerError)
		return
	}

	// Update the registration with the generated ID
	registration.ID = docRef.ID
	_, err = docRef.Set(ctx, registration)
	if err != nil {
		log.Printf("Error updating registration with ID: %v", err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Registration successful",
		"id":      registration.ID,
	})
}

func getRegistrationsHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	
	// Get all registrations
	iter := firestoreClient.Collection("registrations").OrderBy("createdAt", firestore.Desc).Documents(ctx)
	defer iter.Stop()

	var registrations []Registration
	for {
		doc, err := iter.Next()
		if err != nil {
			break
		}

		var reg Registration
		if err := doc.DataTo(&reg); err != nil {
			log.Printf("Error parsing registration: %v", err)
			continue
		}
		registrations = append(registrations, reg)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(registrations)
}
