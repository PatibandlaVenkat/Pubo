package bluesky

import "github.com/go-playground/validator/v10"

type CreateBlueskyConnectionPayload struct {
	Handle   *string `json:"Handle" validate:"required"`
	Password *string `json:"Password" validate:"required"`
	PlatformId *int   `json:"PlatformId" validate:"required"`
	DisplayName *string `json:"DisplayName" validate:"omitempty"`
}

func (p *CreateBlueskyConnectionPayload) Validate() error {
	validate := validator.New()
	return validate.Struct(p)
}


// id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     user_id UUID NOT NULL REFERENCES pubo_users(id) on DELETE CASCADE,
//     platform_id SMALLINT NOT NULL REFERENCES platforms(id),
//     platform_account_id TEXT NOT NULL,
//     handle TEXT, 
//     display_name TEXT,
//     avatar_url TEXT,
//     access_token_encrypted TEXT,
//     refersh_token_encrypted TEXT,
//     token_expires_at TIMESTAMP,
//     scopes TEXT [],
//     is_active BOOLEAN NOT NULL DEFAULT TRUE,
//     last_synced_at TIMESTAMP,
//     created_at TIMESTAMP NOT NULL DEFAULT NOW(),
//     updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
//     UNIQUE(user_id,platform_id,platform_account_id)

