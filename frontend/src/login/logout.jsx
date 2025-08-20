// AuthContext.js
import api from '../api';
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await api.post("/api/logout" ,{ withCredentials: true })
      .then((res) => {
        // setUser(); // Clear local auth state
        // navigate('/signup')
        console.log(res.data.message)
      })
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
