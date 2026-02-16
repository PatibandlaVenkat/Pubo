package main

import (
	"context"
	"errors"
	"net/http"
	"os"
	"os/signal"

	"github.com/PatibandlaVenkat/Pubo/internal/config"
	"github.com/PatibandlaVenkat/Pubo/internal/database"
	"github.com/PatibandlaVenkat/Pubo/internal/handler"
	"github.com/PatibandlaVenkat/Pubo/internal/logger"
	"github.com/PatibandlaVenkat/Pubo/internal/repository"
	"github.com/PatibandlaVenkat/Pubo/internal/router"
	"github.com/PatibandlaVenkat/Pubo/internal/server"
	"github.com/PatibandlaVenkat/Pubo/internal/service"
)

const DefaultContextTimeout = 30

func main() {
	cfg, err := config.LoadConfig()
	if err!=nil{
		panic("failed to load config: "+err.Error())
	}
	loggerService:=logger.NewLoggerServie(cfg.Observabiltiy)
	defer loggerService.Shutdown()
	log:=logger.NewLoggerWithService(cfg.Observabiltiy,loggerService)

	if cfg.Primary.Env!="local"{
		if err:=database.Migrate(context.Background(),&log,cfg); err!=nil{
			log.Fatal().Err(err).Msg("failed to migrate database")
		}
	}
	srv,err:=server.New(cfg,&log,loggerService)
	if err!=nil{
		log.Fatal().Err(err).Msg("failed to intialise server")
	}

	repos:=repository.NewRepositories(srv)
	services,serviceErr:=service.NewServices(srv,repos)
	if serviceErr!=nil{
		log.Fatal().Err(serviceErr).Msg("could not create services")
	}
	handlers:=handler.NewHandlers(srv,services)
	r:=router.NewRouter(srv,handlers,services)
	srv.SetupHttpServer(r)
	ctx,stop:=signal.NotifyContext(context.Background(),os.Interrupt)
	go func(){
		if err=srv.Start(); err!=nil && !errors.Is(err,http.ErrServerClosed){
log.Fatal().Err(err).Msg("failed to start server")
		}
	}()
	<-ctx.Done()
	ctx,cancel:=context.WithTimeout(context.Background(),DefaultContextTimeout)
	 if err=srv.Shutdown(ctx); err!=nil{
		log.Fatal().Err(err).Msg("server forced to shutdown")
	 }
	 stop()
	 cancel()
	 log.Info().Msg("server exited properly")
}