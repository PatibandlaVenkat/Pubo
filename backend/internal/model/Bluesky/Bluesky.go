package bluesky

type ConnectedAccounts struct{
	UserID string `json:"userID" db:"user_id"`
	
	PlatformId *int  `json:"PlatformId" db:"platform_id"`
	PlatformAccountId string
	Handle *string `json:"Handle" db:"handle"`
	DisplayName *string `json:"DisplayName" db:"display_name"`
	AvatarUrl string
	Password *string `json:"Password" db:"access_token_encrypted"`
	refershToken string
	token_expires_at string
    scopes string
    is_active string
    last_synced_at string

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

