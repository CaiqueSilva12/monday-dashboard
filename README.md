# Monday Dashboard

A modern, full-stack project management dashboard inspired by Monday.com. This application allows users to manage projects, view statistics, and integrate with their Monday.com account for seamless authentication and data access.

---

## Why This Application?

**Monday Dashboard** is designed to provide a beautiful, real-world example of a full-stack web application using modern technologies. It demonstrates:
- OAuth integration with a third-party service (Monday.com)
- Secure authentication using JWT
- A clean, modular codebase with best practices for both frontend and backend
- Real-time project management features and statistics

---

## Features
- **Login with Monday.com** (OAuth 2.0)
- JWT-based authentication and session management
- CRUD for Projects (create, list, view, update, delete)
- Dashboard with project statistics and charts
- Responsive, modern UI with Ant Design and Tailwind CSS
- Secure API endpoints (protected by JWT)
- Dockerized MySQL database for easy setup

---

## Technologies Used

### Backend (Laravel)
- **Laravel 10+** (PHP framework)
- **MySQL** (via Docker Compose)
- **Eloquent ORM**
- **RESTful APIs**
- **JWT Authentication** (`tymon/jwt-auth`)
- **Monday.com OAuth 2.0 Integration**
- **Docker** (for database)

### Frontend (Next.js/React)
- **Next.js (App Router)**
- **React 18**
- **TypeScript**
- **React Query** (data fetching/caching)
- **Ant Design** (UI components)
- **Tailwind CSS** (utility-first styling)
- **Axios** (API requests)
- **JWT token management** (localStorage + Axios interceptors)
- **Charting library** (for dashboard stats)

---

## Monorepo Structure
```
monday-dashboard/
  backend/    # Laravel API, OAuth, JWT, Docker, MySQL
  frontend/   # Next.js, React, Ant Design, Tailwind, JWT
```

---

## Getting Started

- **Backend setup:** See [`backend/README.md`](./backend/README.md)
- **Frontend setup:** See [`frontend/README.md`](./frontend/README.md)

Each README contains step-by-step instructions for local development, including environment variables, Docker, ngrok, and OAuth configuration.

---

## Security & Best Practices
- Never commit your `.env` files or secrets to version control.
- Use strong secrets for JWT and Monday.com OAuth.
- Always use HTTPS in production.

---
