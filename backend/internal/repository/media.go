package repository

import (
	"context"
	"errors"

	"github.com/PatibandlaVenkat/Pubo/internal/model/media"
	"github.com/PatibandlaVenkat/Pubo/internal/server"
	"github.com/jackc/pgx/v5"
)

type MediaRepository interface {
	create(ctx context.Context, asset media.Asset) error
	GetByID(ctx context.Context,id string)(*media.Asset,error)
	ListByOwner(ctx context.Context,ownerUserID string,limit int ,offset int)
	Delete(ctx context.Context,id string) error
}
type MediaRepo struct{
	server *server.Server 
}
func NewMediaRepository(server *server.Server) *MediaRepo{
	return &MediaRepo{
		server: server,
	}
}
func(r *MediaRepo) Create(ctx context.Context,asset media.Asset) error{
	_,err:=r.server.DB.Pool.Exec(ctx,`
	INSERT INTO media_assets(id,owner_user_id,original_name,blob_name,storage_url,container_name,content_type,size_bytes,etag,created_at,updated_at)
	VALUES($1,$2,$3,$4,$5,$6,$7,$8,%9,NOW(),NOW())`,asset.ID,asset.OwnerUserID,asset.OriginalName,asset.BlobName,asset.StorageURL,asset.ContainerName,asset.ContentType,asset.SizeBytes,asset.ETag)
	return err
}
func(r*MediaRepo) GetByID(ctx context.Context,id string) (*media.Asset,error){
row:=r.server.DB.Pool.QueryRow(ctx,`
SELECT id,owner_user_id,original_name,blob_name,storage_url,container_name,size_bytes,etag,update_at FROM media_assets WHERE id=$1`,id)
var asset media.Asset
 err := row.Scan(
        &asset.ID, &asset.OwnerUserID, &asset.OriginalName, &asset.BlobName,
        &asset.StorageURL, &asset.ContainerName, &asset.ContentType,
        &asset.SizeBytes, &asset.ETag, &asset.CreatedAt, &asset.UpdatedAt,
    )
	if err!=nil{
		if errors.Is(err,pgx.ErrNoRows){
			return nil,nil
		}
		return nil,err
	}
	return &asset,nil
}
func(r*MediaRepo) ListByOwner(ctx context.Context,ownerUserID string,limit int,offset int)([]media.Asset,error){
	rows,err:=r.server.DB.Pool.Query(ctx,`
	SELECT id,owner_user_id,original_name,blob_name,storage_url,container_name,content_type,size_bytes,etag,created_at,upadted_at FROM media_assets WHERE owner_user_id =$1 ORDER BY created_at DESC LIMIT $2 OFFSET $3
	`,ownerUserID,limit,offset)
	if err!=nil{
		return nil,err
	}
	defer rows.Close()
	out:=make([]media.Asset,0)
	for rows.Next(){
		var asset media.Asset
		if err:=rows.Scan(
			  &asset.ID, &asset.OwnerUserID, &asset.OriginalName, &asset.BlobName,
            &asset.StorageURL, &asset.ContainerName, &asset.ContentType,
            &asset.SizeBytes, &asset.ETag, &asset.CreatedAt, &asset.UpdatedAt,
		); err!=nil{
			return nil,err
		}
		out=append(out,asset)
	}
	return out,rows.Err()

}
func(r *MediaRepo) Delete(ctx context.Context,id string) error{
	_,err:=r.server.DB.Pool.Query(ctx,`DELETE FROM media_assets WHERE id=$1`,id)
	return err
}