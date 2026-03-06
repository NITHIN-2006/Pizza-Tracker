package main

import (
	"log"
	"log/slog"
	"os"
	"pizza-tracker-go/models"
	"github.com/joho/godotenv"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	godotenv.Load("../.env")
	config := loadConfig()
	RegisterCustomValidators()
	dbModel, err := models.InitDb(config.DB)
	if err != nil {
		log.Fatal(err)
	}

	handler := NewHandler(dbModel)

	router := gin.Default()

	router.Use(cors.Default())

	setRoutes(router, handler)

	slog.Info("Server starting", "port", config.Port)

	err = router.Run(":" + config.Port)
	if err != nil {
		log.Fatal(err)
	}
	slog.Info("DB Host", "host", os.Getenv("DB_HOST"))
}