package handler

import (
	"net/http"
	"github.com/labstack/echo/v4"

	Quotes "github.com/PatibandlaVenkat/Pubo/internal/model/Quotes"
	"github.com/PatibandlaVenkat/Pubo/internal/server"
	"github.com/PatibandlaVenkat/Pubo/internal/service"
)

type QuoteHandler struct {
	Handler
	QuoteService *service.QuoteService
}
type EmptyRequest struct{}
func(r EmptyRequest) Validate() error{
	return nil
}

func NewQuoteHandler(s *server.Server,QuoteService *service.QuoteService ) * QuoteHandler{
	return &QuoteHandler{
		Handler: NewHandler(s),
		QuoteService:QuoteService,
	}
}
func(h*QuoteHandler) GetQuote(c echo.Context) error{
	return Handle(
		h.Handler,
		func(c echo.Context,req EmptyRequest)(Quotes.Quote,error){
			quote:=h.QuoteService.NextQuote()
			return quote,nil
		},
		http.StatusOK,
		EmptyRequest{},

		
	)(c)
}
func(h *QuoteHandler) RefreshQuotes(c echo.Context) error{
	return HandleNoContent(
		h.Handler,
		func(c echo.Context, req EmptyRequest) error{
			h.QuoteService.FetchQuotes()
			return nil
		},
		http.StatusOK,
		EmptyRequest{},
	)(c)
}