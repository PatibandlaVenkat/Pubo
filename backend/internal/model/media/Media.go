package media

import (
	"time"
	 "github.com/PatibandlaVenkat/Pubo/internal/model"

	"github.com/google/uuid"
)

type Asset struct {
	model.Base
	ID            uuid.UUID
	OwnerUserID   string
	OriginalName  string
	BlobName      string
	StorageURL    string
	ContainerName string
	ContentType   string
	SizeBytes     int64
	ETag          string
	CreatedAt     time.Time
	UpdatedAt time.Time
}