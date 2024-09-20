// src/components/VisualizationContainer/DailyDataTable.tsx
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { DailyWeatherData } from '../../types/weatherTypes';

interface DailyDataTableProps {
  data: DailyWeatherData;
  selectedVariables: string[];
}

const VARIABLE_MAP = {
  "Max Temperature": "temperature_2m_max",
  "Min Temperature": "temperature_2m_min",
  "Mean Temperature": "temperature_2m_mean",
  "Daylight Duration": "daylight_duration",
  "Sunshine Duration": "sunshine_duration",
  "Precipitation Hours": "precipitation_hours",
  "Shortwave Radiation (Sum)": "shortwave_radiation_sum",
};

const DailyDataTable: React.FC<DailyDataTableProps> = ({ data, selectedVariables }) => {
  // Filter the variables to display based on the selected variables
  const filteredVariables = selectedVariables
    .map(variable => VARIABLE_MAP[variable as keyof typeof VARIABLE_MAP])
    .filter(Boolean);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            {filteredVariables.map(variable => (
              <TableCell key={variable}>{variable}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.time.map((time, index) => (
            <TableRow key={time}>
              <TableCell>{time}</TableCell>
              {filteredVariables.map(variable => (
                <TableCell key={variable}>
                  {/* Check if data[variable] exists before accessing it */}
                  {data[variable as keyof DailyWeatherData] 
                    ? data[variable as keyof DailyWeatherData][index] 
                    : 'N/A'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DailyDataTable;