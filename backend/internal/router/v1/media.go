package v1

import (
	"github.com/PatibandlaVenkat/Pubo/internal/handler"
	"github.com/PatibandlaVenkat/Pubo/internal/middleware"
	"github.com/labstack/echo/v4"
)
func registerMediaRoutes(r *echo.Group,h *handler.MediaHandler,auth *middleware.AuthMiddleware){
	media:=r.Group("/media")
	// media.Use(auth.RequireAuth)
	media.POST("/upload",h.Upload)
	media.GET("",h.List)
	media.GET("/:id",h.Get)
	//media.DELETE("/:id",h.Delete)

}