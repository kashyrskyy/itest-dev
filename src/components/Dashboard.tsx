// src/components/Dashboard.tsx
import { useState } from 'react';
import { Box, CircularProgress, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationSelector from './DashboardMenu/LocationSelector';
import DateSelector from './DashboardMenu/DateSelector';
import HourlyVarSelector from './DashboardMenu/HourlyVarSelector';
import DailyVarSelector from './DashboardMenu/DailyVarSelector';
import { useWeatherData } from '../hooks/useWeatherData';
import HourlyDataTable from './VisualizationContainer/HourlyDataTable';
import DailyDataTable from './VisualizationContainer/DailyDataTable';
import DownloadButton from './VisualizationContainer/DownloadButton';
import MultiVariableVisualization from './VisualizationContainer/MultiVariableVisualization';
import SummaryStatistics from './SummaryStats/SummaryStatistics';
import { formatHourlyDataForCSV, formatDailyDataForCSV, formatDataForChart } from '../utils/dataFormatting';
import { hourlyVarMap, dailyVarMap } from '../utils/variableMappings';

const Dashboard: React.FC = () => {
  const [location, setLocation] = useState("Pearl Harbor");
  const [startDate, setStartDate] = useState("2024-09-01");
  const [endDate, setEndDate] = useState("2024-09-02");
  const [hourlyVariables, setHourlyVariables] = useState<string[]>([]);
  const [dailyVariables, setDailyVariables] = useState<string[]>([]);

  const { data, loading, error } = useWeatherData(location, startDate, endDate, hourlyVariables, dailyVariables);

  // Format the data for visualization
  const formattedHourlyData = data?.hourly ? formatDataForChart(data.hourly, hourlyVariables, hourlyVarMap) : [];
  const formattedDailyData = data?.daily ? formatDataForChart(data.daily, dailyVariables, dailyVarMap) : [];

  return (
    <Box p={3}>
      {/* Dashboard Navigation Menu */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        <LocationSelector location={location} setLocation={setLocation} />
        <DateSelector startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
        <HourlyVarSelector selectedVariables={hourlyVariables} setSelectedVariables={setHourlyVariables} />
        <DailyVarSelector selectedVariables={dailyVariables} setSelectedVariables={setDailyVariables} />
      </Box>

      {/* Main Content Area: Two-Column Layout */}
      <Box display="flex" justifyContent="space-between">
        {/* Left Column: Visualizations */}
        <Box flex={2} pr={2}>
          <Typography variant="h6" gutterBottom>
            Visualizations
          </Typography>
          {loading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}
          {hourlyVariables.length > 0 && formattedHourlyData.length > 0 && (
            <MultiVariableVisualization data={formattedHourlyData} selectedVariables={hourlyVariables} />
          )}
          {dailyVariables.length > 0 && formattedDailyData.length > 0 && (
            <MultiVariableVisualization data={formattedDailyData} selectedVariables={dailyVariables} />
          )}
        </Box>

        {/* Right Column: Summary Statistics */}
        <Box flex={1} pl={2}>
          {data && (
            <>
              <Typography variant="h6" gutterBottom>
                Summary Statistics
              </Typography>
              {hourlyVariables.length > 0 && data.hourly && (
                <SummaryStatistics
                  data={data.hourly}
                  selectedVariables={hourlyVariables}
                  variableMap={hourlyVarMap}
                />
              )}
              {dailyVariables.length > 0 && data.daily && (
                <SummaryStatistics
                  data={data.daily}
                  selectedVariables={dailyVariables}
                  variableMap={dailyVarMap}
                />
              )}
            </>
          )}
        </Box>
      </Box>

      {/* Data Tables */}
      <Box mt={3}>
        {data && (
          <>
            {/* Hourly Data Table Accordion */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="hourly-data-content"
                id="hourly-data-header"
              >
                <Typography variant="h6">View/Export: Hourly Data</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <DownloadButton
                    data={formatHourlyDataForCSV(data.hourly, hourlyVariables)}
                    headers={['time', ...hourlyVariables]}
                    filename={`HourlyData_${location}_${startDate}_to_${endDate}`}
                  />
                  <HourlyDataTable data={data.hourly} selectedVariables={hourlyVariables} />
                </Box>
              </AccordionDetails>
            </Accordion>

            {/* Daily Data Table Accordion */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="daily-data-content"
                id="daily-data-header"
              >
                <Typography variant="h6">View/Export: Daily Data</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <DownloadButton
                    data={formatDailyDataForCSV(data.daily, dailyVariables)}
                    headers={['time', ...dailyVariables]}
                    filename={`DailyData_${location}_${startDate}_to_${endDate}`}
                  />
                  <DailyDataTable data={data.daily} selectedVariables={dailyVariables} />
                </Box>
              </AccordionDetails>
            </Accordion>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;