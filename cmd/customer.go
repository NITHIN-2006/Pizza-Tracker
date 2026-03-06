package main

import (
	"log/slog"
	"net/http"

	"pizza-tracker-go/models"

	"github.com/gin-gonic/gin"
)
type UpdateOrderStatusRequest struct {
	Status string `json:"status" binding:"required"`
}
type OrderRequest struct {
	Name         string   `json:"name" binding:"required,min=2,max=100"`
	Phone        string   `json:"phone" binding:"required,min=10,max=20"`
	Address      string   `json:"address" binding:"required,min=1,max=200"`
	Sizes        []string `json:"sizes" binding:"required,min=1,dive,valid_pizza_size"`
	PizzaTypes   []string `json:"pizzas" binding:"required,min=1,dive,valid_pizza_type"`
	Instructions []string `json:"instructions"`
}

type PizzaOptions struct {
	PizzaTypes []string `json:"pizzaTypes"`
	PizzaSizes []string `json:"pizzaSizes"`
}

func (h *Handler) GetPizzaOptions(c *gin.Context) {

	options := PizzaOptions{
		PizzaTypes: models.PizzaTypes,
		PizzaSizes: models.PizzaSizes,
	}

	c.JSON(http.StatusOK, options)
}

func (h *Handler) CreateOrder(c *gin.Context) {

	var form OrderRequest

	if err := c.ShouldBindJSON(&form); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	if len(form.Sizes) != len(form.PizzaTypes) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "sizes and pizzas must have the same length",
		})
		return
	}

	orderItems := make([]models.OrderItem, 0, len(form.Sizes))

	for i := range form.Sizes {

		instruction := ""
		if i < len(form.Instructions) {
			instruction = form.Instructions[i]
		}

		item := models.OrderItem{
			Size:         form.Sizes[i],
			Pizza:        form.PizzaTypes[i],
			Instructions: instruction,
		}

		orderItems = append(orderItems, item)
	}

	order := models.Order{
		CustomerName: form.Name,
		Phone:        form.Phone,
		Address:      form.Address,
		Status:       models.OrderStatuses[0],
		Items:        orderItems,
	}

	if err := h.orders.CreateOrder(&order); err != nil {

		slog.Error("failed to create order", "error", err)

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to create order",
		})

		return
	}

	slog.Info("order created", "orderID", order.ID)

	c.JSON(http.StatusCreated, gin.H{
		"message": "order created successfully",
		"order":   order,
	})
}

func (h *Handler) GetOrder(c *gin.Context) {

	orderID := c.Param("id")

	if orderID == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "order id is required",
		})
		return
	}

	order, err := h.orders.GetOrder(orderID)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "order not found",
		})
		return
	}

	c.JSON(http.StatusOK, order)
}
func (h *Handler) UpdateOrderStatus(c *gin.Context) {

	orderID := c.Param("id")

	if orderID == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "order id is required",
		})
		return
	}

	var req UpdateOrderStatusRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// validate status
	valid := false
	for _, s := range models.OrderStatuses {
		if s == req.Status {
			valid = true
			break
		}
	}

	if !valid {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid order status",
		})
		return
	}

	err := h.orders.DB.Model(&models.Order{}).
		Where("id = ?", orderID).
		Update("status", req.Status).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to update order status",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "order status updated",
		"status":  req.Status,
	})
}