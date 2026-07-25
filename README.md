# Lexvra — MERN Stack Website

A modern full-stack website built with MongoDB, Express, React, and Node.js. Features a Tenbin Labs-inspired hero section with dark theme, animated backgrounds, and smooth scroll navigation.

## Sections

- **Hero** — Full-screen hero with animated gradient orbs, stats counter, and CTAs
- **About** — Company story, values, and team highlights
- **Services** — Service cards fetched from API (with fallback data)
- **Gallery** — Filterable image gallery
- **Careers** — Job listings with apply links
- **Contact** — Contact form connected to MongoDB

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas) — optional; API returns fallback data if DB is unavailable

## Setup

```bash
# Install all dependencies
npm run install-all

# Copy server env file
cp server/.env.example server/.env

# Start both client and server
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
lexvra_project/
├── client/          React + Vite + Tailwind CSS
│   └── src/
│       ├── components/   Navbar, Hero, About, Services, Gallery, Careers, Contact, Footer
│       └── utils/        API helpers
├── server/          Express + Mongoose
│   ├── models/      Contact, Gallery, Career, Service
│   └── routes/      REST API endpoints
└── package.json     Root scripts (concurrently)
```

## API Endpoints

| Method | Endpoint          | Description          |
|--------|-------------------|----------------------|
| GET    | /api/health       | Health check         |
| GET    | /api/services     | List services        |
| GET    | /api/gallery      | List gallery items   |
| GET    | /api/careers      | List job openings    |
| POST   | /api/contact      | Submit contact form  |

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion
- **Backend:** Express, Mongoose, MongoDB
- **Dev:** Concurrently for parallel dev servers
