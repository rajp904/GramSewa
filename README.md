# 🏛️ GramSewa - Digital Panchayat Complaint Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)

A complete, production-ready MERN Stack application for managing village-level complaints with dual authentication system, real-time status tracking, and geolocation integration.

![GramSewa Banner](https://via.placeholder.com/1200x300/2c3e50/ffffff?text=GramSewa+-+Digital+Panchayat+Complaint+System)

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Demo](#-demo)
- [Quick Start](#-quick-start)
- [Documentation](#-documentation)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 👥 User Features
- 🔐 **Google OAuth Authentication** - Secure login via Firebase
- 📝 **Create Complaints** - Submit complaints with image upload
- 📍 **Auto Geolocation** - Automatic location detection
- 📊 **Track Status** - Real-time complaint status updates
- 🗺️ **Interactive Maps** - View complaint locations on map
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop

### 👨‍💼 Admin Features
- 🔑 **JWT Authentication** - Secure email/password login
- 📈 **Dashboard** - Statistics and analytics
- 🔍 **Advanced Filters** - Filter by category, status, search
- ✅ **Status Management** - Update complaint workflow
- 📜 **Status History** - Complete audit trail
- 👥 **Assignment System** - Assign complaints to staff
- 🔐 **Role-Based Access** - Admin and Super Admin roles

### 🎯 Status Workflow
```
Pending → Approved → In Progress → Solved
                                 ↘ Rejected
```

### 📂 Categories
- 💡 Street Light
- 🛣️ Road
- 🚰 Nala/Drainage
- 💧 Water
- 🏫 School

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - UI library
- **React Router v6** - Navigation
- **Axios** - HTTP client
- **Firebase Auth** - Google OAuth
- **React Leaflet** - Interactive maps
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Firebase Admin SDK** - Token verification
- **JWT** - Admin authentication
- **Multer** - File upload
- **Cloudinary** - Image storage
- **Bcrypt** - Password hashing

## 🎬 Demo

**Live Demo**: [Coming Soon]

**Screenshots**:
- User Dashboard
- Admin Panel
- Complaint Details
- Status Timeline

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Cloudinary account
- Firebase project

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/rajp904/GramSewa.git
cd GramSewa
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

3. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your Firebase config
npm start
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend: http://localhost:5001
- Default Admin: admin@gramsewa.com / Admin@123

## 📚 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Get started in 10 minutes
- **[Setup Guide](SETUP_GUIDE.md)** - Detailed setup instructions
- **[API Documentation](API_DOCUMENTATION.md)** - Complete API reference
- **[Project Structure](PROJECT_STRUCTURE.md)** - Architecture details
- **[Features List](FEATURES.md)** - 150+ features documented

## 📁 Project Structure

```
gramsewa/
├── backend/
│   ├── config/          # Database, Firebase, Cloudinary config
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & upload middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   └── server.js        # Entry point
│
├── frontend/
│   ├── public/          # Static files
│   └── src/
│       ├── components/  # Reusable components
│       ├── context/     # React Context
│       ├── pages/       # Page components
│       ├── services/    # API calls
│       └── App.js       # Main component
│
└── docs/                # Documentation
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/google              # Google OAuth login
POST   /api/admin/login              # Admin login
```

### Complaints (User)
```
POST   /api/complaints               # Create complaint
GET    /api/complaints/my            # Get user's complaints
GET    /api/complaints/public        # Public feed
GET    /api/complaints/:id           # Get complaint details
```

### Admin
```
GET    /api/admin/complaints         # Get all complaints
GET    /api/admin/complaints/stats   # Get statistics
PUT    /api/admin/complaints/:id/status    # Update status
PUT    /api/admin/complaints/:id/assign    # Assign complaint
POST   /api/admin/create             # Create admin (Super Admin)
```

## 🌐 Deployment

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect repository
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Connect repository
2. Set build command: `npm run build`
3. Set environment variables
4. Deploy

### Database
- MongoDB Atlas (already configured)

**Detailed deployment guide**: See [SETUP_GUIDE.md](SETUP_GUIDE.md)

## 🔒 Security

- Firebase token verification
- JWT authentication
- Password hashing with bcrypt
- Protected routes
- Role-based access control
- Input validation
- File upload validation
- Environment variables

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Raj Patel**
- GitHub: [@rajp904](https://github.com/rajp904)
- Project: [GramSewa](https://github.com/rajp904/GramSewa)

## 🙏 Acknowledgments

- Firebase for authentication
- Cloudinary for image storage
- MongoDB Atlas for database hosting
- OpenStreetMap for maps

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.

---

**Made with ❤️ for Digital India Initiative**
