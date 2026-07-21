import React from 'react';
import { HOME_URL } from '../../utils/appConfig';

/**
 * Wraps the dashboard routes. If there's no session token, we send the
 * visitor to the common home app's login page instead of rendering a
 * fake/default user.
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = `${HOME_URL}/login`;
    return null;
  }

  return children;
};

export default ProtectedRoute;
