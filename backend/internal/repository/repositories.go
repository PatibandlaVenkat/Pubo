package repository

import "github.com/PatibandlaVenkat/Pubo/internal/server"

type Repositories struct{
	Media *MediaRepository

}
func NewRepositories(s *server.Server) *Repositories{
	return &Repositories{
		Media:NewMediaRepository(s),
	}
}