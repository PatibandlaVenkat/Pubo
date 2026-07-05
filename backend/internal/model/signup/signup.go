package signup

import "github.com/PatibandlaVenkat/Pubo/internal/model"

type SignUp struct{
	model.Base
	ClerkUserId *string `json:"userID" db:"clerk_user_id"`
	Email *string`json:"email" db:"email"`
	DisplayName string`json:"displayName" db:"display_name"`
	
}

