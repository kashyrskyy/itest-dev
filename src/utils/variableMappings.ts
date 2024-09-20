// src/utils/variableMappings.ts

export const hourlyVarMap: { [key: string]: string } = {
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
    "Diffuse Radiation": "diffuse_radiation_instant"
  };
  
  export const dailyVarMap: { [key: string]: string } = {
    "Max Temperature": "temperature_2m_max",
    "Min Temperature": "temperature_2m_min",
    "Mean Temperature": "temperature_2m_mean",
    "Daylight Duration": "daylight_duration",
    "Sunshine Duration": "sunshine_duration",
    "Precipitation Hours": "precipitation_hours",
    "Shortwave Radiation (Sum)": "shortwave_radiation_sum"
  };  