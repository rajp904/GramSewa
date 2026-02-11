import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import api from '../services/api';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import './ComplaintDetail.css';

const ComplaintDetail = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchComplaint = async () => {
    try {
      const response = await api.get(`/complaints/${id}`);
      if (response.data.success) {
        setComplaint(response.data.complaint);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to fetch complaint details');
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

  if (!complaint) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="error">Complaint not found</div>
        </div>
      </>
    );
  }

  const statuses = ['Pending', 'Approved', 'In Progress', 'Solved', 'Rejected'];
  const currentStatusIndex = statuses.indexOf(complaint.status);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="complaint-detail">
          <div className="detail-header">
            <h1>{complaint.title}</h1>
            <span className={`status-badge status-${complaint.status.toLowerCase().replace(' ', '-')}`}>
              {complaint.status}
            </span>
          </div>

          <div className="detail-grid">
            <div className="detail-main">
              <div className="detail-section">
                <img src={complaint.imageUrl} alt={complaint.title} className="detail-image" />
              </div>

              <div className="detail-section">
                <h3>Details</h3>
                <p><strong>Category:</strong> {complaint.category}</p>
                <p><strong>Description:</strong></p>
                <p className="description-text">{complaint.description}</p>
                <p><strong>Submitted by:</strong> {complaint.createdBy?.name}</p>
                <p><strong>Submitted on:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
                {complaint.assignedTo && (
                  <p><strong>Assigned to:</strong> {complaint.assignedTo.name}</p>
                )}
              </div>

              <div className="detail-section">
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
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    <Marker position={[complaint.location.latitude, complaint.location.longitude]}>
                      <Popup>{complaint.title}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </div>

            <div className="detail-sidebar">
              <div className="detail-section">
                <h3>Status Timeline</h3>
                <div className="status-timeline">
                  {statuses.map((status, index) => {
                    const isActive = status === complaint.status;
                    const isPassed = index <= currentStatusIndex && complaint.status !== 'Rejected';
                    const isRejected = complaint.status === 'Rejected' && status === 'Rejected';
                    
                    return (
                      <div
                        key={status}
                        className={`timeline-item ${isActive ? 'active' : ''} ${isPassed || isRejected ? 'passed' : ''}`}
                      >
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                          <p className="timeline-status">{status}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="detail-section">
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
      </div>
    </>
  );
};

export default ComplaintDetail;
