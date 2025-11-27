import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo || !userInfo.token) {
        // Not logged in
        return <Navigate to="/login" replace />;
    }

    if (role && userInfo.role !== role) {
        // Logged in but unauthorized role
        return <Navigate to="/" replace />; // Redirect to home or an unauthorized page
    }

    return children;
};

export default PrivateRoute;
