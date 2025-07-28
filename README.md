# model-monitor

# logout

http://localhost:4000/api/auth/logout

# Login

http://localhost:4000/api/auth/login

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
