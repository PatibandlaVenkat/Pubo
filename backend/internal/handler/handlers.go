package handler

import "github.com/PatibandlaVenkat/Pubo/internal/server"

type Handlers struct{
	Health *HealthHandler
	OpenAPI *OpenAPIHandler
}
func NewHandlers(s*server.Server,services *service.Services) *Handlers{
	return &Handlers{
		Health:NewHeatlhHandler(s),
		OpenAPI:NewOpenAPIHandler(s),
	}
}