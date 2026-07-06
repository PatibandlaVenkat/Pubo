package service

import (
	"github.com/PatibandlaVenkat/Pubo/internal/middleware"
	"github.com/PatibandlaVenkat/Pubo/internal/model/signup"
	"github.com/PatibandlaVenkat/Pubo/internal/repository"
	"github.com/PatibandlaVenkat/Pubo/internal/server"
	"github.com/labstack/echo/v4"
)
type SignUpService struct{
	server *server.Server
	SignUpRepo *repository.SignupRepository
}
func NewSignUpService(server *server.Server,SignupRepo *repository.SignupRepository)(*SignUpService){
	return &SignUpService{
		server: server,
		SignUpRepo: SignupRepo,
	}
}
func(s *SignUpService) SignUp(ctx echo.Context,payload *signup.SignUpPayload,userID string)(*signup.SignUp,error){
	logger:=middleware.GetLogger(ctx)
	SignUpItem,err:=s.SignUpRepo.SignUp(ctx.Request().Context(),payload,userID)
	if err!=nil{
		logger.Error().Err(err).Msg("failed to signup")
		return nil,err
	}
	EventLogger:=middleware.GetLogger(ctx)
	EventLogger.Info().Str("event","signUp_successfult")
	return SignUpItem,nil



}