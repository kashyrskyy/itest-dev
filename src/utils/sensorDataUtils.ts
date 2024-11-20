import * as XLSX from 'xlsx';

// Helper function to convert Excel numeric date with time to ISO DateTime
const convertExcelDate = (excelDate: number): string => {
  const jsDate = new Date((excelDate - 25569) * 86400 * 1000); // Excel epoch + offset
  return jsDate.toISOString(); // Format as "yyyy-MM-ddTHH:mm:ss.sssZ"
};
export const parseSensorData = async (): Promise<any[]> => {
  const { read, utils } = await import('xlsx'); // Dynamically import xlsx
  const response = await fetch(`${import.meta.env.BASE_URL}data/sensorData_sample.xlsx`);
  if (!response.ok) {
    throw new Error(`Failed to fetch sensor data file`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const workbook = read(arrayBuffer, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  return utils.sheet_to_json(sheet);
};

export const filterSensorData = (data: any[], startDate: string, endDate: string, variables: string[]) => {
  console.log("Input Data:", data);
  console.log("Start Date:", startDate);
  console.log("End Date:", endDate);
  console.log("Selected Variables:", variables);

  const filteredData = data.filter((row) => {
    const rowDate = new Date(row.Date);
    const isWithinRange = rowDate >= new Date(startDate) && rowDate <= new Date(endDate);
    if (!isWithinRange) console.log("Row Excluded (Date):", row);
    return isWithinRange;
  }).map((row) => {
    const filteredRow: any = { Date: row.Date }; // Keep full timestamp
    variables.forEach((variable) => {
      if (row[variable] === undefined) {
        console.warn(`Variable "${variable}" not found in row:`, row);
      }
      filteredRow[variable] = row[variable];
    });
    return filteredRow;
  });

  console.log("Filtered Data:", filteredData);
  return filteredData;
};