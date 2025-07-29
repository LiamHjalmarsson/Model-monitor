# Model Monitor

**Model Monitor** is a fullstack web application that allows users to create brands, generate AI responses with OpenAI, and rate those responses. The app includes user authentication, protected API routes, and a modern frontend with Zustand and TailwindCSS.

## 🔧 Tech Stack

### Backend

-   Node.js + Express
-   PostgreSQL
-   JSON Web Token (JWT) Authentication
-   bcryptjs
-   dotenv

### Frontend

-   React (with Vite)
-   TypeScript
-   Zustand (global state management)
-   Axios
-   TailwindCSS
-   React Router DOM

## Setup

### Backend

-   cd server
-   npm install
-   npm run seed
-   npm run dev
-   npm run nodemon

### Env

-   PORT=4000

-   JWT_SECRET=your-secret
-   JWT_EXPIRES_IN=7d

-   POSTGRES_HOST=localhost
-   POSTGRES_PORT=5432
-   POSTGRES_USER=postgres
-   POSTGRES_PASSWORD=yourpassword
-   POSTGRES_DB=db

-   OPENAI_API_KEY=your_openai_api_key

### Frontend

-   cd client

## Endpoints

| Funktion                  | Metod    | Endpoint                                   |
| ------------------------- | -------- | ------------------------------------------ |
| Login                     | `POST`   | `/api/auth/login`                          |
| Logout                    | `POST`   | `/api/auth/logout`                         |
| Hämta brands              | `GET`    | `/api/brands/`                             |
| Skapa brand               | `POST`   | `/api/brands/`                             |
| Hämta brand               | `GET`    | `/api/brands/:id`                          |
| Uppdatera brand           | `PUT`    | `/api/brands/:id`                          |
| Ta bort brand             | `DELETE` | `/api/brands/:id`                          |
| Hämta responses för brand | `GET`    | `/api/responses/brands/:brand_id`          |
| Skapa response            | `POST`   | `/api/responses/brands/:brand_id`          |
| Generera AI-response      | `POST`   | `/api/responses/brands/:brand_id/generate` |
| Hämta enskild response    | `GET`    | `/api/responses/:id`                       |
| Skapa rating              | `POST`   | `/api/ratings/`                            |
| Uppdatera rating          | `PUT`    | `/api/ratings/:id`                         |
| Hämta alla ratings        | `GET`    | `/api/ratings/`                            |
| Hämta enskild rating      | `GET`    | `/api/ratings/:id`                         |
