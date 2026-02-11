import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import api from '../services/api';
import { toast } from 'react-toastify';
import { useAdminAuth } from '../context/AdminAuthContext';
import './AdminComplaintDetail.css';

const AdminComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useAdminAuth();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateForm, setUpdateForm] = useState({
    status: '',
    remark: ''
  });

  useEffect(() => {
    fetchComplaint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchComplaint = async () => {
    try {
      const response = await api.get(`/complaints/${id}`);
      if (response.data.success) {
        setComplaint(response.data.complaint);
        setUpdateForm({ ...updateForm, status: response.data.complaint.status });
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to fetch complaint details');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await api.put(
        `/admin/complaints/${id}/status`,
        updateForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success('Status updated successfully!');
        fetchComplaint();
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!complaint) {
    return <div className="error">Complaint not found</div>;
  }

  const statuses = ['Pending', 'Approved', 'In Progress', 'Solved', 'Rejected'];

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Complaint Details</h1>
        <div className="admin-actions">
          <button onClick={() => navigate('/admin/dashboard')} className="btn btn-secondary">
            Back to Dashboard
          </button>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>

      <div className="admin-detail-grid">
        <div className="admin-detail-main">
          <div className="detail-card">
            <h2>{complaint.title}</h2>
            <img src={complaint.imageUrl} alt={complaint.title} className="detail-image" />
            
            <div className="info-section">
              <h3>Details</h3>
              <p><strong>Category:</strong> {complaint.category}</p>
              <p><strong>Description:</strong></p>
              <p className="description-text">{complaint.description}</p>
              <p><strong>Submitted by:</strong> {complaint.createdBy?.name} ({complaint.createdBy?.email})</p>
              <p><strong>Submitted on:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
              {complaint.assignedTo && (
                <p><strong>Assigned to:</strong> {complaint.assignedTo.name}</p>
              )}
            </div>

            <div className="info-section">
              <h3>Location</h3>
              <p><strong>Coordinates:</strong> {complaint.location.latitude}, {complaint.location.longitude}</p>
              {complaint.location.address && (
                <p><strong>Address:</strong> {complaint.location.address}</p>
              )}
              <div className="map-container">
                <MapContainer
                  center={[complaint.location.latitude, complaint.location.longitude]}
                  zoom={15}
                  style={{ height: '300px', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap'
                  />
                  <Marker position={[complaint.location.latitude, complaint.location.longitude]}>
                    <Popup>{complaint.title}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-detail-sidebar">
          <div className="detail-card">
            <h3>Update Status</h3>
            <form onSubmit={handleStatusUpdate}>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={updateForm.status}
                  onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })}
                  required
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Remark</label>
                <textarea
                  value={updateForm.remark}
                  onChange={(e) => setUpdateForm({ ...updateForm, remark: e.target.value })}
                  placeholder="Add a remark (optional)"
                  rows="3"
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Update Status
              </button>
            </form>
          </div>

          <div className="detail-card">
            <h3>Status History</h3>
            <div className="status-history">
              {complaint.statusHistory.map((history, index) => (
                <div key={index} className="history-item">
                  <p className="history-status"><strong>{history.status}</strong></p>
                  <p className="history-remark">{history.remark}</p>
                  {history.updatedBy && (
                    <p className="history-admin">By: {history.updatedBy.name}</p>
                  )}
                  <p className="history-date">{new Date(history.timestamp).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminComplaintDetail;
