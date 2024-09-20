// src/utils/dataFormatting.ts
import { hourlyVarMap, dailyVarMap } from './variableMappings';

// Function to convert HourlyWeatherData to an array of objects for CSV export
export const formatHourlyDataForCSV = (hourlyData: any, selectedVariables: string[]): any[] => {
  if (!hourlyData) return [];
  const { time, ...rest } = hourlyData;
  return time.map((t: string, index: number) => {
    const row: { [key: string]: any } = { time: t };
    selectedVariables.forEach((variable) => {
      const variableKey = hourlyVarMap[variable];
      if (rest[variableKey]) {
        row[variable] = rest[variableKey][index];
      }
    });
    return row;
  });
};

// Function to convert DailyWeatherData to an array of objects for CSV export
export const formatDailyDataForCSV = (dailyData: any, selectedVariables: string[]): any[] => {
  if (!dailyData) return [];
  const { time, ...rest } = dailyData;
  return time.map((t: string, index: number) => {
    const row: { [key: string]: any } = { time: t };
    selectedVariables.forEach((variable) => {
      const variableKey = dailyVarMap[variable];
      if (rest[variableKey]) {
        row[variable] = rest[variableKey][index];
      }
    });
    return row;
  });
};

// Function to format data for Recharts
export const formatDataForChart = (data: any, selectedVariables: string[], variableMap: { [key: string]: string }): any[] => {
    if (!data) return [];
    const { time, ...rest } = data;
    return time.map((t: string, index: number) => {
      const row: { [key: string]: any } = { time: t };
      selectedVariables.forEach((variable) => {
        const variableKey = variableMap[variable];
        if (rest[variableKey]) {
          row[variable] = rest[variableKey][index];
        }
      });
      return row;
    });
  };