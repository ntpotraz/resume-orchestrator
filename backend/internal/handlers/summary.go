package handlers

import (
	"fmt"
	"log"
	"net/http"

	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/ntpotraz/resume-orchestrator/internal/models"
	"go.mongodb.org/mongo-driver/v2/bson"
)

func (cfg *Config) GetSummary(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	claims, ok := clerk.SessionClaimsFromContext(ctx)
	if !ok {
		http.Error(w, "Unauthorized to get summaries", http.StatusUnauthorized)
		return
	}

	collection := cfg.DB.Collection("summaries")
	// filter := bson.M{"user_id": claims.Subject}
	filter := bson.M{}

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
	// json.NewEncoder(w).Encode(summaries)

	response := fmt.Sprintf(`{"user_id": "%v", "body": "Results-driven Full Stack Engineer with 4+ years of experience architecting full-stack solutions. Expertise in $(langs) backend development, and React/TypeScript frontend. Seeking a Full Stack Engineering role to build innovative solutions."}`, claims.Subject)
	log.Printf("Json: %v", response)
	w.Write([]byte(response))
}
