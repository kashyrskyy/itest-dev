import { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import DateSelector from '../DashboardMenu/DateSelector';
import SensorVariableSelector from './SensorVariableSelector';
import SensorDataVisualization from './SensorDataVisualization';
import SensorSummaryStatistics from './SensorSummaryStatistics';
import CollapsibleDataTable from './CollapsibleDataTable';
import { parseSensorData, filterSensorData } from '../../utils/sensorDataUtils';

const SensorDataDashboard: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedVariables, setSelectedVariables] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const parsedData = await parseSensorData();
      setData(parsedData);
      setStartDate(parsedData[0]?.Date || ''); // First record
      setEndDate(parsedData[parsedData.length - 1]?.Date || ''); // Last record
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredData = filterSensorData(data, startDate, endDate, selectedVariables);

  return (
    <Box p={3}>
      {/* Notification about data availability */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="body2" color="textSecondary">
          Note: Sensor data is displayed for the selected time range and variables. Please ensure variable selection for visualization.
        </Typography>
      </Paper>

      {/* Dashboard Navigation Menu */}
      <Box mb={3}>
        <Grid container spacing={2} alignItems="flex-start">
          {/* Left Side: Date Selection */}
          <Grid item xs={12} sm={4}>
            <Box display="flex" flexWrap="wrap" gap={2} bgcolor="#E3F4F4" p={2} borderRadius={2}>
              <DateSelector
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
            </Box>
          </Grid>

          {/* Right Side: Variable Selection */}
          <Grid item xs={12} sm={8}>
            <Box display="flex" flexWrap="wrap" gap={2} bgcolor="#E3F4F4" p={2} borderRadius={2}>
              <SensorVariableSelector
                selectedVariables={selectedVariables}
                setSelectedVariables={setSelectedVariables}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Main Content Area: Two-Column Layout */}
      <Box display="flex" justifyContent="space-between">
        {/* Left Column: Visualizations */}
        <Box flex={2} pr={2} bgcolor="#F8F6F4" p={2} borderRadius={2}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Visualizations
          </Typography>
          {loading && <CircularProgress />}
          {!loading && selectedVariables.length > 0 && (
            <SensorDataVisualization data={filteredData} selectedVariables={selectedVariables} />
          )}
          {!loading && selectedVariables.length === 0 && (
            <Typography>Select at least one variable to visualize the data.</Typography>
          )}
        </Box>

        {/* Right Column: Summary Statistics */}
        <Box flex={1} pl={2} bgcolor="#F8F6F4" p={2} borderRadius={2}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Summary Statistics
          </Typography>
          {loading && <CircularProgress />}
          {!loading && selectedVariables.length > 0 && (
            <SensorSummaryStatistics data={filteredData} selectedVariables={selectedVariables} />
          )}
          {!loading && selectedVariables.length === 0 && (
            <Typography>Select at least one variable to calculate statistics.</Typography>
          )}
        </Box>
      </Box>

      {/* Collapsible Data Table */}
      <Box mt={3}>
        <CollapsibleDataTable data={filteredData} selectedVariables={selectedVariables} />
      </Box>
    </Box>
  );
};

export default SensorDataDashboard;