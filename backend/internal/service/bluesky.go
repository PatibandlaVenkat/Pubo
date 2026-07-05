package service

import (
	"github.com/PatibandlaVenkat/Pubo/internal/middleware"
	bluesky "github.com/PatibandlaVenkat/Pubo/internal/model/Bluesky"
	"github.com/PatibandlaVenkat/Pubo/internal/repository"
	"github.com/PatibandlaVenkat/Pubo/internal/server"
	"github.com/labstack/echo/v4"
)
type BlueskyService struct{
	server *server.Server
	blueskyrepo *repository.BlueskyRepository
}
func NewBlueskyService(s *server.Server,blueskyrepo *repository.BlueskyRepository) (*BlueskyService){
	return &BlueskyService{
		server:s,
		blueskyrepo: blueskyrepo,

	}
}
func (s*BlueskyService) ConnectBluesky(ctx echo.Context,userID string,payload *bluesky.CreateBlueskyConnectionPayload)(*bluesky.ConnectedAccounts,error){
	logger:=middleware.GetLogger(ctx)
	BlueskyItem,err:=s.blueskyrepo.ConnectAccounts(ctx.Request().Context(),userID,payload)
	if err!=nil{
		logger.Error().Err(err).Msg("failed to connect bluesky account")
		return nil,err
	}
	//bussiness event logging
	eventLogger:=middleware.GetLogger(ctx)
	eventLogger.Info().Str("event","bluesky_account_connected").Msg("Bluesky account successfully created")
	
return BlueskyItem,nil

}
