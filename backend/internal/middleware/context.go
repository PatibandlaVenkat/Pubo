package middleware

import (
	"github.com/PatibandlaVenkat/Pubo/internal/server"
	"github.com/labstack/echo/v4"
)
const(
	UserIDKey="user_id"
	UserRoleKey="user_role"
	LoggerKey="logger"
)

type ContextEnhancer struct{
	server *server.Server

}
func NewContextEnhancer(S *server.Server) *ContextEnhancer{
	return &ContextEnhancer{
		server:S
	}
}

func(ce *ContextEnhancer) EnhanceContext() echo.MiddlewareFunc{
	return func(next echo.HandlerFunc) echo.HandlerFunc{
		return func(c echo.Context) error{
			requestID:=GetRequestID(c)
			contexLogger:=ce.server.Logger.With().Str(
				"request_id",requestID
			).Str("method",c.Request().Method).Str("path",c.Path()).Str("ip",c.RealIP()).Logger()
		}
	}
}