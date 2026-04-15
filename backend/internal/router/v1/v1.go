package v1

import (
	"github.com/PatibandlaVenkat/Pubo/internal/handler"
	"github.com/PatibandlaVenkat/Pubo/internal/middleware"
	"github.com/labstack/echo/v4"
)

func RegisterV1Routes(router *echo.Group, handlers *handler.Handlers,middlewares * middleware.MiddleWares){
	registerQuoteRoutes(router,handlers.Quotes,middlewares.Auth)
	registerMediaRoutes(router,handlers.Media,middlewares.Auth)
}