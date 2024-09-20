// src/components/VisualizationContainer/HourlyDataTable.tsx
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { HourlyWeatherData } from '../../types/weatherTypes';

interface HourlyDataTableProps {
  data: HourlyWeatherData;
  selectedVariables: string[];
}

const VARIABLE_MAP = {
  "Temperature": "temperature_2m",
  "Humidity": "relative_humidity_2m",
  "Precipitation": "precipitation",
  "Pressure": "pressure_msl",
  "Cloud Cover": "cloud_cover",
  "Low Cloud Cover": "cloud_cover_low",
  "Mid Cloud Cover": "cloud_cover_mid",
  "High Cloud Cover": "cloud_cover_high",
  "Evapotranspiration": "et0_fao_evapotranspiration",
  "Wind Speed": "wind_speed_10m",
  "Wind Direction": "wind_direction_10m",
  "Wind Gusts": "wind_gusts_10m",
  "Shortwave Radiation (Instant)": "shortwave_radiation_instant",
  "Diffuse Radiation": "diffuse_radiation_instant",
};

const HourlyDataTable: React.FC<HourlyDataTableProps> = ({ data, selectedVariables }) => {
  // Filter the variables to display based on the selected variables
  const filteredVariables = selectedVariables
    .map((variable: string) => VARIABLE_MAP[variable as keyof typeof VARIABLE_MAP])
    .filter((variable): variable is keyof HourlyWeatherData => variable !== undefined);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            {filteredVariables.map((variable) => (
              <TableCell key={variable}>{variable}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.time.map((time: string, index: number) => (
            <TableRow key={time}>
              <TableCell>{time}</TableCell>
              {filteredVariables.map((variable) => (
                <TableCell key={variable}>
                  {/* Check if data[variable] exists before accessing it */}
                  {data[variable] ? data[variable][index] : 'N/A'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HourlyDataTable;