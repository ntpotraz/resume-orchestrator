package handlers

import (
	"net/http"
)

func GetSummary(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"summary": "Results-driven Full Stack Engineer with 4+ years of experience architecting full-stack solutions. Expertise in $(langs) backend development, and React/TypeScript frontend. Seeking a Full Stack Engineering role to build innovative solutions."}`))
}
