// src/utils/statistics.ts
export const calculateMin = (data: number[]): number => {
    return Math.min(...data);
  };
  
  export const calculateMax = (data: number[]): number => {
    return Math.max(...data);
  };
  
  export const calculateMean = (data: number[]): number => {
    const sum = data.reduce((acc, val) => acc + val, 0);
    return sum / data.length;
  };
  
  export const calculateConfidenceInterval = (data: number[],  _confidence: number = 0.95): [number, number] => {
    const mean = calculateMean(data);
    const standardDeviation = Math.sqrt(
      data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length
    );
    const marginOfError = 1.96 * (standardDeviation / Math.sqrt(data.length)); // 1.96 corresponds to 95% confidence
    return [mean - marginOfError, mean + marginOfError];
  };
  
  export const calculateMedian = (data: number[]): number => {
    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  };
  
  export const calculateStandardDeviation = (data: number[]): number => {
    const mean = calculateMean(data);
    const squaredDiffs = data.map(value => Math.pow(value - mean, 2));
    return Math.sqrt(calculateMean(squaredDiffs));
  };
  
  export const calculateVariance = (data: number[]): number => {
    const mean = calculateMean(data);
    const squaredDiffs = data.map(value => Math.pow(value - mean, 2));
    return calculateMean(squaredDiffs);
  };
  
  export const calculatePercentile = (data: number[], percentile: number): number => {
    const sorted = [...data].sort((a, b) => a - b);
    const index = Math.floor(percentile * sorted.length);
    return sorted[index];
  };
  
  export const calculateIQR = (data: number[]): number => {
    const q1 = calculatePercentile(data, 0.25);
    const q3 = calculatePercentile(data, 0.75);
    return q3 - q1;
  };
  
  export const calculateMode = (data: number[]): number[] => {
    const frequencyMap: { [key: number]: number } = {};
    data.forEach((value) => {
      frequencyMap[value] = (frequencyMap[value] || 0) + 1;
    });
    const maxFrequency = Math.max(...Object.values(frequencyMap));
    return Object.keys(frequencyMap)
      .filter(key => frequencyMap[Number(key)] === maxFrequency)
      .map(Number);
  };