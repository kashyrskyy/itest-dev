// src/App.tsx

import { Box } from '@mui/material';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box flexGrow={1} p={3}>
        <Dashboard />
      </Box>
      <Footer /> {/* Add the Footer component */}
    </Box>
  );
};

export default App;