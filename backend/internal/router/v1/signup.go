package v1

import (
	"github.com/PatibandlaVenkat/Pubo/internal/handler"
	"github.com/PatibandlaVenkat/Pubo/internal/middleware"
	"github.com/labstack/echo/v4"
	
)

func registerSignUpRoute(r*echo.Group,h *handler.SignUpHandler,auth *middleware.AuthMiddleware){
	signup:=r.Group("/signup")
	signup.Use(auth.RequireAuth)
	signup.POST("",h.SignUp)
}