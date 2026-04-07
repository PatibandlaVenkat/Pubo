package service

import (
	"context"
	"errors"
	"mime/multipart"
	"strings"

	"github.com/PatibandlaVenkat/Pubo/internal/lib/storage"
	"github.com/PatibandlaVenkat/Pubo/internal/model/media"
	"github.com/PatibandlaVenkat/Pubo/internal/repository"
	"github.com/PatibandlaVenkat/Pubo/internal/server"
	"github.com/google/uuid"
)
type MediaService struct{
	server *server.Server
	MediaRepo repository.MediaRepository
	blob *storage.AzureBlobClient
}
func NewMediaService (s *server.Server,MediaRepo repository.MediaRepository,blob *storage.AzureBlobClient)(*MediaService){
	return &MediaService{
		server: s,
		MediaRepo: MediaRepo,
		blob: blob,
	}

}
func (s*MediaService) Upload(ctx context.Context,ownerUserID string,fileHeader *multipart.FileHeader,folder string)(*media.Asset,error){
if fileHeader==nil{
	return nil,errors.New("file is required")
}
ct:=strings.ToLower(fileHeader.Header.Get("Content-Type"))
if !strings.HasPrefix(ct,"image/") && !strings.HasPrefix(ct,"video/") && !strings.HasPrefix(ct,"application/"){
	return nil,errors.New("unsupported file type")
}
uploadResult,err:=s.blob.UploadFile(ctx,fileHeader,folder)
if err!=nil{
	return nil,err
}
asset:=media.Asset{
	ID:uuid.NewString(),
	OwnerUserID:ownerUserID,
	OriginalName: fileHeader.Filename,
	BlobName: uploadResult.BlobName,
	StorageURL: uploadResult.StorageURL,
	ContainerName: uploadResult.ContainerName,
	ContentType: uploadResult.ContentType,
	SizeBytes: uploadResult.SizeBytes,
	ETag:uploadResult.ETag,



}
return &asset,nil
}
func(s*MediaService) Get(ctx context.Context,id string) (*media.Asset,error){
	return s.MediaRepo.GetByID(ctx,id)

}
func(s*MediaService) List(ctx context.Context,ownerUserID string,limit int ,offset int)([]media.Asset,error){
	return s.MediaRepo.ListByOwner(ctx,ownerUserID,limit,offset)
	
}
func(s*MediaService) Delete(ctx context.Context,id string) error{
	asset,err:=s.MediaRepo.GetByID(ctx,id)
	if err!=nil{
		return err
	}
	if asset==nil{
		return errors.New("media not found")
	}
if err:=s.blob.DeleteBlob(ctx,asset.BlobName); err!=nil{
	return err
}
return s.MediaRepo.Delete(ctx,id)

}