package middleware

import (
	"github.com/PatibandlaVenkat/Pubo/internal/server"
	"github.com/newrelic/go-agent/v3/newrelic"
)

type MiddleWares struct {
	GLobal          *GlobalMiddleWares
	Auth            *AuthMiddleware
	ContextEnhancer *ContextEnhancer
	Tracing         *TracingMiddleware
	RateLimit       *RateLimitMiddleware
}

func NewMiddlewares(s *server.Server) *MiddleWares{
	var nrApp *newrelic.Application
	if s.LoggerService!=nil{
		nrApp=s.LoggerService.GetApplication()
	}
	return &MiddleWares{
		Global:          NewGlobalMiddlewares(s),
		Auth:            NewAuthMiddleware(s),
		ContextEnhancer: NewContextEnhancer(s),
		Tracing:         NewTracingMiddleware(s, nrApp),
		RateLimit:       NewRateLimitMiddleware(s),
	}
}