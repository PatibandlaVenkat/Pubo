package v1

import (
	"github.com/PatibandlaVenkat/Pubo/internal/handler"

	"github.com/labstack/echo/v4"
)

func registerQuoteRoutes(r *echo.Group, h *handler.QuoteHandler) {
	quotes := r.Group("/quotes")
	quotes.GET("", h.GetQuote)
	quotes.GET("/refresh", h.RefreshQuotes)
}

