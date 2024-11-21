import { useState, useEffect } from 'react';
import { Box, Button, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import DateSelector from '../DashboardMenu/DateSelector';
import SensorVariableSelector from './SensorVariableSelector';
import SensorDataVisualization from './SensorDataVisualization';
import SensorSummaryStatistics from './SensorSummaryStatistics';
import CollapsibleDataTable from './CollapsibleDataTable';
import CorrelationAnalysis from "../DataAnalysis/CorrelationAnalysis";
import { parseSensorData, filterSensorData } from '../../utils/sensorDataUtils';

const SensorDataDashboard: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedVariables, setSelectedVariables] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [isCorrelationOpen, setIsCorrelationOpen] = useState(false); // Toggle state

  const variables = [
    "Temperature",
    "Ext.Temperature",
    "Humidity",
    "Ext.Humidity",
    "CO2",
    "pH",
    "Salinity"
  ];  

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
    <Box p={3} display="flex" flexDirection="column">
      {/* Notification about data availability */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="body2" color="textSecondary">
          Note: Sensor data is displayed for the available time range - November 7-21, 2024. Please ensure variable selection for visualization.
        </Typography>
      </Paper>

      {/* Dashboard Navigation Menu */}
      <Box mb={3}>
        <Grid container spacing={2} alignItems="flex-start">
          {/* Left Side: Date Selection */}
          <Grid item xs={12} sm={4}>
            <Box display="flex" flexWrap="wrap" gap={2} bgcolor="#E3F4F4" p={2} borderRadius={2}>
              <DateSelector startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
            </Box>
          </Grid>
          {/* Right Side: Variable Selection */}
          <Grid item xs={12} sm={8}>
            <Box display="flex" flexWrap="wrap" gap={2} bgcolor="#E3F4F4" p={2} borderRadius={2}>
              <SensorVariableSelector selectedVariables={selectedVariables} setSelectedVariables={setSelectedVariables} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Main Content Area: Two-Column Layout */}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        flexGrow={1}
        gap={2}
        height="100%"
      >
        {/* Left Column: Visualizations */}
        <Box
          width="66.67%" // 2/3 of space
          bgcolor="#F8F6F4"
          p={2}
          borderRadius={2}
          minHeight="400px"
          display="flex"
          flexDirection="column"
        >
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
        <Box
          width="33.33%" // 1/3 of space
          bgcolor="#F8F6F4"
          p={2}
          borderRadius={2}
          minHeight="400px"
          display="flex"
          flexDirection="column"
        >
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

      {/* Correlation Analysis Toggle */}
      <Box mt={3}>
        <Button
          variant="contained"
          color={isCorrelationOpen ? "secondary" : "primary"}
          onClick={() => setIsCorrelationOpen(!isCorrelationOpen)}
        >
          {isCorrelationOpen ? "Hide Correlation Analysis" : "Show Correlation Analysis"}
        </Button>
      </Box>

      {/* Conditional Rendering of Correlation Analysis */}
      {isCorrelationOpen && (
        <Grid item xs={12} sm={4}>
          <CorrelationAnalysis
            data={data.filter((row) => row.Date >= startDate && row.Date <= endDate)} // Filter data by date range
            variables={variables}
          />
        </Grid>
      )}

      {/* Collapsible Data Table */}
      <Box mt={3}>
        <CollapsibleDataTable data={filteredData} selectedVariables={selectedVariables} />
      </Box>
    </Box>
  );
};

export default SensorDataDashboard;