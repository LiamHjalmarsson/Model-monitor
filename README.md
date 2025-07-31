# Model Monitor

**Model Monitor** is a fullstack web application that allows users to create brands, generate AI responses with OpenAI, and rate those responses. The app includes user authentication, protected API routes, and a modern frontend with Zustand and TailwindCSS.

## Tech Stack

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
-   npm run dev or npm run node

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
-   npm install
-   npm run dev

### Test users

- Email: test@example.com
- Lösenord: password

- Email: admin@example.com
- Lösenord: password

## Endpoints

## 📡 API Endpoints

## 📡 API Endpoints

| Function                      | Method  | Endpoint                                   |
|------------------------------|---------|--------------------------------------------|
| Login                        | `POST`  | `/api/auth/login`                          |
| Logout                       | `POST`  | `/api/auth/logout`                         |
| Get all brands               | `GET`   | `/api/brands/`                             |
| Create brand                 | `POST`  | `/api/brands/`                             |
| Update brand                 | `PUT`   | `/api/brands/:id`                          |
| Delete brand                 | `DELETE`| `/api/brands/:id`                          |
| Get responses for brand      | `GET`   | `/api/responses/brands/:brand_id`          |
| Create dummy response        | `POST`  | `/api/responses/brands/:brand_id`          |
| Generate AI response         | `POST`  | `/api/responses/brands/:brand_id/generate` |
| Get single response          | `GET`   | `/api/responses/:id`                       |
| Get own response             | `GET`   | `/api/responses/owned/:id`                 |
| Get all ratings              | `GET`   | `/api/ratings/`                            |
| Get single rating            | `GET`   | `/api/ratings/:id`                         |
| Create rating                | `POST`  | `/api/ratings/`                            |
| Update rating                | `PUT`   | `/api/ratings/:id`                         |

