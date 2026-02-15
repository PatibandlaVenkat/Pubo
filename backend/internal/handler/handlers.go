package handler

import (
	"github.com/PatibandlaVenkat/Pubo/internal/server"
	"github.com/PatibandlaVenkat/Pubo/internal/service"
)

type Handlers struct{
	Health *HealthHandler
	OpenAPI *OpenAPIHandler
}
func NewHandlers(s*server.Server,services *service.Services) *Handlers{
	return &Handlers{
		Health:NewHealthHandler(s),
		OpenAPI:NewOpenAPIHanlder(s),
	}
}