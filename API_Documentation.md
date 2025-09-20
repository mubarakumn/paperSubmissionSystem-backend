# API Documentation

This document describes the available endpoints for the Multi-Role Auth & Issues Management API.

---

## Authentication Endpoints

### Register User
**POST** `/api/auth/register`  
Registers a new user.  

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "author" // admin | editor | reviewer | author
}
```

### Login User
**POST** `/api/auth/login`  
Logs in a user and returns a JWT token.  

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here"
}
```

---

## Issue Management Endpoints

### Create Issue (Author only)
**POST** `/api/issues`  

**Headers:**
```
Authorization: Bearer {{author_token}}
```

**Body:**
```json
{
  "title": "Issue 1",
  "description": "This is a test issue"
}
```

---

### Get All Issues (Admin only)
**GET** `/api/issues`  

**Headers:**
```
Authorization: Bearer {{admin_token}}
```

---

### Get Single Issue (Any Role)
**GET** `/api/issues/:id`  

**Headers:**
```
Authorization: Bearer {{user_token}}
```

---

### Update Issue (Editor only)
**PUT** `/api/issues/:id`  

**Headers:**
```
Authorization: Bearer {{editor_token}}
```

**Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description"
}
```

---

### Review Issue (Reviewer only)
**PATCH** `/api/issues/:id/review`  

**Headers:**
```
Authorization: Bearer {{reviewer_token}}
```

**Body:**
```json
{
  "status": "approved" // or "rejected"
}
```

---

### Delete Issue (Admin only)
**DELETE** `/api/issues/:id`  

**Headers:**
```
Authorization: Bearer {{admin_token}}
```

---

## Notes
- Use **Postman variables** for tokens:  
  - `{{admin_token}}`  
  - `{{editor_token}}`  
  - `{{reviewer_token}}`  
  - `{{author_token}}`  

- Make sure to login with each role and save the token before testing the protected routes.
