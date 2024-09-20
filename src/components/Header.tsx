// src/components/Header.tsx
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header: React.FC = () => {
  const handleDashboardClick = () => {
    // This function can handle the navigation to the Dashboard
    // For now, it can be a simple page reload or a link to the dashboard route
    window.location.reload(); // Refresh the page as a placeholder
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#436850' }}>
      <Toolbar>
        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
          iTest Web App
        </Typography>
        <Button
          color="inherit"
          onClick={handleDashboardClick}
          style={{ fontWeight: 'bold', fontSize: '16px' }}
        >
          Weather Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;