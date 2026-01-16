package handlers

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/go-chi/chi/v5"
	"github.com/ntpotraz/resume-orchestrator/internal/models"
	"go.mongodb.org/mongo-driver/v2/bson"
)

func (cfg *Config) ListWork(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	claims, ok := clerk.SessionClaimsFromContext(ctx)
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	collection := cfg.DB.Collection("work")
	filter := bson.M{"user_id": claims.Subject}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var works []models.Work
	if err := cursor.All(ctx, &works); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(works)
}

func (cfg *Config) AddWork(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Title       string   `json:"title"`
		Company     string   `json:"company"`
		DateRange   string   `json:"date_range"`
		Description []string `json:"description"`
		Tags        []string `json:"tags"`
	}

	claims, ok := clerk.SessionClaimsFromContext(r.Context())
	if !ok {
		http.Error(w, "Unauthorized work creation", http.StatusUnauthorized)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	var sanitized []string
	for _, raw := range input.Tags {
		cleanTag := strings.ToLower(strings.TrimSpace(raw))

		if canon, exists := cfg.Tags.Langs[cleanTag]; exists {
			sanitized = append(sanitized, canon)
		} else if canon, exists := cfg.Tags.Tools[cleanTag]; exists {
			sanitized = append(sanitized, canon)
		} else {
			sanitized = append(sanitized, raw)
		}
	}

	work := models.Work{
		UserID:      claims.Subject,
		Title:       input.Title,
		Company:     input.Company,
		DateRange:   input.DateRange,
		Description: input.Description,
		Tags:        sanitized,
		IsSelected:  true,
		Order:       0,
	}

	collection := cfg.DB.Collection("work")
	result, err := collection.InsertOne(r.Context(), work)
	if err != nil {
		http.Error(w, "Failed to create work: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(result)
}

func (cfg *Config) DeleteWork(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")

	oid, err := bson.ObjectIDFromHex(idStr)
	if err != nil {
		http.Error(w, "Invalid work ID format", http.StatusBadRequest)
		return
	}

	ctx := r.Context()
	claims, ok := clerk.SessionClaimsFromContext(ctx)
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	collection := cfg.DB.Collection("work")
	filter := bson.M{
		"_id":     oid,
		"user_id": claims.Subject,
	}

	result, err := collection.DeleteOne(ctx, filter)
	if err != nil {
		http.Error(w, "Failed to delete work: "+err.Error(), http.StatusInternalServerError)
		return
	}
	if result.DeletedCount == 0 {
		http.Error(w, "Work not found", http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
