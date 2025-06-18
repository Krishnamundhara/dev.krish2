import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from '../components/Dashboard';
import Billing from '../components/Billing';
import BillingForm from '../components/BillingForm';
import BillView from '../components/BillView';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/billing"
        element={
          <PrivateRoute>
            <Billing />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/billing/create"
        element={
          <PrivateRoute>
            <BillingForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/billing/edit/:id"
        element={
          <PrivateRoute>
            <BillingForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/billing/view/:id"
        element={
          <PrivateRoute>
            <BillView />
          </PrivateRoute>
        }
      />
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
};

export default AppRoutes; 