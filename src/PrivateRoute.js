import React from 'react';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ isAuth, conmponent }) {
  const token = localStorage.getItem('token');
  if (isAuth) {
    return token === null || token === 'false' ? <Navigate to="/signin" /> : conmponent;
  }
  return token !== null || token === 'true' ? <Navigate to="/todo" /> : conmponent;
}
