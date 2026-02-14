package middleware

import (
	"github.com/PatibandlaVenkat/Pubo/internal/errs"
	"github.com/PatibandlaVenkat/Pubo/internal/server"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)
type GlobalMiddleWares struct{
	server *server.Server
}
func NewGlobalMiddleWares(s *server.Server) *GlobalMiddleWares{
	return &GlobalMiddleWares{
		server: s,
	}
}

func(global *GlobalMiddleWares) CORS() echo.MiddlewareFunc{
	return middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: global.server.Config.Server.CORSAllowedOrigins,
	})
}
func(global *GlobalMiddleWares) RequestLogger() echo.MiddlewareFunc{
	return middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{
		LogURI:     true,
		LogStatus:  true,
		LogError:   true,
		LogLatency: true,
		LogHost:    true,
		LogMethod:  true,
		LogURIPath: true,
		LogValuesFunc: func(c echo.Context,v middleware.RequestLoggerValues) error{
statusCode:=v.Status
if v.Error!=nil{
	var httpErr *errs.HTTPError
	var echoErr *echo.HTTPError
	if errors.As(v.Error,&echoErr){
		statusCode=echoErr.Code
	}
}
logger:=GetLogger(c)
var e*
		},

		
	})
}