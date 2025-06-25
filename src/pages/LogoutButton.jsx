import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/authService';

const LogoutButton = () => {
  const { logout: authLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    authLogout();
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-red-600 font-semibold hover:text-red-800"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
