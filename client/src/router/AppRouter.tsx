import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Users from '../pages/Users';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route 
        path="/users" 
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/users" />} />
    </Routes>
  );
};

export default AppRouter;

