import React from 'react'
import { useAuth } from '../context/Auth_context';
import { Navigate } from 'react-router-dom';

function PrivateRoutes({children}) {

  const {user} = useAuth();

  return (
    user ? children : <Navigate to="/login" replace />
  )
}

export default PrivateRoutes