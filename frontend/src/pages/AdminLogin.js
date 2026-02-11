import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import api from '../services/api';
import { toast } from 'react-toastify';
import './Login.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAdmin } = useAdminAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const response = await api.post('/admin/login', formData);

      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('admin', JSON.stringify(response.data.admin));
        setAdmin(response.data.admin);
        toast.success('Login successful!');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🔐 Admin Login</h1>
        <h2>GramSewa Admin Panel</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="google-login-btn">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="admin-link">
          <p>Not an admin? <a href="/login">User Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
