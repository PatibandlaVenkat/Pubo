package handler

import "github.com/PatibandlaVenkat/Pubo/internal/server"

type HealthHandler struct{
	Handler
}

func NewHealthHandler(s*server.Server) *HealthHandler{
	return &HealthHandler{
		Handler: NewHandler(s),
	}
}