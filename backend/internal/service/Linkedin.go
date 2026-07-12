package service

import (
	"github.com/PatibandlaVenkat/Pubo/internal/middleware"
	linkedin "github.com/PatibandlaVenkat/Pubo/internal/model/Linkedin"
	"github.com/PatibandlaVenkat/Pubo/internal/repository"
	"github.com/PatibandlaVenkat/Pubo/internal/server"
	"github.com/labstack/echo/v4"
)
type LinkedinService struct{
	server *server.Server
	LikedinRepository *repository.LinkedinRepository

}
func NewLinkedinService(s *server.Server,r *repository.LinkedinRepository)(*LinkedinService){
	return &LinkedinService{
		server:s,
		LikedinRepository: r,
	}

}
func(s*LinkedinService)CreateLinkedinConnection(ctx echo.Context,userId string,payload *linkedin.CreateLinkedinConnectionPayload)(*linkedin.LinkedInConnectedAccount,error){
	logger:=middleware.GetLogger(ctx)
	LinkedinItem,err:=s.LikedinRepository.ConnectLinkedinAccount(ctx.Request().Context(),userId,*payload)
	if err!=nil{
	logger.Error().Err(err).Msg("failed to connect Linkedin account")
	return nil,err
	}
	eventLogger:=middleware.GetLogger(ctx)
	eventLogger.Info().Str("event","linkedin_account_created").Msg("LinkedIn Account successfully connected")
	return LinkedinItem,nil

}
