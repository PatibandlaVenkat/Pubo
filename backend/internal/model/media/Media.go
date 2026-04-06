package media

import "time"

type Asset struct {
	ID            string
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