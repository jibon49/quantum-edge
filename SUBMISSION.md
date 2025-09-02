# Task Submission For Internship


**Submission Date**: September 2, 2025  
**Technology**: MERN Stack

---

## 🔗 Live Demo Links

- **Frontend**: [https://qe-client.vercel.app/](https://qe-client.vercel.app/)
- **Backend API**: [https://qe-server.vercel.app/](https://qe-server.vercel.app/)
- **GitHub**: [https://github.com/jibon49/quantum-edge](https://github.com/jibon49/quantum-edge)

---

## 📋 Task Requirements Completed

✅ **Backend MongoDB Integration**: Removed old endpoints, implemented job CRUD operations  
✅ **Job CRUD API**: Complete Create, Read, Update, Delete functionality  
✅ **Frontend Integration**: Interactive job cards with CRUD options  
✅ **Authentication**: JWT-based secure system  
✅ **Deployment**: Live on Vercel with working APIs  

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js 4.18.0
- **Database**: MongoDB Atlas
- **Authentication**: JWT + Firebase
- **Deployment**: Vercel

---

## � API Endpoints

### Job Management
- `GET /api/jobs/:email` - Get user's jobs
- `POST /api/jobs` - Create new job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `GET /jobs` - Get all public jobs

### Authentication
- `POST /jwt` - Generate JWT token

---

## 🚀 Quick Setup

### Backend
```bash
cd quantum-edge-server
npm install
# Add .env with DB_USER, DB_PASS, ACCESS_TOKEN_SECRET
npm start
```

### Frontend
```bash
cd quantum-edge-client
npm install
# Add .env with VITE_API_URL and Firebase config
npm run dev
```

---
