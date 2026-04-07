package handler

import (
	"net/http"

	"github.com/PatibandlaVenkat/Pubo/internal/middleware"
	"github.com/PatibandlaVenkat/Pubo/internal/model/media"
	"github.com/PatibandlaVenkat/Pubo/internal/server"
	"github.com/PatibandlaVenkat/Pubo/internal/service"
	"github.com/labstack/echo/v4"
)

type MediaHandler struct {
	Handler
	MediaService *service.MediaService
}
func NewMediaHandler(s *server.Server,MediaService service.MediaService)(*MediaHandler){
	return &MediaHandler{
		Handler: NewHandler(s),
		MediaService: &MediaService,
	}
}
func(h *MediaHandler) Upload(c echo.Context) error{
	return Handle(
		h.Handler,
		func(c echo.Context,req EmptyRequest)(*media.Asset,error){
			userID:=middleware.GetUserID(c)
			fileHeader,err:=c.FormFile("file")
			folder:=c.FormValue("folder")
			return h.MediaService.Upload(c.Request().Context(),userID,fileHeader,folder)
			

		},
		http.StatusCreated,
		&EmptyRequest{}
	)(c)
}