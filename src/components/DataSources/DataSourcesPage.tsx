// src/components/DataSources/DataSourcesPage.tsx

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import DatasetUploader from "./DatasetUploader";
import DatasetTable, { Dataset } from "./DatasetTable";

const DataSourcesPage: React.FC = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);

  const handleDatasetUpdate = (newDataset: Dataset | Dataset[]) => {
    // Update the datasets state with new datasets while avoiding duplicates based on `id`.
    // If `newDataset` is an array, add only those datasets not already in the state.
    // If `newDataset` is a single object, add it and ensure no duplicates by filtering for unique `id`.
    setDatasets((prev) =>
      Array.isArray(newDataset)
        ? [...prev, ...newDataset.filter((d) => !prev.some((p) => p.id === d.id))]
        : [...prev, newDataset].filter((d, index, self) =>
            index === self.findIndex((t) => t.id === d.id)
          )
    );
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Data Sources
      </Typography>
      <DatasetUploader onDatasetUpdate={(newDataset) => handleDatasetUpdate(newDataset)} />
      <DatasetTable datasets={datasets} onDatasetUpdate={setDatasets} />
    </Box>
  );
};

export default DataSourcesPage;