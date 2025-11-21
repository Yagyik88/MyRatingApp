# 🌟 RateHub — Store Rating Platform  
_A Full-Stack Web Application for Rating & Managing Local Stores_

<p align="center">
  <img src="./ScreenShot/Screenshot_2025-11-22_014905.png" width="900" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-blue" />
  <img src="https://img.shields.io/badge/Auth-JWT-orange" />
  <img src="https://img.shields.io/badge/Status-Active-success" />
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

### 👨‍💻 System Administrator
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

### 🙍‍♂️ Normal User
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

### 🏪 Store Owner
- Log in  
- View dashboard:
  - List of users who rated their store  
  - Average rating  
- Logout  

---

## 🛠 Tech Stack  

### Frontend
- React.js  
- JavaScript  
- CSS (custom styled components)  

### Backend
- Node.js  
- Express.js  

### Database
- PostgreSQL  

### Authentication
- JWT  
- Bcrypt  

---

## 📸 Screenshots  

### 🏠 Landing Page
<p align="center">
  <img src="./ScreenShot/Screenshot 2025-11-22 014905.png" width="900" />
</p>

---

### 🔐 Login Page
<p align="center">
  <img src="./ScreenShot/Screenshot_2025-11-22_014925.png" width="900" />
</p>

---

### 📊 Admin Dashboard
<p align="center">
  <img src="./ScreenShot/Screenshot_2025-11-22_014950.png" width="900" />
</p>

---

## 📂 Folder Structure

```
MyRatingApp/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   └── App.js
│   ├── public/
│   └── package.json
│
└── ScreenShot/
```

---

## 🔧 Installation

### 1️⃣ Clone Repo
```
git clone https://github.com/Yagyik88/MyRatingApp.git
cd MyRatingApp
```

### 2️⃣ Install Backend Dependencies
```
cd backend
npm install
```

### 3️⃣ Install Frontend Dependencies
```
cd ../frontend
npm install
```

---

## 🔑 Environment Variables

### Backend (.env)

| Variable      | Description |
|---------------|-------------|
| PORT        | Backend port |
| JWT_SECRET  | Signing key for tokens |
| DATABASE_URL | PostgreSQL connection string |

### Frontend (.env)

| Variable            | Description |
|---------------------|-------------|
| REACT_APP_API_URL | Backend API endpoint |

---

## 📡 API Overview

### Authentication
| Method | Endpoint |
|--------|----------|
| POST | /api/users/signup |
| POST | /api/users/login |

### Admin
| Method | Endpoint |
|--------|----------|
| GET | /api/admin/stats |
| POST | /api/admin/add-user |
| POST | /api/admin/add-store |
| GET | /api/admin/users |
| GET | /api/admin/stores |
| GET | /api/users/:id |

### Normal User
| Method | Endpoint |
|--------|----------|
| GET | /api/stores |
| POST | /api/ratings |

### Store Owner
| Method | Endpoint |
|--------|----------|
| GET | /api/ratings/owner |

---

## ✔ Validations

| Field | Rule |
|-------|------|
| Name | 20–60 chars |
| Address | Max 400 chars |
| Password | 8–16 chars, includes uppercase + special char |
| Email | Must be valid |

---

## ☁️ Deployment

### Backend Options:
- Railway.app  
- Render.com  
- Supabase (database only)

### Frontend Options:
- Netlify  
- Vercel  

---

## 📜 License

This project is for educational and assessment purposes.

