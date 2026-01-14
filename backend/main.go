package main

import (
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	chimw "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/ntpotraz/resume-orchestrator/internal/database"
	"github.com/ntpotraz/resume-orchestrator/internal/handlers"
	clerkmw "github.com/ntpotraz/resume-orchestrator/internal/middleware"
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
		Addr:    ":" + port,
		Handler: router,
	}

	client := database.ConnectDB(mongoURI)
	db := client.Database("resume-orchestrator")

	tags := handlers.Tags{
		Langs: map[string]string{
			"go":           "Go",
			"typescript":   "TypeScript",
			"javascript":   "JavaScript",
			"python":       "Python",
			"react":        "React",
			"html":         "HTML",
			"css":          "CSS",
			"java":         "Java",
			"c++":          "C++",
			"react native": "React Native",
		},
		Tools: map[string]string{
			"sql":        "SQL",
			"postgresql": "PostgreSQL",
			"mysql":      "MySQL",
			"linux":      "Linux",
			"ci/cd":      "CI/CD",
			"docker":     "docker",
			"aws":        "AWS",
			"gcp":        "GCP",
			"git":        "Git",
		},
	}

	h := &handlers.Config{
		DB:   db,
		Tags: tags,
	}

	router.Use(chimw.Logger)
	router.Use(chimw.Recoverer)
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
	}))

	router.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"status": "available", "environment": "dev"}`))
	})

	router.Route("/api/v1", func(r chi.Router) {
		r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusOK)
			w.Header().Set("Content-Type", "application/json")
			w.Write([]byte(`{"status": "available", "environment": "dev"}`))
		})
	r.Get("/summaries", h.GetSummary)

		r.Group(func(r chi.Router) {
			r.Use(clerkmw.Authenticate)
			r.Get("/projects", h.ListProjects)
			r.Post("/projects", h.AddProject)
			r.Delete("/projects/{id}", h.DeleteProject)

		})
	})

	log.Println("...Starting resume-orchestrator server...")

	if err := server.ListenAndServe(); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
