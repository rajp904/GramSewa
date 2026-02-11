import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-toastify';
import './Login.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      // Send token to backend
      const response = await api.post('/auth/google', { idToken });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        toast.success('Login successful!');
        navigate('/dashboard');
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
        <h1>🏛️ GramSewa</h1>
        <h2>Digital Panchayat Complaint System</h2>
        <p>Login with your Google account to submit complaints</p>
        
        <button 
          onClick={handleGoogleLogin} 
          disabled={loading}
          className="google-login-btn"
        >
          {loading ? 'Logging in...' : '🔐 Sign in with Google'}
        </button>

        <div className="admin-link">
          <p>Are you an admin? <a href="/admin/login">Login here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
