// src/components/VisualizationContainer/DataVisualization.tsx
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface DataVisualizationProps {
  data: any[]; // The formatted data for recharts
  selectedVariables: string[]; // Selected variables to visualize
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ data, selectedVariables }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        {selectedVariables.map((variable) => (
          <Line
            key={variable}
            type="monotone"
            dataKey={variable}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DataVisualization;
