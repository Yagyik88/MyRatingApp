# 🌟 RateHub — Store Rating Platform  
_A Full-Stack Web Application for Rating & Managing Local Stores_

<p align="center">
  <img src="./screenshots/Screenshot 2025-11-22 014905.png" width="900" />
</p>

---

## 📌 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Roles & Capabilities](#-system-roles--capabilities)
- [Screenshots](#-screenshots)
- [Folder Structure](#-folder-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Overview](#-api-overview)
- [Validations](#-validations)
- [Deployment](#-deployment)
- [License](#-license)

---

## 🚀 Overview  

**RateHub** is a full-stack platform where users rate stores (1–5 stars), store owners view performance, and system admins manage everything.  
This application was built as part of a **full-stack coding challenge**.

### Key Highlights:
✔ Secure authentication (JWT)  
✔ Role-based access control  
✔ Filtering, sorting, and CRUD operations  
✔ Fully responsive UI  
✔ PostgreSQL relational database  

---

## 🎯 Features  

### 👨‍💻 **System Administrator**
- Add stores, normal users, and admins  
- Dashboard displaying:
  - Total Users  
  - Total Stores  
  - Total Ratings  
- Manage users:
  - Search & filter (Name, Email, Address, Role)  
  - Sort ascending/descending  
  - View user details  
- Manage stores:
  - Search & sort  
  - View ratings  
- Logout  

---

### 🙍‍♂️ **Normal User**
- Sign up & log in  
- View all stores  
- Search stores by name/address  
- View:
  - Store name  
  - Address  
  - Overall rating  
  - User’s submitted rating  
- Submit & update ratings  
- Logout  

---

### 🏪 **Store Owner**
- Log in  
- View dashboard:
  - List of users who rated their store  
  - Average rating  
- Logout  

---

## 🛠 Tech Stack  

### **Frontend**
- React.js  
- JavaScript  
- CSS (custom styled components)  

### **Backend**
- Node.js  
- Express.js  

### **Database**
- PostgreSQL  

### **Authentication**
- JWT  
- Bcrypt  

---

## 📸 Screenshots  

### 🏠 Landing Page
<p align="center">
  <img src="./screenShot/Screenshot 2025-11-22 014905.png" width="900" />
</p>

---

### 🔐 Login Page
<p align="center">
  <img src="./screenShot/Screenshot 2025-11-22 014925.png" width="900" />
</p>

---

### 📊 Admin Dashboard
<p align="center">
  <img src="./screenShot/Screenshot 2025-11-22 014950.png" width="900" />
</p>

---

## 📂 Folder Structure

MyRatingApp/
│
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── routes/
│ ├── server.js
│ ├── package.json
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── api/
│ │ └── App.js
│ ├── public/
│ └── package.json
│
└── screenshots/

🔑 Environment Variables
Backend
Key	Description
PORT	Backend port
JWT_SECRET	Signing key for tokens
DATABASE_URL	PostgreSQL connection string
Frontend
Key	Description
REACT_APP_API_URL	Backend API endpoint
📡 API Overview
Authentication
POST /api/users/signup
POST /api/users/login

Admin
GET    /api/admin/stats
POST   /api/admin/add-user
POST   /api/admin/add-store
GET    /api/admin/users
GET    /api/admin/stores
GET    /api/users/:id

Normal User
GET  /api/stores
POST /api/ratings

Store Owner
GET /api/ratings/owner

✔ Validations

-Name: 20–60 chars
-Address: max 400 chars
-Password: 8–16 chars, includes uppercase + special char
-Email: must be valid

📜 License

This project is for educational and assessment purposes.