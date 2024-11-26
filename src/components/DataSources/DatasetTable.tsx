// src/components/DataSources/DatasetTable.tsx

import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useSnackbar } from "notistack";
import { useDatasetDeletion } from "../../hooks/useDatasetDeletion"; // Import the hook

import DatasetPreviewDialog from "./DatasetPreviewDialog"; // Import the preview dialog

export interface Dataset {
  id: string;
  name: string;
  fileType: string;
  createdAt?: Timestamp;
  storagePath: string;
  downloadURL: string;
  userId: string;
}

interface DatasetTableProps {
  datasets: Dataset[];
  onDatasetUpdate: React.Dispatch<React.SetStateAction<Dataset[]>>;
}

const DatasetTable: React.FC<DatasetTableProps> = ({ datasets, onDatasetUpdate }) => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { deleteDataset } = useDatasetDeletion(); // Use the deletion hook
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handlePreview = (datasetUrl: string) => {
    setPreviewUrl(datasetUrl);
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setPreviewUrl(null);
  };

  useEffect(() => {
    const fetchDatasets = async () => {
      if (!user || !user.uid) {
        enqueueSnackbar("You need to be logged in to fetch datasets.", { variant: "error" });
        return;
      }

      try {
        const q = query(
          collection(db, "datasets"),
          where("userId", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);

        const fetchedDatasets: Dataset[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Dataset, "id">),
        }));

        onDatasetUpdate((prevDatasets) => [
          ...prevDatasets,
          ...fetchedDatasets.filter(
            (newDataset) => !prevDatasets.some((d) => d.id === newDataset.id)
          ),
        ]);
      } catch (err) {
        console.error("Error fetching datasets:", err);
        enqueueSnackbar("Failed to fetch datasets.", { variant: "error" });
      }
    };

    fetchDatasets();
  }, [user, onDatasetUpdate]);

  const openDialog = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedDataset(null);
    setDialogOpen(false);
  };

  const confirmDelete = () => {
    if (selectedDataset) {
      deleteDataset(selectedDataset, onDatasetUpdate);
    }
    closeDialog();
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datasets.map((dataset) => (
              <TableRow key={dataset.id}>
                <TableCell>{dataset.name}</TableCell>
                <TableCell>{dataset.fileType}</TableCell>
                <TableCell>
                  {dataset.createdAt?.toDate().toLocaleString() || "N/A"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handlePreview(dataset.downloadURL)}
                  >
                    Preview
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => openDialog(dataset)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dataset Preview Dialog */}
      <DatasetPreviewDialog
        open={previewOpen}
        datasetUrl={previewUrl}
        onClose={closePreview}
      />

      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{selectedDataset?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DatasetTable;