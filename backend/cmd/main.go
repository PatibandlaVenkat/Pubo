package main

import (
	"context"

	"github.com/PatibandlaVenkat/Pubo/internal/config"
	"github.com/PatibandlaVenkat/Pubo/internal/database"
	"github.com/PatibandlaVenkat/Pubo/internal/handler"
	"github.com/PatibandlaVenkat/Pubo/internal/logger"
	"github.com/PatibandlaVenkat/Pubo/internal/repository"
	"github.com/PatibandlaVenkat/Pubo/internal/service"
)
const DefaultContextTimeout=30

func main(){
	cfg,err:=config.LoadConfig()
	if err!=nil{
		panic("failed to load config: "+err.Error())
	}
	loggerService:=logger.NewLoggerServie(cfg.Observabiltiy)
	defer loggerService.Shutdown()
	log :=logger.NewLoggerServie(cfg.Observabiltiy,loggerService)

	if cfg.Primary.Env!="local"{
		if err:=database.Migrate(context.Background(),&log,cfg); err!=nil{
			log.Fatal().Err(err).Msg("failed to migrate database")
		}
	}
	srv,err:=server.New(cfg,&log,loggerService)
	
	if err!=nil{
		log.Fatal().Err(err).Msg("failed to intialise the server")
	}

	repos:=repository.NewRepositories(srv)
	services,serviceErr:=service.NewServices(srv,repos)

	if serviceErr!=nil{
		log.Fatal().Err(serviceErr).Msg("could not create the services")
	}
	
	

}