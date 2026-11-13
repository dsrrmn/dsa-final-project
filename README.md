# Barangay DRRM Geospatial Platform

A monorepo for the Barangay Disaster Risk Reduction and Management (DRRM) Geospatial Platform, featuring a React + Vite frontend and a Spring Boot backend.

---

## Repository Structure

```text
.
├── backend/    # Spring Boot REST API
└── frontend/   # React + Vite geospatial client
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18+ and `npm`
- **Java (JDK)**: Compatible JDK installed (v21+)
- **PostgreSQL**: Accessible PostgreSQL database or Supabase instance

---

### 1. Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   *Fill in your Supabase credentials and backend API URL in `.env`.*

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

---

### 2. Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   *Configure your PostgreSQL database connection details in `.env`.*

3. **Run the Spring Boot application:**
   ```bash
   ./mvnw spring-boot:run
   ```
   *(On Windows Command Prompt, use `mvnw.cmd spring-boot:run`)*

---

## Git Rules

All team members must adhere to the following workflow rules:

1. **Never commit `.env` files**: Secret keys and database passwords must never be tracked in source control. Only commit `.env.example`.
2. **Always work on feature branches**: Create and work on a branch prefixed with your domain:
   - Frontend tasks: `fe/task-name` (e.g., `fe/map-view`)
   - Backend tasks: `be/task-name` (e.g., `be/incident-api`)
3. **Never push directly to `main` or `dev`**: All contributions must be submitted via a Pull Request (PR) for review and validation before merging.
