// src/types/weatherTypes.ts
export interface HourlyWeatherData {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    precipitation: number[];
    pressure_msl: number[];
    cloud_cover: number[];
    cloud_cover_low: number[];
    cloud_cover_mid: number[];
    cloud_cover_high: number[];
    et0_fao_evapotranspiration: number[];
    wind_speed_10m: number[];
    wind_direction_10m: number[];
    wind_gusts_10m: number[];
    shortwave_radiation_instant: number[];
    diffuse_radiation_instant: number[];
  }
  
  export interface DailyWeatherData {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    temperature_2m_mean: number[];
    daylight_duration: number[];
    sunshine_duration: number[];
    precipitation_hours: number[];
    shortwave_radiation_sum: number[];
  }
  
  export interface WeatherData {
    hourly: HourlyWeatherData;
    daily: DailyWeatherData;
  }  