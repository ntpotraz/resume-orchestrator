package main

import (
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/ntpotraz/resume-orchestrator/internal/database"
	"github.com/ntpotraz/resume-orchestrator/internal/handlers"
)

func main() {

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	mongoURI := os.Getenv("MONGO_URI") 
	if mongoURI == "" {
		mongoURI = "mongodb://localhost:27017"
	}

	router := chi.NewRouter()
	server := http.Server{
		Addr: ":" + port,
		Handler: router,
	}

	client := database.ConnectDB(mongoURI)
	db := client.Database("resume-orchestrator")
	h := &handlers.Handler{
		DB: db,
	}

	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000", "http://localhost:5173"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
	}))

	router.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"status": "available", "environment": "dev"}`))
	})
	router.Route("/api/v1", func(r chi.Router) {
		r.Get("/projects", h.ListProjects)
		r.Post("/projects", h.AddProject)

		r.Get("/summary", handlers.GetSummary)
	})

	log.Println("...Starting resume-orchestrator server...")

	if err := server.ListenAndServe(); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
