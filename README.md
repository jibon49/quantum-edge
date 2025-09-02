# Quantum Edge - Freelance Job Platform

A modern MERN stack freelance job platform where clients can post jobs and freelancers can browse and apply for opportunities.

## 🔗 Live Demo & Repository

- **Live Client**: [https://qe-client.vercel.app/](https://qe-client.vercel.app/)
- **Live Server**: [https://qe-server.vercel.app/](https://qe-server.vercel.app/)
- **GitHub Repository**: [https://github.com/jibon49/quantum-edge](https://github.com/jibon49/quantum-edge)

## 🚀 Features

### Core Functionality
- **User Authentication**: JWT-based authentication with Firebase
- **Job Management**: Complete CRUD operations for job postings
- **Profile Management**: User profile with job management dashboard
- **Job Discovery**: Browse and search available jobs
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### User Roles
- **Job Posters**: Create, edit, delete, and manage job postings
- **Job Seekers**: Browse jobs, view details, and apply for positions
- **Authentication**: Secure user registration and login system

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Navigation and routing
- **Tailwind CSS** - Styling and responsive design
- **React Icons** - Icon components
- **Axios** - HTTP client for API requests
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication tokens
- **CORS** - Cross-origin resource sharing

### Deployment
- **Vercel** - Frontend and backend hosting
- **MongoDB Atlas** - Cloud database

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas account)
- **Git**

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/jibon49/quantum-edge.git
cd quantum-edge
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd quantum-edge-server

# Install dependencies
npm install

# Create .env file
touch .env
```

Add the following environment variables to `.env`:

```env
PORT=5000
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
ACCESS_TOKEN_SECRET=your_jwt_secret_key
NODE_ENV=development
```

```bash
# Start the server
npm start
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to client directory (in a new terminal)
cd quantum-edge-client

# Install dependencies
npm install

# Create .env file
touch .env
```

Add the following environment variables to `.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

```bash
# Start the development server
npm run dev
```

The client will run on `http://localhost:5173`

## 📖 API Documentation

### Base URL
- **Development**: `http://localhost:5000`
- **Production**: `https://qe-server.vercel.app`

### Authentication Endpoints

#### POST `/jwt`
Generate JWT token for authenticated user
```json
// Request Body
{
  "email": "user@example.com"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### User Management

#### POST `/users`
Register a new user
```json
// Request Body
{
  "email": "user@example.com",
  "displayName": "John Doe"
}

// Response
{
  "acknowledged": true,
  "insertedId": "64f..."
}
```

### Job Management Endpoints

#### GET `/api/jobs/:email`
Get all jobs for a specific user (requires authentication)

**Headers**: `Authorization: Bearer <token>`

```json
// Response
[
  {
    "_id": "64f...",
    "title": "React Frontend Developer",
    "description": "Looking for an experienced React developer...",
    "priceRange": "$2,200-$2,600",
    "remote": true,
    "experienceLevel": "Senior level",
    "freelancerCount": 2,
    "skills": ["React", "JavaScript", "CSS"],
    "moreSkillsCount": 4,
    "creatorEmail": "user@example.com",
    "postedBy": "John Doe",
    "creatorName": "John Doe",
    "date": "Sep 2, 2025",
    "creationDate": "Sep 2, 2025",
    "createdAt": "2025-09-02T10:30:00.000Z",
    "updatedAt": "2025-09-02T10:30:00.000Z"
  }
]
```

#### POST `/api/jobs`
Create a new job posting (requires authentication)

**Headers**: `Authorization: Bearer <token>`

```json
// Request Body
{
  "title": "Full Stack Developer",
  "description": "We need a skilled full stack developer...",
  "priceRange": "$3,000-$5,000",
  "remote": true,
  "experienceLevel": "Expert level",
  "freelancerCount": 1,
  "skills": ["Node.js", "React", "MongoDB"],
  "moreSkillsCount": 2,
  "creatorEmail": "user@example.com",
  "postedBy": "John Doe",
  "creatorName": "John Doe"
}

// Response
{
  "_id": "64f...",
  "title": "Full Stack Developer",
  // ... other job fields
  "createdAt": "2025-09-02T10:30:00.000Z",
  "updatedAt": "2025-09-02T10:30:00.000Z"
}
```

#### PUT `/api/jobs/:id`
Update an existing job (requires authentication & ownership)

**Headers**: `Authorization: Bearer <token>`

```json
// Request Body
{
  "title": "Updated Job Title",
  "description": "Updated description...",
  "priceRange": "$4,000-$6,000"
}

// Response
{
  "_id": "64f...",
  "title": "Updated Job Title",
  // ... updated fields
  "updatedAt": "2025-09-02T11:00:00.000Z"
}
```

#### DELETE `/api/jobs/:id`
Delete a job (requires authentication & ownership)

**Headers**: `Authorization: Bearer <token>`

```json
// Response
{
  "message": "Job deleted successfully",
  "deletedId": "64f..."
}
```

### Public Endpoints

#### GET `/jobs`
Get all public job listings (no authentication required)

```json
// Response
[
  {
    "_id": "64f...",
    "title": "Website Design Project",
    "description": "Looking for a web designer...",
    // ... other job fields
  }
]
```

## 🗂️ Project Structure

```
quantum-edge/
├── quantum-edge-client/          # React frontend
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── Authproviders/       # Authentication context
│   │   ├── Firebase/            # Firebase configuration
│   │   ├── hooks/               # Custom React hooks
│   │   ├── Layout/              # Layout components
│   │   ├── Pages/               # Page components
│   │   │   ├── Home/           # Homepage with job listings
│   │   │   ├── Login/          # Login page
│   │   │   ├── Register/       # Registration page
│   │   │   ├── Profile/        # User profile & job management
│   │   │   └── Shared/         # Shared components
│   │   └── Routes/             # Route configuration
│   ├── package.json
│   └── vite.config.js
│
└── quantum-edge-server/         # Express.js backend
    ├── index.js                 # Main server file
    ├── package.json
    └── .env                     # Environment variables
```

## 🔧 Key Features Implementation

### 1. Authentication System
- JWT token-based authentication
- Firebase integration for user management
- Protected routes using middleware
- Automatic token refresh and logout

### 2. Job Management
- Complete CRUD operations for job postings
- User-specific job filtering
- Rich job details with skills, pricing, and requirements
- Real-time updates after operations

### 3. User Interface
- Responsive design with Tailwind CSS
- Interactive job cards with modal details
- Form validation and error handling
- Toast notifications for user feedback

### 4. Database Schema
```javascript
// Job Schema
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  priceRange: String,
  remote: Boolean,
  experienceLevel: String,
  freelancerCount: Number,
  skills: [String],
  moreSkillsCount: Number,
  creatorEmail: String (required),
  postedBy: String,
  creatorName: String,
  date: String,
  creationDate: String,
  createdAt: Date,
  updatedAt: Date
}

// User Schema
{
  _id: ObjectId,
  email: String (required, unique),
  displayName: String,
  createdAt: Date
}
```

## 🐛 Issues & Solutions

### Issue 1: Express 5.x Compatibility
**Problem**: Path-to-regexp compatibility issues with Express 5.x
```
TypeError: Missing parameter name at 1: https://git.new/pathToRegexpError
```
**Solution**: Downgraded to Express 4.18.0 for stability
```bash
npm install express@^4.18.0
```

### Issue 2: CORS Configuration
**Problem**: Cross-origin requests blocked in production
**Solution**: Proper CORS configuration in server
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'https://qe-client.vercel.app'],
  credentials: true
}));
```

### Issue 3: MongoDB Connection in Production
**Problem**: Database connection timeout in serverless environment
**Solution**: Optimized connection handling and added retry logic
```javascript
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
});
```

### Issue 4: Environment Variables in Vite
**Problem**: Environment variables not loading properly
**Solution**: Proper prefix with `VITE_` for client-side variables
```env
VITE_API_URL=https://qe-server.vercel.app
```

### Issue 5: Authentication State Persistence
**Problem**: User logged out on page refresh
**Solution**: Implemented proper token storage and validation
```javascript
// Store token in localStorage
localStorage.setItem('access-token', token);

// Verify token on app initialization
useEffect(() => {
  const token = localStorage.getItem('access-token');
  if (token) {
    // Verify and restore user session
  }
}, []);
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Backend (Vercel)
1. Create `vercel.json` configuration:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ]
}
```

2. Set environment variables in Vercel dashboard
3. Deploy using Vercel CLI or GitHub integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Jibon49**
- GitHub: [@jibon49](https://github.com/jibon49)
- Project: [Quantum Edge](https://github.com/jibon49/quantum-edge)

## 🙏 Acknowledgments

- React.js community for excellent documentation
- Tailwind CSS for the utility-first CSS framework
- MongoDB Atlas for cloud database services
- Vercel for seamless deployment experience
