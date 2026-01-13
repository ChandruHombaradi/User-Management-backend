# User Management Backend API

A backend REST API project built using **Node.js + Express + MongoDB Atlas** for managing users with authentication and admin features.

This project supports:
- User Registration & Login (JWT authentication)
- Admin Login
- Admin can view/manage users (CRUD)
- Swagger API Documentation

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas (Mongoose)
- JWT Authentication
- bcryptjs (password hashing)
- Swagger UI (API docs)
- Nodemon

---

## 📁 Project Structure
User-Mangement-backend/
│── server.js
│── package.json
│── .env
│── src/
│ ├── app.js
│ ├── config/
│ │ ├── db.js
│ │ └── passport.js
│ ├── controllers/
│ │ ├── auth.controller.js
│ │ └── admin.controller.js
│ ├── middleware/
│ │ ├── auth.middleware.js
│ │ └── role.middleware.js
│ ├── models/
│ │ └── User.js
│ ├── routes/
│ │ ├── auth.routes.js
│ │ └── admin.routes.js
│ ├── utils/
│ │ └── token.js
│ └── swagger.yaml


---

## ✅ Features

### 👤 User Features
- Register user
- Login user
- JWT token returned after login/register

### 👨‍💼 Admin Features
- Admin login
- Get all users
- Create new user
- Update user details
- Delete user
- Activate/Deactivate user status

---

## ⚙️ Environment Variables (.env)

Create a `.env` file in the root folder and add:

```env
PORT=5000

# MongoDB Atlas
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/userdb?retryWrites=true&w=majority&appName=Cluster0

# JWT
JWT_SECRET=supersecretjwt

# Google OAuth (optional)
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Admin login
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=Admin@123

▶️ How to Run This Project (Step-by-Step)

Open terminal inside project folder
npm install
npm run dev

You should see:
Server running on port 5000
MongoDB Connected ✅

🌐 API Links
✅ Backend Home
http://localhost:5000/

✅ Swagger API Documentation
http://localhost:5000/api/docs
