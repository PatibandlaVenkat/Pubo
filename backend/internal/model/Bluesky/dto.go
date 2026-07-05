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

