package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/go-chi/chi/v5"
	"github.com/ntpotraz/resume-orchestrator/internal/models"
	"go.mongodb.org/mongo-driver/v2/bson"
)

func (cfg *Config) ListSummaries(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	claims, ok := clerk.SessionClaimsFromContext(ctx)
	if !ok {
		http.Error(w, "Unauthorized to get summaries", http.StatusUnauthorized)
		return
	}

	collection := cfg.DB.Collection("summaries")
	filter := bson.M{"user_id": claims.Subject}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var summaries []models.Summary
	if err := cursor.All(ctx, &summaries); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(summaries)
}

func (cfg *Config) AddSummary(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Body string `json:"body"`
	}

	ctx := r.Context()
	claims, ok := clerk.SessionClaimsFromContext(ctx)
	if !ok {
		http.Error(w, "Unauthorized to add summary", http.StatusUnauthorized)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Could not decode payload", http.StatusBadRequest)
		return
	}

	summary := models.Summary{
		UserID: claims.Subject,
		Body:   input.Body,
	}

	collection := cfg.DB.Collection("summaries")
	result, err := collection.InsertOne(ctx, summary)
	if err != nil {
		http.Error(w, "Failed to post summary", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(result)
}

func (cfg *Config) DeleteSummary(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")

	oid, err := bson.ObjectIDFromHex(idStr)
	if err != nil {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	ctx := r.Context()
	claims, ok := clerk.SessionClaimsFromContext(ctx)
	if !ok {
		http.Error(w, "Unauthorized to delete summary", http.StatusUnauthorized)
		return
	}

	collection := cfg.DB.Collection("summaries")
	filter := bson.M{
		"_id":     oid,
		"user_id": claims.Subject,
	}

	result, err := collection.DeleteOne(ctx, filter)
	if err != nil {
		http.Error(w, "Failed to delete summary", http.StatusInternalServerError)
		return
	}
	if result.DeletedCount == 0 {
		http.Error(w, "Invalid summary id or Unauthorized", http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
