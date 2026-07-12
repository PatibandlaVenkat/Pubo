package v1

import (
	"github.com/PatibandlaVenkat/Pubo/internal/handler"
	"github.com/PatibandlaVenkat/Pubo/internal/middleware"
	"github.com/labstack/echo/v4"
)

func RegisterLinkedinRoutes(r *echo.Group,h *handler.LinkedinHandler,auth *middleware.AuthMiddleware){
	linkedin:=r.Group("/linkedin")
	linkedin.Use(auth.RequireAuth)
	linkedin.POST("/connect",h.ConnectLinkedin)
}