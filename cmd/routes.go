package main

import "github.com/gin-gonic/gin"

func setRoutes(router *gin.Engine, handler *Handler) {

	router.GET("/api/options", handler.GetPizzaOptions)

	router.POST("/api/orders", handler.CreateOrder)

	router.GET("/api/orders/:id", handler.GetOrder)
	router.PATCH("/api/admin/orders/:id/status", handler.UpdateOrderStatus)
}