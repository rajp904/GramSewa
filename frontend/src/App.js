import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';

import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateComplaint from './pages/CreateComplaint';
import ComplaintDetail from './pages/ComplaintDetail';
import PublicFeed from './pages/PublicFeed';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminComplaintDetail from './pages/AdminComplaintDetail';
import CreateAdmin from './pages/CreateAdmin';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AdminAuthProvider>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Navigate to="/public-feed" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/public-feed" element={<PublicFeed />} />
              <Route path="/complaint/:id" element={<ComplaintDetail />} />

              {/* Protected User Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-complaint"
                element={
                  <ProtectedRoute>
                    <CreateComplaint />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboard />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/complaint/:id"
                element={
                  <AdminProtectedRoute>
                    <AdminComplaintDetail />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/create-admin"
                element={
                  <AdminProtectedRoute>
                    <CreateAdmin />
                  </AdminProtectedRoute>
                }
              />
            </Routes>

            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </AdminAuthProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
