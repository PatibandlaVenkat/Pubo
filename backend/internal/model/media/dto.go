package media

import (
	"errors"

	"github.com/go-playground/validator/v10"
)

type UploadMediaPayload struct {
	Folder string `form:"folder" validate:"omitempty,max=200"`
}

func (p *UploadMediaPayload) Validate() error {
	validate := validator.New()
	 return validate.Struct(p)
}
type UploadMediaResponse struct{
	ID string `json:"id"`
	OriginalName string `json:"original_name"`
	BlobName string `json:"blob_name"`
	StorageURL string `json:"storage_url"`
	ContainerName string `json:"container_name"`
	ContentType string `json:"content_type"`
	SizeBytes     int64  `json:"size_bytes"`
	Etag string `json:"etag,omitempty"`

}
type MediaListResponse struct{
	Items []UploadMediaResponse `json:"items"`
}
type EmptyRequest struct{}
func(EmptyRequest) Validate() error{return nil}
var ErrInvalidRequest=errors.New("invalid request")
