package signup

import "github.com/go-playground/validator/v10"

type SignUpPayload struct {
	Email       *string `json:"email" validate:"required"`
	ClerkUserId *string `json:"clerk_user_id" validate:"required"`
}

func (s *SignUpPayload) Validate() error {
	validate := validator.New()
	return validate.Struct(s)
	
}
