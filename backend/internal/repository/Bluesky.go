package repository

import (
	"context"
	
	"fmt"

	"github.com/PatibandlaVenkat/Pubo/internal/server"
	
	"github.com/jackc/pgx/v5"
	"github.com/PatibandlaVenkat/Pubo/internal/model/Bluesky"

)
type BlueskyRepository struct{
	server *server.Server
}
func NewBlueskyRepository(server *server.Server) *BlueskyRepository{
	return &BlueskyRepository{
		server:server,
	}
}
func(r *BlueskyRepository) ConnectAccounts(ctx context.Context,userID string,payload *bluesky.CreateBlueskyConnectionPayload)(*bluesky.ConnectedAccounts,error){
	stmt:=`INSERT INTO connected_accounts(
	   user_id,
	   handle,
	   platform_id,
	   access_token_encrypted,
	   display_name
	   )
	   VALUES(
	   @user_id,
	   @handle,
	   @platform_id,
	   @access_token_encrypted,
	   @display_name
	   )
	   RETURNING *`
	   rows,err:=r.server.DB.Pool.Query(ctx,stmt,pgx.NamedArgs{
		"user_id":userID,
		"handle":payload.Handle,
		"platform_id":payload.PlatformId,
		"access_token_encrypted":payload.Password,
		"display_name":payload.DisplayName,
	   })
	   if err!=nil{
		return nil,fmt.Errorf("failed to execute created bluesky connected account for userid=%s ",userID,err)
	   }
	   BlueskyItem,err:=pgx.CollectOneRow(rows,pgx.RowToStructByName[bluesky.ConnectedAccounts])
	   if err!=nil{
		return nil,fmt.Errorf("failed to collect a row from table  for user_id %s",userID,err)
		
	   }
	
	   return &BlueskyItem,nil

}

