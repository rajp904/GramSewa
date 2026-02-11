import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import api from '../services/api';
import { toast } from 'react-toastify';
import StatusBadge from '../components/StatusBadge';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    search: ''
  });
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchComplaints = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.status) params.append('status', filters.status);
      if (filters.search) params.append('search', filters.search);

      const token = localStorage.getItem('adminToken');
      const response = await api.get(`/admin/complaints?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setComplaints(response.data.complaints);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await api.get('/admin/complaints/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Stats error:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const categories = ['Street Light', 'Road', 'Nala/Drainage', 'Water', 'School'];
  const statuses = ['Pending', 'Approved', 'In Progress', 'Solved', 'Rejected'];

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1>🏛️ GramSewa Admin</h1>
          <p>Welcome, {admin?.name}</p>
        </div>
        <div className="admin-actions">
          {admin?.role === 'superadmin' && (
            <Link to="/admin/create-admin" className="btn btn-primary">
              + Add Admin
            </Link>
          )}
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Complaints</h3>
            <p className="stat-number">{stats.total}</p>
          </div>
          <div className="stat-card pending">
            <h3>Pending</h3>
            <p className="stat-number">{stats.pending}</p>
          </div>
          <div className="stat-card progress">
            <h3>In Progress</h3>
            <p className="stat-number">{stats.inProgress}</p>
          </div>
          <div className="stat-card solved">
            <h3>Solved</h3>
            <p className="stat-number">{stats.solved}</p>
          </div>
        </div>
      )}

      <div className="filters-section">
        <input
          type="text"
          name="search"
          placeholder="Search by title..."
          value={filters.search}
          onChange={handleFilterChange}
          className="search-input"
        />
        
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="">All Status</option>
          {statuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="complaints-table-container">
          <table className="complaints-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Submitted By</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td>
                    <img src={complaint.imageUrl} alt={complaint.title} className="table-image" />
                  </td>
                  <td>{complaint.title}</td>
                  <td>{complaint.category}</td>
                  <td><StatusBadge status={complaint.status} /></td>
                  <td>{complaint.createdBy?.name}</td>
                  <td>{new Date(complaint.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/admin/complaint/${complaint._id}`} className="btn btn-secondary btn-sm">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {complaints.length === 0 && (
            <div className="no-data">No complaints found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
