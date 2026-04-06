package posts

import (
	"time"

	"github.com/go-playground/validator/v10"
)
type PostPayload struct{
	Content string `json:"content" validate:"required"`
	Images []*string `json:"images" validate:"omitempty,max=2"`
	Platforms []string `json:"platforms validate:"required,min=1"`
}

func (p*PostPayload) Validate() error{
	validate:=validator.New()
	return validate.Struct(p)
}
type SchedulePostPayload struct{
	Content string `json:"content" validate:"required"`
	Images []*string `json:"images" validate:"omitempty,max=2"`
	Platforms []string `json:"platforms validate:"required,min=1"`
	ScheduledAt time.Time `json:"scheduledAt" validate:"required"`
}
func(p*SchedulePostPayload) Validate() error{
	validate:=validator.New()
	return validate.Struct(p)
}

type SaveAsDraftPayload struct{
	Content string `json:"content" validate:"required"`
	Images []*string `json:"images" validate:"omitempty,max=2"`
}

func(p*SaveAsDraftPayload) Validate() error{
	validate:=validator.New()
	return validate.Struct(p)
}
