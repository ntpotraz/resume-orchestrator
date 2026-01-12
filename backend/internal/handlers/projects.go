package handlers

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/go-chi/chi/v5"
	"github.com/ntpotraz/resume-orchestrator/internal/models"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type Handler struct {
	DB *mongo.Database
}

func (h *Handler) ListProjects(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	claims, ok := clerk.SessionClaimsFromContext(ctx)
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	collection := h.DB.Collection("projects")
	filter := bson.M{"user_id": claims.Subject}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(context.Background())

	var projects []models.Project
	if err := cursor.All(context.Background(), &projects); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(projects)
}

func (h *Handler) AddProject(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Title       string   `json:"title"`
		URL         string   `json:"url"`
		DateRange   string   `json:"date_range"`
		Description []string `json:"description"`
		Tags        []string `json:"tags"`
	}

	claims, ok := clerk.SessionClaimsFromContext(r.Context())
	if !ok {
		http.Error(w, "Unauthorized project creation", http.StatusUnauthorized)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	project := models.Project{
		UserID:      claims.Subject,
		Title:       input.Title,
		URL:         input.URL,
		DateRange:   input.DateRange,
		Description: input.Description,
		Tags:        input.Tags,
		IsSelected:  true,
		Order:       0,
	}

	collection := h.DB.Collection("projects")
	result, err := collection.InsertOne(r.Context(), project)
	if err != nil {
		http.Error(w, "Failed to create project: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(result)
}

func (h *Handler) DeleteProject(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")

	oid, err := bson.ObjectIDFromHex(idStr)
	if err != nil {
		http.Error(w, "Invalid project ID format", http.StatusBadRequest)
		return
	}

	ctx := r.Context()
	claims, ok := clerk.SessionClaimsFromContext(ctx)
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	collection := h.DB.Collection("projects")
	filter := bson.M{
		"_id": oid,
		"user_id": claims.Subject,
	}

	result, err := collection.DeleteOne(ctx, filter)
	if err != nil {
		http.Error(w, "Failed to delete project: "+err.Error(), http.StatusInternalServerError)
		return
	}
	if result.DeletedCount == 0 {
		http.Error(w, "Project not found", http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
