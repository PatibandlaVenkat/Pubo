package service

import (
	"github.com/PatibandlaVenkat/Pubo/internal/lib/job"
	"github.com/PatibandlaVenkat/Pubo/internal/repository"
	"github.com/PatibandlaVenkat/Pubo/internal/server"
)
type Services struct{
	Auth *AuthService
	Job *job.JobService
	Quotes *QuoteService
}
func NewServices(s *server.Server,repos *repository.Repositories)(*Services,error){
	authService:=NewAuthService(s)
	QuoteService:=NewQuoteService(s)
	return &Services{
		Job:s.Job,
		Auth: authService,
		Quotes: QuoteService,
	},nil
}