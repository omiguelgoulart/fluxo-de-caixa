import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const isAuthenticated = () => {
  const authToken = localStorage.getItem('authToken');
  const users = JSON.parse(localStorage.getItem('users')) || [];

  if (authToken) {
    const user = users.find((u) => u.username === authToken);
    if (user) {
      return true;
    }
  }
  return false;
};

const ProtectRoutes = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};

ProtectRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectRoutes;
