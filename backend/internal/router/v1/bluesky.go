package v1

import (
	"github.com/PatibandlaVenkat/Pubo/internal/handler"
	"github.com/PatibandlaVenkat/Pubo/internal/middleware"
	"github.com/labstack/echo/v4"
)
func registerBlueskyRoutes(r * echo.Group,h *handler.BlueskyHandler,auth *middleware.AuthMiddleware){
	bluesky:=r.Group("/bluesky")
	bluesky.Use(auth.RequireAuth)
	bluesky.POST("/connect",h.ConnectBluesky)
}