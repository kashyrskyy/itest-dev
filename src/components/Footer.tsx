// src/components/Footer.tsx
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#436850',
        color: '#FBFADA',
        padding: '20px',
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2">
        <Link href="https://open-meteo.com/en/docs" target="_blank" rel="noopener" style={{ color: '#FBFADA', textDecoration: 'none' }}>
          Open-Meteo API Documentation
        </Link>
      </Typography>
      <Typography variant="body2">
        GitHub Repo: <Link href="https://github.com/kashyrskyy/itest-dev" target="_blank" rel="noopener" style={{ color: '#FBFADA', textDecoration: 'none' }}>
          https://github.com/kashyrskyy/itest-dev
        </Link>
      </Typography>
      <Typography variant="body2">
        Contact: <Link href="mailto:andriy@intofuture.org" style={{ color: '#FBFADA', textDecoration: 'none' }}>andriy@intofuture.org</Link>
      </Typography>
      
      <Typography variant="body2" sx={{ marginTop: '10px' }}>
        &copy; 2024 Institute for Future Intelligence
      </Typography>
    </Box>
  );
};

export default Footer;