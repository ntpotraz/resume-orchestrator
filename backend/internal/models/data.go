package models

import (
	"go.mongodb.org/mongo-driver/v2/bson"
)

type Project struct {
	ID          bson.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID      string        `bson:"user_id" json:"user_id"`
	Title       string        `bson:"title" json:"title"`
	URL         string        `bson:"url,omitempty" json:"url,omitempty"`
	DateRange   string        `bson:"date_range" json:"date_range"`
	Description []string      `bson:"description" json:"description"`
	Tags        []string      `bson:"tags" json:"tags"`
	IsSelected  bool          `bson:"is_selected" json:"is_selected"`
	Order       int           `bson:"order" json:"order"`
}

type Summary struct {
	// ID     bson.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID string        `bson:"user_id" json:"user_id"`
	Body   string        `bson:"body" json:"body"`
}
