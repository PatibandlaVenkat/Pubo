package handler

import (
	"github.com/PatibandlaVenkat/Pubo/internal/server"
	"github.com/PatibandlaVenkat/Pubo/internal/validation"
	"github.com/labstack/echo/v4"
	"github.com/newrelic/go-agent/v3/newrelic"
)

type Handler struct{
	server *server.Server
}

func NewHandler(s *server.Server) Handler{
	return Handler{
		server: s,
	}
}
type HandlerFunc[Req validation.Validatable,Res any] func(c echo.Context,req Req) (Res,error)

type HanlderFuncNoContent[Req validation.Validatable] func(c echo.Context,req Req) error

type ResponseHandler interface{
	Handle(c echo.Context,result interface{}) error
	GetOperation() string
	AddAttributes(txn *newrelic.Transaction,result interface{})
}
type JSONResponseHandler struct{
	status int
}
func (h JSONResponseHandler) GetOperation() string{
	return "hanlder"
}
func (h JSONResponseHandler) Handle(c echo.Context,result interface{}) error{
	return c.JSON(h.status,result)
}