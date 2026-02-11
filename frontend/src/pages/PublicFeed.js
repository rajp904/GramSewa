import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import StatusBadge from '../components/StatusBadge';
import './Dashboard.css';

const PublicFeed = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicComplaints();
  }, []);

  const fetchPublicComplaints = async () => {
    try {
      const response = await api.get('/complaints/public');
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

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading">Loading...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="dashboard-header">
          <h1>Public Complaints Feed</h1>
        </div>

        {complaints.length === 0 ? (
          <div className="no-complaints">
            <p>No complaints have been submitted yet.</p>
          </div>
        ) : (
          <div className="complaints-grid">
            {complaints.map((complaint) => (
              <div key={complaint._id} className="complaint-card">
                <img src={complaint.imageUrl} alt={complaint.title} />
                <div className="complaint-content">
                  <h3>{complaint.title}</h3>
                  <p className="category">📂 {complaint.category}</p>
                  <p className="description">{complaint.description.substring(0, 100)}...</p>
                  <div className="complaint-footer">
                    <StatusBadge status={complaint.status} />
                    <Link to={`/complaint/${complaint._id}`} className="btn btn-secondary">
                      View Details
                    </Link>
                  </div>
                  <p className="date">
                    By: {complaint.createdBy?.name} | {new Date(complaint.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PublicFeed;
