import { Navigate } from 'react-router-dom';
import api from '../services/api';

/**
 * PrivateRoute Component
 * Protects routes that require authentication
 * Redirects to login if user is not authenticated
 */
const PrivateRoute = ({ children }) => {
    const token = api.getToken();

    // If no token, redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the children components
    return children;
};

export default PrivateRoute;
