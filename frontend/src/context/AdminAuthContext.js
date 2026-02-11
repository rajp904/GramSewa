import React, { createContext, useState, useEffect, useContext } from 'react';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('admin'));
    const token = localStorage.getItem('adminToken');
    
    if (adminData && token) {
      setAdmin(adminData);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    setAdmin(null);
  };

  const value = {
    admin,
    loading,
    logout,
    setAdmin
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {!loading && children}
    </AdminAuthContext.Provider>
  );
};
