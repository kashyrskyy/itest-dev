import { useState } from "react";
import { Box, Typography, Select, MenuItem, Button } from "@mui/material";
import {
  ScatterChart,
  Scatter,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Brush,
  ReferenceLine,
} from "recharts";
import { corr } from "mathjs";

interface CorrelationAnalysisProps {
  data: any[]; // The filtered dataset
  variables: string[]; // List of variable names available for correlation
}

const CorrelationAnalysis: React.FC<CorrelationAnalysisProps> = ({
  data,
  variables,
}) => {
  const [var1, setVar1] = useState<string>(""); // Default to empty string
  const [var2, setVar2] = useState<string>(""); // Default to empty string
  const [correlation, setCorrelation] = useState<number | null>(null);
  const [regressionData, setRegressionData] = useState<any[]>([]);

  const formattedStartDate = data[0]?.Date 
    ? (data[0].Date instanceof Date ? data[0].Date : new Date(data[0].Date)).toLocaleDateString() 
    : "N/A";
  
  const formattedEndDate = data[data.length - 1]?.Date 
    ? (data[data.length - 1].Date instanceof Date ? data[data.length - 1].Date : new Date(data[data.length - 1].Date)).toLocaleDateString() 
    : "N/A";


  const calculateCorrelation = () => {
    if (!var1 || !var2 || var1 === var2) {
      alert("Please select two different variables.");
      return;
    }

    const x = data.map((row) => row[var1]);
    const y = data.map((row) => row[var2]);

    try {
      // Calculate correlation
      const result = corr(x, y) as number;
      setCorrelation(result);

      // Calculate regression line
      const regression = calculateRegression(x, y);
      setRegressionData(regression);
    } catch (error) {
      alert("Error calculating correlation. Please check your data.");
      setCorrelation(null);
    }
  };

  const calculateRegression = (x: number[], y: number[]) => {
    const xMean = x.reduce((sum, value) => sum + value, 0) / x.length;
    const yMean = y.reduce((sum, value) => sum + value, 0) / y.length;

    const numerator = x.reduce(
      (sum, xi, i) => sum + (xi - xMean) * (y[i] - yMean),
      0
    );
    const denominator = x.reduce((sum, xi) => sum + Math.pow(xi - xMean, 2), 0);

    const slope = numerator / denominator;
    const intercept = yMean - slope * xMean;

    // Generate regression line data points
    const minX = Math.min(...x);
    const maxX = Math.max(...x);
    return [
      { x: minX, y: slope * minX + intercept },
      { x: maxX, y: slope * maxX + intercept },
    ];
  };

  const prepareChartData = () => {
    return data.map((row) => ({
      x: row[var1!],
      y: row[var2!],
    }));
  };

  return (
    <Box
      bgcolor="#F8F6F4"
      p={2}
      borderRadius={2}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <Typography variant="h6" gutterBottom>
        Correlation Analysis
      </Typography>

      <Box display="flex" alignItems="center" gap={2}>
        <Select
          value={var1}
          onChange={(e) => setVar1(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="" disabled>
            Select Variable 1
          </MenuItem>
          {variables.map((variable) => (
            <MenuItem key={variable} value={variable}>
              {variable}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={var2}
          onChange={(e) => setVar2(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="" disabled>
            Select Variable 2
          </MenuItem>
          {variables.map((variable) => (
            <MenuItem key={variable} value={variable}>
              {variable}
            </MenuItem>
          ))}
        </Select>

        <Button variant="contained" color="primary" onClick={calculateCorrelation}>
          Calculate Correlation
        </Button>
      </Box>

      {correlation !== null && (
        <Box>
          <Typography variant="body1">
            <strong>Date Range:</strong> {formattedStartDate} - {formattedEndDate}
          </Typography>
          <Typography variant="body1">
            <strong>Sample Size:</strong> {data.length}
          </Typography>
          <Typography variant="body1">
            Correlation between <strong>{var1}</strong> and <strong>{var2}</strong>:{" "}
            {correlation.toFixed(3)}
          </Typography>
        </Box>
      )}

      {correlation !== null && (
        <Box mt={3}>
          <Typography variant="body2" gutterBottom>
            Scatterplot with Regression Line
          </Typography>
          <ScatterChartComponent
            data={prepareChartData()}
            regressionData={regressionData}
            var1={var1}
            var2={var2}
          />
        </Box>
      )}
    </Box>
  );
};

const ScatterChartComponent: React.FC<{
  data: any[];
  regressionData: any[];
  var1: string;
  var2: string;
}> = ({ data, regressionData, var1, var2 }) => {
  return (
    <ScatterChart
      width={800}
      height={500}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    >
      <CartesianGrid />
      <XAxis type="number" dataKey="x" name={var1 || "Variable 1"} label={{ value: var1 || "Variable 1", position: "insideBottom" }} />
      <YAxis type="number" dataKey="y" name={var2 || "Variable 2"} label={{ value: var2 || "Variable 2", angle: -90, position: "insideLeft" }} />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Scatter name="Data Points" data={data} fill="#8884d8" />
      <Line
        type="linear"
        data={regressionData}
        dataKey="y"
        stroke="#FF0000"
        dot={false}
        name="Regression Line"
      />
      <Brush />
      {/* Set explicit values for ReferenceLine */}
      <ReferenceLine x={0} stroke="gray" strokeDasharray="3 3" />
      <ReferenceLine y={0} stroke="gray" strokeDasharray="3 3" />
    </ScatterChart>
  );
};

export default CorrelationAnalysis;