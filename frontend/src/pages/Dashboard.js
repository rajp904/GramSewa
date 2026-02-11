import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import StatusBadge from '../components/StatusBadge';
import './Dashboard.css';

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyComplaints();
  }, []);

  const fetchMyComplaints = async () => {
    try {
      const response = await api.get('/complaints/my');
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
          <h1>My Complaints</h1>
          <Link to="/create-complaint" className="btn btn-primary">
            + New Complaint
          </Link>
        </div>

        {complaints.length === 0 ? (
          <div className="no-complaints">
            <p>You haven't submitted any complaints yet.</p>
            <Link to="/create-complaint" className="btn btn-primary">
              Create Your First Complaint
            </Link>
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
                    Submitted: {new Date(complaint.createdAt).toLocaleDateString()}
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

export default Dashboard;
