package bluesky

import "github.com/PatibandlaVenkat/Pubo/internal/model"

type ConnectedAccounts struct {
	model.Base
	UserID           string  `json:"userID" db:"user_id"`
	PlatformId       *int    `json:"PlatformId" db:"platform_id"`
	Handle           *string `json:"Handle" db:"handle"`
	DisplayName      *string `json:"DisplayName" db:"display_name"`
	AvatarUrl        string
	Password         *string `json:"Password" db:"access_token_encrypted"`
	refershToken  string      `json:"refershToken" db:"refersh_token_encrypted"`
	token_expires_at string
	scopes           string
	is_active        string
	last_synced_at   string
}
type BlueskySessionResponse struct{
	AccessJwt string `json:"acessJwt"`
	RefreshJwt string `json:"refreshJwt`
	Handle string `json:"handle"`
	DID string `json:"did"`
}
