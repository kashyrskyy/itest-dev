// src/components/DataSources/DatasetPreviewDialog.tsx

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { parseCSV, parseJSON, DatasetRow } from "../../utils/datasetParsers";
import { parseSheetsFromXLSX, getColumnsFromSheet } from "../../utils/sheetHandler";

interface DatasetPreviewDialogProps {
  open: boolean;
  datasetUrl: string | null;
  onClose: () => void;
}

const DatasetPreviewDialog: React.FC<DatasetPreviewDialogProps> = ({
  open,
  datasetUrl,
  onClose,
}) => {
  const [previewData, setPreviewData] = useState<DatasetRow[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [sheets, setSheets] = useState<Record<string, DatasetRow[]>>({});
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreviewData = async () => {
      if (!datasetUrl) return;

      setLoading(true);
      setPreviewData([]);
      setColumns([]);
      setSheets({});
      setSelectedSheet(null);
      setError(null);

      try {
        const response = await fetch(datasetUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch the dataset.");
        }

        const fileType = response.headers.get("Content-Type");
        let parsedData: DatasetRow[] | Record<string, DatasetRow[]> = {};

        if (fileType === "text/csv") {
          const fileContent = await response.text();
          parsedData = await parseCSV(fileContent);
        } else if (
          fileType ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          const fileBlob = await response.blob();
          parsedData = await parseSheetsFromXLSX(fileBlob);
        } else if (fileType === "application/json") {
          parsedData = await parseJSON(response);
        } else {
          throw new Error("Unsupported file type.");
        }

        if (typeof parsedData === "object" && !Array.isArray(parsedData)) {
          // Handle XLSX with multiple sheets
          const sheetNames = Object.keys(parsedData);
          setSheets(parsedData);
          setSelectedSheet(sheetNames[0]); // Default to the first sheet
          setPreviewData(parsedData[sheetNames[0]]);
          setColumns(getColumnsFromSheet(parsedData[sheetNames[0]]));
        } else if (Array.isArray(parsedData)) {
          // Handle CSV/JSON single-sheet data
          setPreviewData(parsedData);
          setColumns(getColumnsFromSheet(parsedData));
        }
      } catch (err: unknown) {
        console.error("Error fetching or parsing dataset:", err);
        const error = err instanceof Error ? err.message : "An unknown error occurred.";
        setError(error);     
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchPreviewData();
    }
  }, [open, datasetUrl]);

  const handleSheetChange = (event: SelectChangeEvent<string>) => {
    const newSheet = event.target.value;
    if (sheets[newSheet]) {
      setSelectedSheet(newSheet);
      setPreviewData(sheets[newSheet]);
      setColumns(getColumnsFromSheet(sheets[newSheet])); // Using new utility function
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Dataset Preview</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : Object.keys(sheets).length > 0 ? (
          <>
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Sheet</InputLabel>
              <Select value={selectedSheet || ""} onChange={handleSheetChange}>
                {Object.keys(sheets).map((sheetName) => (
                  <MenuItem key={sheetName} value={sheetName}>
                    {sheetName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={previewData.map((row, index) => ({ id: index, ...row }))}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 5, page: 0 },
                  },
                }}
                pageSizeOptions={[5, 10]}
              />
            </div>
          </>
        ) : previewData.length > 0 ? (
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={previewData.map((row, index) => ({ id: index, ...row }))}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5, page: 0 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
        ) : (
          <Typography>No preview available.</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DatasetPreviewDialog;