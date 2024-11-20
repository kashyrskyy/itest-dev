import { Box, Typography, Paper } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface SensorDataVisualizationProps {
  data: any[];
  selectedVariables: string[];
}

const SensorDataVisualization: React.FC<SensorDataVisualizationProps> = ({
  data,
  selectedVariables,
}) => {
  return (
    <Box>
      {selectedVariables.map((variable) => (
        <Paper key={variable} elevation={3} sx={{ mb: 4, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {variable} Over Time
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" /> {/* Directly use preprocessed timestamps */}
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={variable}
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      ))}
    </Box>
  );
};

export default SensorDataVisualization;