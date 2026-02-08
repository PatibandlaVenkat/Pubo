package repository

import "github.com/PatibandlaVenkat/Pubo/internal/server"

type Repositories struct{

}
func NewRepositories(s *server.Server) *Repositories{
	return &Repositories{}
}