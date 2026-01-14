package handlers

import (
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type Config struct {
	DB *mongo.Database
	Tags Tags
}

type Tags struct {
	Langs map[string]string
	Tools map[string]string
}

