package repository

import (
	linkedin "github.com/PatibandlaVenkat/Pubo/internal/model/Linkedin"
	"github.com/PatibandlaVenkat/Pubo/internal/server"
	"context"
	"fmt"
	"github.com/jackc/pgx/v5"
)
type LinkedinRepository struct{
	server *server.Server
}
func NewLinkedinRepository(s *server.Server)(*LinkedinRepository){
	return &LinkedinRepository{
		server:s,
	}

}
func(r*LinkedinRepository) ConnectLinkedinAccount(ctx context.Context,userId string,payload linkedin.CreateLinkedinConnectionPayload)(*linkedin.LinkedInConnectedAccount,error){
	stmt:=`INSERT INTO connected_accounts(
	   user_id,
	   platform_id,
	   access_token_encrypted,
	   display_name
	) VALUES(
	 @user_id,
	 platform_id,
	 @access_token_encrypted,
	 @display_name)
	 RETURNING *`
	 rows,err:=r.server.DB.Pool.Query(ctx,stmt,pgx.NamedArgs{
		"user_id":userId,
		"platform_id":payload.PlatformId,
		"access_token_encrypted":payload.AccessToken,
		"display_name":payload.DisplayName,

	 })
	 if err!=nil{
		return nil,fmt.Errorf("failed to execute linedin connection for userid:%s",userId,err)
	 }
	 LinkedinItem,err:=pgx.CollectOneRow(rows,pgx.RowToStructByName[linkedin.LinkedInConnectedAccount])
	 if err!=nil{
		return nil,fmt.Errorf("failed to collect a row from table for user_id %s",userId,err)
	 }
	 return &LinkedinItem,nil

}



