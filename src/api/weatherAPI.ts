import axios from 'axios';

const BASE_URL = 'https://archive-api.open-meteo.com/v1/archive';
const TEMPERATURE_UNIT = '&temperature_unit=fahrenheit';
const WIND_SPEED_UNIT = '&wind_speed_unit=mph';
const PRECIPITATION_UNIT = '&precipitation_unit=inch';
const TIMEZONE = '&timezone=auto';

const LOCATIONS = [
  { name: "Pearl Harbor", lat: 21.3448, lon: -157.9774 },
  { name: "Kaneohe", lat: 21.4505, lon: -157.768 },
  { name: "Makapu’u", lat: 21.3108, lon: -157.6492 }
];

// Updated and unique VARIABLE_MAP
const VARIABLE_MAP = {
  // Daily Variables
  "Max Temperature": "temperature_2m_max",
  "Min Temperature": "temperature_2m_min",
  "Mean Temperature": "temperature_2m_mean",
  "Daylight Duration": "daylight_duration",
  "Sunshine Duration": "sunshine_duration",
  "Precipitation Hours": "precipitation_hours",
  "Shortwave Radiation (Sum)": "shortwave_radiation_sum", // Unique name
  
  // Hourly Variables
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
  "Shortwave Radiation (Instant)": "shortwave_radiation_instant", // Unique name
  "Diffuse Radiation": "diffuse_radiation_instant",
};

const getVariableString = (selectedVariables: string[], type: 'hourly' | 'daily') => {
  const variables = selectedVariables
    .map(variable => VARIABLE_MAP[variable as keyof typeof VARIABLE_MAP]) // Use `keyof` to ensure it's a valid key
    .filter(Boolean);
  return variables.join(',') || (type === 'hourly' ? 'temperature_2m' : 'temperature_2m_max'); // Default if none selected
};

export const fetchWeatherData = async (location: string, startDate: string, endDate: string, hourlyVariables: string[], dailyVariables: string[]) => {
  try {
    const selectedLocation = LOCATIONS.find((loc) => loc.name === location);
    if (!selectedLocation) {
      throw new Error("Location not found");
    }

    const hourlyParams = getVariableString(hourlyVariables, 'hourly');
    const dailyParams = getVariableString(dailyVariables, 'daily');

    const url = `${BASE_URL}?latitude=${selectedLocation.lat}&longitude=${selectedLocation.lon}&start_date=${startDate}&end_date=${endDate}&hourly=${hourlyParams}&daily=${dailyParams}${TEMPERATURE_UNIT}${WIND_SPEED_UNIT}${PRECIPITATION_UNIT}${TIMEZONE}`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};