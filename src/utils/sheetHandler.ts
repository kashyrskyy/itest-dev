import * as XLSX from "xlsx";
import { DatasetRow } from "./datasetParsers";

/**
 * Parse XLSX files into a record of sheet names and their respective rows.
 * @param fileBlob - The XLSX file as a Blob.
 * @returns A record where keys are sheet names and values are rows of data.
 */
export const parseSheetsFromXLSX = async (
  fileBlob: Blob
): Promise<Record<string, DatasetRow[]>> => {
  const arrayBuffer = await fileBlob.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });

  const sheetsData: Record<string, DatasetRow[]> = {};
  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const parsedData = XLSX.utils.sheet_to_json(sheet) as DatasetRow[];
    sheetsData[sheetName] = parsedData.slice(0, 10); // Limit preview to the first 10 rows per sheet
  });

  if (Object.keys(sheetsData).length === 0) {
    throw new Error("No sheets found in the XLSX file.");
  }

  return sheetsData;
};

/**
 * Get column definitions for a given dataset.
 * @param data - The dataset to extract column definitions from.
 * @returns An array of column definitions for the DataGrid.
 */
export const getColumnsFromSheet = (data: DatasetRow[]): { field: string; headerName: string; width: number }[] => {
  return Object.keys(data[0] || {}).map((col) => ({
    field: col,
    headerName: col,
    width: 150,
  }));
};