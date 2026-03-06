package models

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type DBModel struct {
	Order OrderModel
}

func InitDb(dsn string) (*DBModel, error) {

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to connect database: %v", err)
	}

	err = db.AutoMigrate(&Order{}, &OrderItem{})
	if err != nil {
		return nil, fmt.Errorf("failed to migrate database: %v", err)
	}

	dbModel := &DBModel{
		Order: OrderModel{
			DB: db,
		},
	}

	return dbModel, nil
}