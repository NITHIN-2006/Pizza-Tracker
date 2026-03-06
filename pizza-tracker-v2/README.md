# 🍕 PizzaTrack Frontend

A modern, production-ready React frontend for a Pizza Order Tracking system.

## Tech Stack

- **React 18** + **Vite 5**
- **TailwindCSS 3.4** (v3 — NOT v4)
- **tailwindcss-animate** for Radix UI animations
- **shadcn/ui** (Radix UI primitives)
- **Axios** for API calls
- **Lucide React** for icons
- **Google Fonts** — Nunito + Playfair Display

---

## ⚠️ Important: Use Tailwind v3

This project uses **Tailwind CSS v3**, NOT v4.

Do NOT run `npm install tailwindcss @tailwindcss/vite` — that installs v4.
Just run `npm install` and everything will be installed correctly.

---

## Prerequisites

- Node.js **v18+**
- npm
- Backend running at `http://localhost:3001`

---

## Installation & Run

```bash
# 1. Extract the zip and enter the folder
cd pizza-tracker-frontend-clean

# 2. Install all dependencies (Tailwind v3 is pinned in package.json)
npm install

# 3. Start the dev server
npm run dev
```

App will be at **http://localhost:5173**

---

## Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
pizza-tracker-frontend/
├── public/pizza.svg
├── src/
│   ├── components/
│   │   ├── ui/           ← badge, button, card, input, label, select, textarea, toast, toaster
│   │   ├── layout/       ← Navbar
│   │   ├── order/        ← PizzaItem, OrderSuccess
│   │   ├── StatusBadge.jsx
│   │   └── StatusProgress.jsx
│   ├── hooks/useToast.js
│   ├── lib/api.js + utils.js
│   ├── pages/            ← OrderPage, TrackPage, AdminPage
│   ├── App.jsx, main.jsx, index.css
├── index.html
├── package.json          ← tailwindcss pinned to 3.4.1
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## API Base URL

Set in `src/lib/api.js`:
```js
baseURL: 'http://localhost:3001'
```
