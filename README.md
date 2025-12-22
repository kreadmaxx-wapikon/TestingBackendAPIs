# Backend API

This is the backend API for the Fullstack Project.

## ⚠️ Important Note for Team Members

**Please use ONLY the Signup API. Other APIs (Book APIs, Login API) are not ready for use yet.**

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend folder with the following variables:
```env
MONGODB_URI=mongodb://localhost:27017/your-database-name
PORT=2025
JWT_SECRET=your-super-secret-jwt-key-here
```

4. Start the server:
```bash
npm start
```

The server will run on `http://localhost:2025` (or the port specified in your .env file).

## API Documentation

### User Signup API

**Endpoint:** `POST /api/user/signup`

**Description:** Register a new user account.

**Request:**
- **URL:** `http://localhost:2025/api/user/signup`
- **Method:** `POST`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

**Response (Success - 201):**
```json
{
  "message": "User created successfully",
  "success": true,
  "user": {
    "_id": "user_id_here",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com"
  },
  "token": "jwt_token_here"
}
```

**Response (Error - 400):**
```json
{
  "message": "All fields are required",
  "success": false
}
```

**Response (Error - 400 - User exists):**
```json
{
  "message": "User already exists",
  "success": false
}
```

**Example using cURL:**
```bash
curl -X POST http://localhost:2025/api/user/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

**Example using Postman:**
1. Method: `POST`
2. URL: `http://localhost:2025/api/user/signup`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON): Use the JSON example above

## Project Structure

```
backend/
├── controller/
│   ├── book.controller.js
│   └── user.controller.js
├── model/
│   ├── book.model.js
│   └── user.model.js
├── routes/
│   ├── book.route.js
│   └── user.route.js
├── database.js
├── index.js
├── package.json
└── README.md
```

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- bcrypt (for password hashing)
- jsonwebtoken (for JWT tokens)
- CORS
- dotenv

## Notes

- The password is automatically hashed using bcrypt before saving
- A JWT token is returned upon successful signup
- Email must be unique (duplicate emails will return an error)
- All fields (firstName, lastName, email, password) are required

## Support

For questions or issues, please contact the development team.

