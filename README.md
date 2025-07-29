# 🧠 Model Monitor

**Model Monitor** is a fullstack web application that allows users to create brands, generate AI responses with OpenAI, and rate those responses. The app includes user authentication, protected API routes, and a modern frontend with Zustand and TailwindCSS.

## 🔧 Tech Stack

### Backend
- Node.js + Express
- PostgreSQL
- JSON Web Token (JWT) Authentication
- bcryptjs
- dotenv

### Frontend
- React (with Vite)
- TypeScript
- Zustand (global state management)
- Axios
- TailwindCSS
- React Router DOM

## Setup 

### Backend 
- cd server
- npm install
- npm run seed
- npm run dev
- npm run nodemon 

### Env

- PORT=4000

- JWT_SECRET=your-secret
- JWT_EXPIRES_IN=7d

- POSTGRES_HOST=localhost
- POSTGRES_PORT=5432
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=yourpassword
- POSTGRES_DB=model_monitor

- OPENAI_API_KEY=your_openai_api_key

### Frontend
- cd client


## Endpoints 

###logout

- http://localhost:4000/api/auth/logout

### Login

- http://localhost:4000/api/auth/login

{
"email": "test@example.com",
"password": "password"
}

# Ratings

http://localhost:4000/api/ratings

# Rating

http://localhost:4000/api/ratings/1

# Put Rating

http://localhost:4000/api/ratings/1

{
"responseId": 1,
"rating": 1
}

# Post Rating

http://localhost:4000/api/ratings/1

{
"responseId": 1,
"rating": 1
}

# Get

http://localhost:4000/api/brands

# Post

http://localhost:4000/api/brands

{
"name": "name",
"prompt": "Propt"
}

# Put

http://localhost:4000/api/brands/3

{
"name": "name",
"prompt": "Propt"
}

# Delete

http://localhost:4000/api/brands/3

# Get

http://localhost:4000/api/responses/brand/1

# Post

http://localhost:4000/api/responses/brand/1

{
"id": 3,
"brand_id": 1,
"created_by": null,
"content": "Fake AI response here",
"created_at": "2025-07-28T17:33:21.565Z"
}

# Get

http://localhost:4000/api/responses/3
