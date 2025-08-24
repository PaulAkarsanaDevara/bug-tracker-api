# Bug Tracker API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-4.x-blue?logo=express)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen?logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-yellow)

Bug Tracker API adalah aplikasi backend untuk manajemen bug/issue tracking.  
Dibangun dengan **Express.js**, **TypeScript**, dan **MongoDB**, API ini mendukung autentikasi JWT, role-based access (Admin, User dan Developer), serta pencatatan history setiap bug.

---

## ✨ Fitur Utama
- 🔐 **Autentikasi JWT** (Register & Login User)
- 👤 **Role-based Access** (Admin , User & Developer)
- 🐛 **CRUD Bug** (Create, Read, Update, Delete Bug)
- 📝 **History Tracking** setiap perubahan bug
- 📎 **Attachment Support** untuk upload file terkait bug
- 🏷️ **Label Support** untuk kategori bug
- 🔍 **Populate User → Bug History** dengan detail user

---

## 🛠 Tech Stack
- [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)  
- [JWT](https://jwt.io/) untuk autentikasi  
- [Multer](https://github.com/expressjs/multer) untuk upload attachment  


---

## ⚙️ Instalasi

### 1. Clone Repo
```bash
git clone https://github.com/username/bug-tracker-api.git
cd bug-tracker-api
```

### 2. Install Dependencies
```bash
npm install 
```

### 3. Setup Environment
Buat file .env di root project:
```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/bugtracker
JWT_SECRET=rahasia
```

### 4. Jalankan Server
```bash
npm run start:dev
```

---
## 📌 Endpoint API

### Auth
```bash 
  POST /api/auth/register
```
```bash 
  POST /api/auth/login
```
```bash 
  POST /api/auth/logout
```

