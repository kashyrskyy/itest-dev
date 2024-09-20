// src/components/SummaryStatistics.tsx
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import {
  calculateMin,
  calculateMax,
  calculateMean,
  calculateMedian,
  calculateStandardDeviation,
  calculateVariance,
  calculateIQR,
  calculateMode,
  calculateConfidenceInterval,
} from '../../utils/statistics';

interface SummaryStatisticsProps {
  data: any; // Hourly or Daily data
  selectedVariables: string[];
  variableMap: { [key: string]: string }; // Mapping from display name to data key
}

const SummaryStatistics: React.FC<SummaryStatisticsProps> = ({
  data,
  selectedVariables,
  variableMap
}) => {
  const renderStatistics = (variable: string) => {
    const key = variableMap[variable];
    const values = data[key];

    if (!values || values.length === 0) {
      return null;
    }

    const min = calculateMin(values);
    const max = calculateMax(values);
    const mean = calculateMean(values);
    const median = calculateMedian(values);
    const standardDeviation = calculateStandardDeviation(values);
    const variance = calculateVariance(values);
    const iqr = calculateIQR(values);
    const mode = calculateMode(values);
    const [lowerCI, upperCI] = calculateConfidenceInterval(values);

    return (
      <TableRow key={variable}>
        <TableCell>{variable}</TableCell>
        <TableCell>{min.toFixed(2)}</TableCell>
        <TableCell>{mean.toFixed(2)}</TableCell>
        <TableCell>{max.toFixed(2)}</TableCell>
        <TableCell>{median.toFixed(2)}</TableCell>
        <TableCell>{standardDeviation.toFixed(2)}</TableCell>
        <TableCell>{variance.toFixed(2)}</TableCell>
        <TableCell>{iqr.toFixed(2)}</TableCell>
        <TableCell>{mode.length > 0 ? mode.join(', ') : 'No mode'}</TableCell>
        <TableCell>[{lowerCI.toFixed(2)}, {upperCI.toFixed(2)}]</TableCell>
      </TableRow>
    );
  };

  return (
    <Box p={3}>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Variable</TableCell>
              <TableCell>Min</TableCell>
              <TableCell>Mean</TableCell>
              <TableCell>Max</TableCell>
              <TableCell>Median</TableCell>
              <TableCell>Std Dev</TableCell>
              <TableCell>Variance</TableCell>
              <TableCell>IQR</TableCell>
              <TableCell>Mode</TableCell>
              <TableCell> 95% CI</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedVariables.map((variable) => (
              renderStatistics(variable)
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SummaryStatistics;