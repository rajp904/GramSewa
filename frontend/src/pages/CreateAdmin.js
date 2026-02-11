import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import api from '../services/api';
import { toast } from 'react-toastify';
import './CreateAdmin.css';

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAdminAuth();

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
      const token = localStorage.getItem('adminToken');
      const response = await api.post('/admin/create', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        toast.success('Admin created successfully!');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Create admin error:', error);
      toast.error(error.response?.data?.message || 'Failed to create admin');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Create New Admin</h1>
        <div className="admin-actions">
          <button onClick={() => navigate('/admin/dashboard')} className="btn btn-secondary">
            Back to Dashboard
          </button>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>

      <div className="create-admin-form-container">
        <form onSubmit={handleSubmit} className="create-admin-form">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Admin name"
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="admin@example.com"
            />
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Strong password"
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label>Role *</label>
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Creating...' : 'Create Admin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;
