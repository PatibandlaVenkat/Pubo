package linkedin

import "github.com/go-playground/validator/v10"

type CreateLinkedinConnectionPayload struct {
	DisplayName *string `json:"DisplayName" validate:"required"`
	AccessToken *string `json:"AcessToken" validate:"required"`
	PlatformId  *int    `json:"PlatformId" validate:"required"`
}

func (p *CreateLinkedinConnectionPayload) Validate() error {
	validate := validator.New()
	return validate.Struct(p)
}


