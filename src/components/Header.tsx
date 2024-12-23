// src/components/Header.tsx
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import LogoutButton from "./LogoutButton";

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <AppBar position="static" sx={{ bgcolor: '#12372A' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          iTest - Development
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={Link}
            to="/dashboard"
            sx={{
              textDecoration: 'none',
              fontWeight: location.pathname === '/dashboard' ? 'bold' : 'normal',
            }}
          >
            Weather Dashboard
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/sensor-dashboard"
            sx={{
              textDecoration: 'none',
              fontWeight: location.pathname === '/sensor-dashboard' ? 'bold' : 'normal',
            }}
          >
            Sensor Dashboard
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/data-sources"
            sx={{
              textDecoration: "none",
              fontWeight: location.pathname === "/data-sources" ? "bold" : "normal",
            }}
          >
            Data Sources
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/my-account"
            sx={{
              textDecoration: "none",
              fontWeight: location.pathname === "/my-account" ? "bold" : "normal",
            }}
          >
            My Account
          </Button>
          <LogoutButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;