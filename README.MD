# Pizza Tracker

A simple full-stack pizza order tracking application. Customers can place pizza orders and track their status, while an admin interface allows updating the order progress.

The project is split into two parts:

* **Backend**: Go (Gin + GORM + MySQL)
* **Frontend**: React with TailwindCSS and shadcn/ui

The backend exposes a REST API that the frontend consumes to create and monitor orders.

---

## Features

* Create pizza orders
* Support for multiple pizzas per order
* Track order status
* Admin endpoint to update order status
* MySQL database integration
* REST API built with Gin
* Modern React UI with TailwindCSS and shadcn components

---
## Screenshots
![App Screenshot](https://github.com/NITHIN-2006/Pizza-Tracker/blob/5d91068dc61f13d0825328723e3483e9d84137a1/Screenshot%202026-03-06%20162119.png)
![App Screenshot](https://github.com/NITHIN-2006/Pizza-Tracker/blob/5d91068dc61f13d0825328723e3483e9d84137a1/Screenshot%202026-03-06%20162226.png)
![App Screenshot](https://github.com/NITHIN-2006/Pizza-Tracker/blob/5d91068dc61f13d0825328723e3483e9d84137a1/Screenshot%202026-03-06%20162256.png)
---

## Project Structure

```
pizza-tracker
│
├── backend
│   ├── cmd
│   │   └── main.go
│   │   └── customer.go
│   │
│   └── models
│       └── order.go
│
├── frontend
│
└── go.mod
```

---

## Requirements

Make sure the following are installed:

* Go 1.21+
* Node.js 18+
* npm
* MySQL (or a hosted MySQL database such as Railway)

---

## Backend Setup

Navigate to the backend directory:

```
cd backend
```

Install dependencies:

```
go mod tidy
```

Create a `.env` file:

```
DB_HOST=nozomi.proxy.rlwy.net
DB_PORT=55939
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=railway
PORT=3001
```

Run the server:

```
go run ./cmd
```

The backend will start on:

```
http://localhost:3001
```

---

## API Endpoints

### Get pizza options

```
GET /api/options
```

Response:

```
{
  "pizzaTypes": [...],
  "pizzaSizes": [...]
}
```

---

### Create order

```
POST /api/orders
```

Example request:

```
{
  "name": "Rithwik",
  "phone": "9876543210",
  "address": "Visakhapatnam",
  "sizes": ["Medium","Large"],
  "pizzas": ["Margherita","Pepperoni"],
  "instructions": ["extra cheese",""]
}
```

---

### Get order

```
GET /api/orders/:id
```

Returns order details including pizzas and status.

---

### Update order status (Admin)

```
PUT /api/orders/:id/status
```

Example request:

```
{
  "status": "Preparing"
}
```

Available statuses:

* Order placed
* Preparing
* Baking
* Quality Check
* Ready

---

## Frontend Setup

Navigate to the frontend directory:

```
cd frontend
```

Install dependencies:

```
npm install
```

Start development server:

```
npm run dev
```

The frontend will run on:

```
http://localhost:5173
```

---

## Tech Stack

Backend

* Go
* Gin
* GORM
* MySQL

Frontend

* React
* TailwindCSS v3
* shadcn/ui
* Vite

---

## Notes

* Orders automatically receive a short unique ID.
* The backend uses GORM auto migrations to create tables if they don't exist.
* The project was designed as a lightweight learning project to explore Go APIs and modern React UI tools.

---

## Possible Improvements

* Authentication for admin actions
* Real-time order updates with WebSockets
* Order history for customers
* Payment integration
* Docker support for easier deployment

---

## Author

Built as a learning project while exploring Go backend development and modern React UI tooling.
