package service

import (
	"github.com/PatibandlaVenkat/Pubo/internal/lib/job"
	"github.com/PatibandlaVenkat/Pubo/internal/lib/storage"
	"github.com/PatibandlaVenkat/Pubo/internal/repository"
	"github.com/PatibandlaVenkat/Pubo/internal/server"
)
type Services struct{
	Auth *AuthService
	Job *job.JobService
	Quotes *QuoteService
	MediaService *MediaService
}
func NewServices(s *server.Server,repos *repository.Repositories)(*Services,error){
	authService:=NewAuthService(s)
	QuoteService:=NewQuoteService(s)
	blobClient,err:=storage.NewAzureBlobClient(s.Config)
	if err!=nil{
		return nil,err
	}
	mediaService:=NewMediaService(s,*repos.Media,blobClient)
	return &Services{
		Job:s.Job,
		Auth: authService,
		Quotes: QuoteService,
		MediaService: mediaService,
	},nil
}