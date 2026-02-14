package handler

import (
	"time"

	"github.com/PatibandlaVenkat/Pubo/internal/middleware"
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
func(h JSONResponseHandler) AddAttributes(txn *newrelic.Transaction,result interface{}){
	//http status code is set by the tracing middlware
}

type NoContentResponseHandler struct{
	status int
}
func(h NoContentResponseHandler)Handle(c echo.Context,result interface{}) error{
return c.NoContent(h.status)
}

func(h NoContentResponseHandler) GetOperation() string{
	return "handler_no_content"
}

func(h NoContentResponseHandler) AddAttributes(txn *newrelic.Transaction,result interface{}){
	//http status code setup by the tracing middlware
}

//file responsehandler handles file resposes

type FileResponseHandler struct{
	status int
	filename string
	contentType string
}
func(h FileResponseHandler) Handle(c echo.Context,result interface{}) error{
	data:=result.([]byte)
	c.Response().Header().Set("Content-Disposition","attachment; filename="+h.filename)
	return c.Blob(h.status,h.contentType,data)

}
func(h FileResponseHandler) GetOperation() string{
	return "handle_file"
}

func(h FileResponseHandler)AddAttributes(txn *newrelic.Transaction,result interface{}){
	if txn!=nil{
		txn.AddAttribute("filename",h.filename)
		txn.AddAttribute("file.content_type",h.contentType)
		if data,ok:=result.([]byte); ok{
			txn.AddAttribute("file.size_bytes", len(data))
		}
	}
}

func handleRequest[Req validation.Validatable](
	c echo.Context,
	req Req,
	handler func(c echo.Context,req Req)(interface{},error),
	responseHandler ResponseHandler,
) error{
	start:=time.Now()
	method:=c.Request.Method
	path:=c.Path()
	route:=path
	txn:=newrelic.FromContext(c.Request().Context())
	if txn!=nil{
		txn.AddAttribute("handler.name",route)
		responseHandler.AddAttributes(txn,nil)
	}
	loggerBuilder:=middleware.GetLogger(c).With().
}