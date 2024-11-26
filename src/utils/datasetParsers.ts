import * as Papa from "papaparse";
import * as XLSX from "xlsx";

export interface DatasetRow {
  [key: string]: string | number | null;
}

/**
 * Parse CSV files into rows of data.
 */
export const parseCSV = async (fileContent: string): Promise<DatasetRow[]> => {
  const parsed = Papa.parse<DatasetRow>(fileContent, {
    header: true,
    skipEmptyLines: true,
  });
  return parsed.data.slice(0, 10); // Limit preview to the first 10 rows
};

/**
 * Parse XLSX files into rows of data.
 */
export const parseXLSX = async (fileBlob: Blob): Promise<DatasetRow[]> => {
  const arrayBuffer = await fileBlob.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const sheetName = workbook.SheetNames[0]; // Get the first sheet
  const sheet = workbook.Sheets[sheetName];
  const parsedData = XLSX.utils.sheet_to_json(sheet) as DatasetRow[]; // Explicitly cast the type
  return parsedData.slice(0, 10); // Limit preview to the first 10 rows
};

/**
 * Parse JSON files into rows of data.
 */
 export const parseJSON = async (response: Response): Promise<DatasetRow[]> => {
    const jsonData = await response.json();
  
    if (Array.isArray(jsonData)) {
      // Ensure all rows have consistent keys
      const keys = Object.keys(jsonData[0] || {});
      const validData = jsonData.filter(
        (row) => row && typeof row === "object" && keys.every((key) => key in row)
      ) as DatasetRow[];
      return validData.slice(0, 10); // Limit to 10 rows
    } else if (typeof jsonData === "object" && jsonData !== null) {
      return [jsonData as DatasetRow]; // Wrap single object into an array
    } else {
      throw new Error("Invalid JSON format: Expected an array or object.");
    }
  };  