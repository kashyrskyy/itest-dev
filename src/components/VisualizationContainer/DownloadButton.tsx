// src/components/DownloadButton.tsx
import { Button } from '@mui/material';
import { convertToCSV } from '../../utils/csvUtils';

interface DownloadButtonProps {
  data: any[];
  headers: string[];
  filename: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ data, headers, filename }) => {
  const handleDownload = () => {
    const csvData = convertToCSV(data, headers);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
  };

  return (
    <Button onClick={handleDownload} variant="contained" color="primary" style={{ marginBottom: '10px' }}>
      Download {filename}
    </Button>
  );
};

export default DownloadButton;