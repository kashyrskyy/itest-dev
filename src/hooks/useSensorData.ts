import { useState, useEffect } from 'react';
import { parseSensorData } from '../utils/sensorDataUtils';

export const useSensorData = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state
        const result = await parseSensorData(); // Fetch and parse sensor data
        setData(result);
      } catch (err) {
        setError('Error loading sensor data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};