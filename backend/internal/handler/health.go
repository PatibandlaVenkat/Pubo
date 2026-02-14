package handler

import (
	"time"

	"github.com/PatibandlaVenkat/Pubo/internal/server"
	"github.com/labstack/echo/v4"
)

type HealthHandler struct{
	Handler
}

func NewHealthHandler(s*server.Server) *HealthHandler{
	return &HealthHandler{
		Handler: NewHandler(s),
	}
}
func(h *HealthHandler) CheckHealth(c echo.Context) error{
start:=time.Now()
logger:=middlw
}