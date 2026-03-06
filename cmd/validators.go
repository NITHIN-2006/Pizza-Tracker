package main

import (
	"pizza-tracker-go/models"
	"slices"

	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
)

func RegisterCustomValidators() {

	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {

		v.RegisterValidation("valid_pizza_size", func(fl validator.FieldLevel) bool {
			return slices.Contains(models.PizzaSizes, fl.Field().String())
		})

		v.RegisterValidation("valid_pizza_type", func(fl validator.FieldLevel) bool {
			return slices.Contains(models.PizzaTypes, fl.Field().String())
		})
	}
}