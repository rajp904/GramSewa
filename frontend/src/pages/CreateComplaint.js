import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import './CreateComplaint.css';

const CreateComplaint = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    latitude: '',
    longitude: '',
    address: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const navigate = useNavigate();

  const categories = ['Street Light', 'Road', 'Nala/Drainage', 'Water', 'School'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const getLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          });
          toast.success('Location fetched successfully!');
          setLocationLoading(false);
        },
        (error) => {
          toast.error('Unable to fetch location. Please enter manually.');
          setLocationLoading(false);
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
      setLocationLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error('Please upload an image');
      return;
    }

    if (!formData.latitude || !formData.longitude) {
      toast.error('Please provide location');
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('description', formData.description);
      data.append('latitude', formData.latitude);
      data.append('longitude', formData.longitude);
      data.append('address', formData.address);
      data.append('image', image);

      const response = await api.post('/complaints', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        toast.success('Complaint submitted successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="create-complaint-container">
          <h1>Create New Complaint</h1>
          <form onSubmit={handleSubmit} className="complaint-form">
            <div className="form-group">
              <label>Complaint Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Brief title of your complaint"
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Describe your complaint in detail"
              />
            </div>

            <div className="form-group">
              <label>Upload Image (Photo Proof) *</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>

            <div className="location-section">
              <h3>Location</h3>
              <button
                type="button"
                onClick={getLocation}
                disabled={locationLoading}
                className="btn btn-secondary"
              >
                {locationLoading ? 'Fetching...' : '📍 Get Current Location'}
              </button>

              <div className="form-row">
                <div className="form-group">
                  <label>Latitude *</label>
                  <input
                    type="number"
                    step="any"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 28.6139"
                  />
                </div>

                <div className="form-group">
                  <label>Longitude *</label>
                  <input
                    type="number"
                    step="any"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 77.2090"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address (Optional)</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street address or landmark"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary submit-btn">
              {loading ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateComplaint;
