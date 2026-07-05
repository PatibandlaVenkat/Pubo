package handler

import (
	"net/http"

	"github.com/PatibandlaVenkat/Pubo/internal/middleware"
	bluesky "github.com/PatibandlaVenkat/Pubo/internal/model/Bluesky"
	"github.com/PatibandlaVenkat/Pubo/internal/server"
	"github.com/PatibandlaVenkat/Pubo/internal/service"
	"github.com/labstack/echo/v4"
)
type BlueskyHandler struct{
	Handler
	blueskyService *service.BlueskyService
}
func NewBlueskyHandler(s *server.Server,blueskyService *service.BlueskyService)*BlueskyHandler{
	return &BlueskyHandler{
		Handler:NewHandler(s),
		blueskyService: blueskyService,
	}
}
func(h *BlueskyHandler) ConnectBluesky(c echo.Context) error{
	return Handle(
		h.Handler,
		func(c echo.Context,payload *bluesky.CreateBlueskyConnectionPayload)(*bluesky.ConnectedAccounts,error){
			userID:=middleware.GetUserID(c)
			return h.blueskyService.ConnectBluesky(c,userID,payload)
		},
		http.StatusCreated,
		&bluesky.CreateBlueskyConnectionPayload{},
	)(c)
}