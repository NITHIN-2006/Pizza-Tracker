package main

import "os"

type Config struct {
	Port string
	DB   string
}

func loadConfig() Config {

	host := getEnv("DB_HOST", "")
	port := getEnv("DB_PORT", "")
	user := getEnv("DB_USER", "")
	password := getEnv("DB_PASSWORD", "")
	dbname := getEnv("DB_NAME", "")

	dsn := user + ":" + password +
		"@tcp(" + host + ":" + port + ")/" +
		dbname +
		"?charset=utf8mb4&parseTime=True&loc=Local"

	return Config{
		Port: getEnv("PORT", "8080"),
		DB:   dsn,
	}
}

func getEnv(key string, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}