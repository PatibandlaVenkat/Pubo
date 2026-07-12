package repository

import "github.com/PatibandlaVenkat/Pubo/internal/server"

type Repositories struct{
	Media *MediaRepository
	Bluesky *BlueskyRepository
	Signup *SignupRepository
	Linkedin *LinkedinRepository

}
func NewRepositories(s *server.Server) *Repositories{
	return &Repositories{
		Media:NewMediaRepository(s),
		Bluesky: NewBlueskyRepository(s),
		Signup: NewSignupRepository(s),
		Linkedin: NewLinkedinRepository(s),
	}
}