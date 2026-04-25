# Blog Backend API

This is a backend project for a blog system built using Node.js Express and MongoDB. It provides APIs for user authentication post management and admin control

---

## 🚀 Features

* User Registration and Login (JWT Authentication)
* Update Profile and Delete Account
* Change Password and Logout
* Create Update Delete Posts
* Only owner can edit or delete their posts
* Admin can manage all users and posts
* Secure routes using middleware

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (Authentication)
* bcrypt (Password Hashing)

---

## 📦 API Endpoints

### 🔐 Auth Routes

* POST /api/user/register
* POST /api/user/login
* POST /api/user/logout

### 👤 User Routes

* GET /api/user/me
* PUT /api/user/update
* DELETE /api/user/delete
* PUT /api/user/change-password

### 📝 Post Routes

* POST /api/post/create
* GET /api/post/all
* GET /api/post/:id
* PUT /api/post/:id
* DELETE /api/post/:id

### 👑 Admin Routes

* GET /api/admin/users
* DELETE /api/admin/user/:id
* PUT /api/admin/block/:id

---

## 🔐 Authentication

This project uses JWT stored in cookies for authentication. Protected routes require a valid token

---

## 📁 Project Structure

* models
* controllers
* routes
* middlewares
* db

---

## ⚙️ Setup Instructions

1. Clone the repository

2. Install dependencies
   npm install

3. Create a .env file and add:
   PORT
   DB_CONNECTION
   DB_NAME
   ACCESS_TOKEN_SECRET

4. Run the server
   npm run dev

---

## 🎯 Goal of Project

This project is created to practice backend development concepts like authentication authorization CRUD operations and real API structure

---

## 👨‍💻 Author

Rayan Ahmed
MERN Stack Developer
