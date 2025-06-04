# 📊 Chapter Performance Dashboard - Backend API

A scalable and optimized RESTful API backend built using **Node.js**, **Express.js**, **MongoDB Atlas**, and **Redis**. Designed to serve a real-world **Chapter Performance Dashboard**, it supports chapter management, filtering, caching, rate-limiting, and admin-only uploads.

---

## 🚀 Features

- 📚 **Chapters API** with GET, POST, filtering, and pagination
- 🔐 **Admin-only chapter upload** (file-based via JWT & Passport.js)
- 🧹 **Mongoose Validation** and error reporting for bad entries
- ⚡ **Redis Caching**: Speeds up GET `/chapters` (1-hour TTL)
- 🚫 **Rate Limiting**: 30 requests/min per IP (Redis-backed)
- ☁️ **MongoDB Atlas** as database
- ☁️ **Redis Cloud** as cache store

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB Atlas** + **Mongoose**
- **Redis** (via Redis Cloud)
- **Passport.js** + **JWT**
- **Multer** (for file uploads)
- **Render** (for deployment)

---

## 📁 Folder Structure

```

src/
├── config/          # DB & passport config
├── controllers/     # Route logic
├── services/        # Business logic
├── repositories/    # Mongoose model operations
├── routes/          # All API routes
├── middlewares/     # Auth, rate limiter, Redis cache
├── models/          # Mongoose schemas
└── index.js         # App entry point

````

---

## 🔐 Authentication

Chapters can only be uploaded by **authenticated admins** using **JWT**.  
Set user role to `admin` during registration or manually in the DB.

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://default:<password>@<host>:<port>
```

---

## 🧪 API Endpoints

| Method | Endpoint               | Description                            |
| ------ | ---------------------- | -------------------------------------- |
| GET    | `/api/v1/chapters`     | Get all chapters (filter + pagination) |
| GET    | `/api/v1/chapters/:id` | Get a specific chapter by ID           |
| POST   | `/api/v1/chapters`     | Admin uploads JSON file of chapters    |
| POST   | `/api/register`        | Register a user                        |
| POST   | `/api/login`           | Login and receive JWT token            |

### 🔍 GET `/api/v1/chapters` Filters:

Supports query params:

* `class=Class 11`
* `unit=Mechanics 1`
* `status=Not Started`
* `weakChapters=true`
* `subject=Physics`
* `page=1&limit=10`

---

## 📂 Upload Format

Admin should upload a **JSON file** containing an array of chapters:

```json
[
  {
    "subject": "Physics",
    "chapter": "Mathematics in Physics",
    "class": "Class 11",
    "unit": "Mechanics 1",
    "yearWiseQuestionCount": {
      "2019": 0,
      "2020": 2,
      "2021": 5,
      "2022": 5,
      "2023": 3,
      "2024": 7,
      "2025": 6
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": false
  }
]
```

---

## ⚙️ Deployment Info

This backend is deployed on:

* 🔗 **Render** (Web service)
* 🗃️ **MongoDB Atlas** (Database)
* ⚡ **Redis Cloud** (Caching & Rate Limiting)

---

## 🧠 Future Improvements

* Chapter update & delete APIs (admin only)
* Performance charts based on solved counts
* Frontend dashboard (React/Next.js)
* Unit tests with Jest

---

## 📄 License

This project is licensed under the MIT License.

---
