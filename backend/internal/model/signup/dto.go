package signup

import "github.com/go-playground/validator/v10"

type SignUpPayload struct {
	Email       *string `json:"email" validate:"required"`
	DisplayName *string `json:"displayName" validate:"omitempty"`
	
}

func (s *SignUpPayload) Validate() error {
	validate := validator.New()
	return validate.Struct(s)
}
