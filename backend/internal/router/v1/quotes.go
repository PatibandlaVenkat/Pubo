package v1

import (
	"github.com/PatibandlaVenkat/Pubo/internal/handler"
	"github.com/PatibandlaVenkat/Pubo/internal/middleware"
	

	"github.com/labstack/echo/v4"
)

func registerQuoteRoutes(r *echo.Group, h *handler.QuoteHandler,auth *middleware.AuthMiddleware) {
	quotes := r.Group("/quotes")
	// quotes.Use(auth.RequireAuth)
	quotes.GET("", h.GetQuote)
	quotes.GET("/refresh", h.RefreshQuotes)
}

  