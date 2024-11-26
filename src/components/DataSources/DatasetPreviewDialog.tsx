// src/components/DataSources/DatasetPreviewDialog.tsx

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { parseCSV, parseXLSX, parseJSON, DatasetRow } from "../../utils/datasetParsers";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreviewData = async () => {
      if (!datasetUrl) return;

      setLoading(true);
      setPreviewData([]);
      setColumns([]);
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(datasetUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch the dataset.");
        }
      
        const fileType = response.headers.get("Content-Type");
        let parsedData: DatasetRow[] = [];
      
        if (fileType === "text/csv") {
          const fileContent = await response.text();
          parsedData = await parseCSV(fileContent);
        } else if (
          fileType ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          const fileBlob = await response.blob();
          parsedData = await parseXLSX(fileBlob);
        } else if (fileType === "application/json") {
          parsedData = await parseJSON(response);
        } else {
          throw new Error("Unsupported file type.");
        }
      
        if (parsedData.length === 0) {
          throw new Error("The dataset contains no rows to preview.");
        }
      
        setColumns(
          Object.keys(parsedData[0]).map((col) => ({
            field: col,
            headerName: col,
            width: 150,
          }))
        );
        setPreviewData(parsedData);
      } catch (err: any) {
        console.error("Error fetching or parsing dataset:", err);
        setError(err.message || "An unknown error occurred.");
      } finally {
        setLoading(false);
      }      
    };

    if (open) {
      fetchPreviewData();
    }
  }, [open, datasetUrl]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Dataset Preview</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
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