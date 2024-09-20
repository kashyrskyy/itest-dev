// src/components/VisualizationContainer/MultiVariableVisualization.tsx
import { Box, Typography } from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface MultiVariableVisualizationProps {
  data: any[];
  selectedVariables: string[];
}

const MultiVariableVisualization: React.FC<MultiVariableVisualizationProps> = ({ data, selectedVariables }) => {
  return (
    <Box>
      {selectedVariables.map((variable) => (
        <Box key={variable} mb={4}>
          <Typography variant="h6" gutterBottom>
            {variable} Over Time
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={variable} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      ))}
    </Box>
  );
};

export default MultiVariableVisualization;