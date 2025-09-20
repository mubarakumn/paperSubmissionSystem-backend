# 📘 Academic Journal Management API Documentation

## Base URL
http://localhost:5000/api

## Authentication
All protected endpoints require a **JWT token** in the header:
Authorization: Bearer <token>

## Roles
- **Author** → Submit papers, view submissions, get notifications  
- **Reviewer** → Review assigned papers  
- **Editor** → Manage submissions, assign reviewers, update paper status  
- **Admin** → Full access, manage issues, assign roles, publish papers  

---

## 🔑 Authentication

### Register User
**POST** `/auth/register`  
Create a new user account. Default role = Author.

**Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123",
  "role": "Author"
}
````
Response (201):

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "64f12...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Author"
  }
}
````
Login User
POST /auth/login

Body (JSON):

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
````
Response (200):
```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "id": "64f12...",
    "name": "John Doe",
    "role": "Author"
  }
}
````
Get Profile
GET /auth/me
Requires authentication.

Response (200):
```json
{
  "id": "64f12...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Author"
}
````
📄 Papers
Submit Paper (Author only)
POST /papers

Body (JSON):
```json
{
  "title": "AI in Healthcare",
  "abstract": "This paper explores AI applications...",
  "fileUrl": "https://files.example.com/ai.pdf"
}
````
Response (201):

```json
{
  "message": "Paper submitted successfully",
  "paper": { ... }
}
````
Get My Papers (Author only)
GET /papers/mine

Response (200):

```json
[
  {
    "id": "65012...",
    "title": "AI in Healthcare",
    "status": "Submitted"
  }
]
````
Get All Papers (Editor/Admin only)
GET /papers

Response (200):
```json
[
  {
    "id": "65012...",
    "title": "AI in Healthcare",
    "author": "John Doe",
    "status": "Under Review"
  }
]
````
Update Paper Status (Editor/Admin only)
PATCH /papers/:id/status

Body (JSON):
```json
{ "status": "Accepted" }
```
Response (200):

```json
{
  "message": "Paper status updated",
  "paper": { ... }
}
````
📝 Reviews
Assign Reviewer (Editor/Admin only)
POST /reviews/assign

Body (JSON):
```json
{
  "paperId": "65012...",
  "reviewerId": "64f45..."
}
````
Response (200):

```json
{
  "message": "Reviewer assigned successfully"
}
````
Get Assigned Reviews (Reviewer only)
GET /reviews/mine

Response (200):
```json
[
  {
    "paperId": "65012...",
    "title": "AI in Healthcare",
    "status": "Pending Review"
  }
]
````
Submit Review (Reviewer only)
POST /reviews/:paperId

Body (JSON):
```json
{
  "comments": "The methodology is sound, but needs references.",
  "recommendation": "Revise"
}
````
Response (201):
```json
{
  "message": "Review submitted successfully",
  "review": { ... }
}
````
📢 Notifications
Get My Notifications
GET /notifications

Response (200):
```json
[
  {
    "id": "6512...",
    "message": "Your paper has been accepted",
    "read": false
  }
]
````
Mark Notification as Read
PATCH /notifications/:id/read

Response (200):
```json
{ "message": "Notification marked as read" }
````
📚 Issues (Admin only)
Create Issue
POST /issues

Body (JSON):
```json
{
  "volume": 1,
  "number": 2,
  "publicationDate": "2025-01-15"
}
````
Response (201):

```json
{
  "message": "Issue created successfully",
  "issue": { ... }
}
````
Publish Paper into Issue
PATCH /issues/:issueId/publish/:paperId

Response (200):

```json
{
  "message": "Paper published into Issue successfully",
  "issue": { ... }
}
````
Get All Issues
GET /issues

Response (200):

```json
[
  {
    "id": "6601...",
    "volume": 1,
    "number": 2,
    "publicationDate": "2025-01-15",
    "papers": [...]
  }
]
````
✅ Notes
Paper lifecycle: Submitted → Under Review → Accepted/Rejected → Published.

Notifications will be automatically generated on status changes and assignments.







