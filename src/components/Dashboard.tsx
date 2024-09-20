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
import DownloadButton from './VisualizationContainer/DownloadButton'; // Import DownloadButton
import { formatHourlyDataForCSV, formatDailyDataForCSV } from '../utils/dataFormatting'; // Import formatting functions

const Dashboard: React.FC = () => {
  const [location, setLocation] = useState("Pearl Harbor");
  const [startDate, setStartDate] = useState("2024-08-01");
  const [endDate, setEndDate] = useState("2024-08-10");
  const [hourlyVariables, setHourlyVariables] = useState<string[]>([]);
  const [dailyVariables, setDailyVariables] = useState<string[]>([]);

  const { data, loading, error } = useWeatherData(location, startDate, endDate, hourlyVariables, dailyVariables);

  return (
    <Box p={3}>
      <LocationSelector location={location} setLocation={setLocation} />
      <DateSelector startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
      <HourlyVarSelector selectedVariables={hourlyVariables} setSelectedVariables={setHourlyVariables} />
      <DailyVarSelector selectedVariables={dailyVariables} setSelectedVariables={setDailyVariables} />

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {data && (
        <>
          {/* Hourly Data Table Accordion */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="hourly-data-content"
              id="hourly-data-header"
            >
              <Typography variant="h6">Hourly Data</Typography>
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
              <Typography variant="h6">Daily Data</Typography>
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
  );
};

export default Dashboard;