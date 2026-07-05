package v1

import (
	"github.com/PatibandlaVenkat/Pubo/internal/handler"
	"github.com/labstack/echo/v4"
)

func resiterSignUpRoute(r*echo.Group,h *handler.SignUpHandler){
	signup:=r.Group("/signup")
	signup.POST("",h.SignUp())
}