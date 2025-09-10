# 🛠️ Task Manager API (Backend)

This is the **Express + MongoDB backend** for the Task Manager app.  
It provides **JWT authentication** and **CRUD APIs for tasks**.

---

## 🚀 Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing
- CORS + dotenv

---

## 📂 Project Structure


backend/
├── server.js
├── config/db.js
├── models/
│ ├── User.js
│ └── Task.js
├── controllers/
│ ├── authController.js
│ └── taskController.js
├── routes/
│ ├── authRoutes.js
│ └── taskRoutes.js
├── middleware/authMiddleware.js
├── package.json
└── .env.example


---

## 🔧 Setup Instructions

### 1. Clone repo
```bash
git clone https://github.com/99-tejrajdewangan/task-management-backend
cd task-manager-backend

2. Install dependencies
npm install

3. Configure environment variables

Create .env file from .env.example:

MONGO_URI=mongodb+srv://tejrajdewangan99_db_user:Aygd0TgRuogblgHL@taskdb.zlqrdii.mongodb.net/?retryWrites=true&w=majority&appName=taskdb
JWT_SECRET=verysecuresecret_here
PORT=5000

4. Run server
npm run dev   # development with nodemon
npm start     # production


Server runs on → http://localhost:5000

🛠️ API Endpoints
Auth

POST /api/auth/register → Register user

POST /api/auth/login → Login user

Tasks (Protected with JWT)

GET /api/tasks → Get tasks

POST /api/tasks → Create task

PUT /api/tasks/:id → Update task

DELETE /api/tasks/:id → Delete task