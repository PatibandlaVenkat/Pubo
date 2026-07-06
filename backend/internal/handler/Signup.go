package handler

import (
	"net/http"

	"github.com/PatibandlaVenkat/Pubo/internal/middleware"
	"github.com/PatibandlaVenkat/Pubo/internal/model/signup"
	"github.com/PatibandlaVenkat/Pubo/internal/server"
	"github.com/PatibandlaVenkat/Pubo/internal/service"
	"github.com/labstack/echo/v4"
)
type SignUpHandler struct{
	Handler
	SignUpService *service.SignUpService
}
func NewSignUpHandler(s *server.Server,SignUpService *service.SignUpService)(*SignUpHandler){
	return &SignUpHandler{
		Handler: NewHandler(s),
		SignUpService: SignUpService,
	}
}
func(h*SignUpHandler) SignUp(c echo.Context)error{
	return Handle(
		h.Handler,
		func(c echo.Context,payload *signup.SignUpPayload) (*signup.SignUp,error){
			userId:=middleware.GetUserID(c)
			return h.SignUpService.SignUp(c,payload,userId)
		},
		http.StatusOK,
		&signup.SignUpPayload{},
	)(c)
}