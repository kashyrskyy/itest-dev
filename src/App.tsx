// src/App.tsx

import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";

import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from './components/Dashboard';
import SensorDataDashboard from './components/SensorDashboard/SensorDataDashboard';

import MyAccount from "./components/MyAccount";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router basename="/itest-dev">
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Header />
          <Box flexGrow={1} p={3}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              {/* Private Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sensor-dashboard"
                element={
                  <ProtectedRoute>
                    <SensorDataDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-account"
                element={
                  <ProtectedRoute>
                    <MyAccount />
                  </ProtectedRoute>
                }
              />
              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </AuthProvider>
  );
};

export default App;