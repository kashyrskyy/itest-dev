// src/App.tsx

import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import SensorDataDashboard from './components/SensorDashboard/SensorDataDashboard';

const App: React.FC = () => {
  return (
    <Router basename="/itest-dev">
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Box flexGrow={1} p={3}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sensor-dashboard" element={<SensorDataDashboard />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;