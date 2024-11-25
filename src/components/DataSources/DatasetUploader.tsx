// src/components/DataSources/DatasetUploader.tsx

import { useState } from "react";
import { storage, db } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { Button, TextField, Box, CircularProgress, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext"; // Import AuthContext
import { useSnackbar } from "notistack"; // Import notistack

interface DatasetUploaderProps {
  onDatasetUpdate: (newDataset: any) => void; // Update to pass only the new dataset
}

const DatasetUploader: React.FC<DatasetUploaderProps> = ({ onDatasetUpdate }) => {
  const { user } = useAuth();

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);

  const { enqueueSnackbar } = useSnackbar(); // Initialize Snackbar

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    
    // Reset the input field's value to allow the same file to be reselected
    e.target.value = "";
    
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
      enqueueSnackbar("File size exceeds 5 MB. Please select a smaller file.", { variant: "warning" });
      return;
    }
    setFile(selectedFile);
    setFileName(selectedFile?.name || "");
  };  

  const handleUpload = async () => {
    if (!file) {
      enqueueSnackbar("Please select a file first.", { variant: "warning" });
      return;
    }

    if (!fileName.trim()) {
      enqueueSnackbar("Please provide a name for the file.", { variant: "warning" });
      return;
    }
  
    if (!user) {
      enqueueSnackbar("You must be logged in to upload files.", { variant: "error" });
      return;
    }
  
    const userId = user.uid;  
    
    // Generate a unique file name using Date.now()
    const uniqueFileName = `${Date.now()}-${fileName}`;
    const storagePath = `datasets/${userId}/${uniqueFileName}`;
    const storageRef = ref(storage, storagePath);
  
    setUploading(true);
  
    try {
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Upload failed:", error);
          enqueueSnackbar("Error uploading file. Please try again.", { variant: "error" });
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(storageRef);
  
          const datasetMetadata = {
            name: fileName,
            uniqueFileName,
            createdAt: Timestamp.now(),
            fileType: file.type,
            userId,
            storagePath,
            downloadURL,
          };
  
          const docRef = await addDoc(collection(db, "datasets"), datasetMetadata);
  
          enqueueSnackbar(`File "${fileName}" uploaded successfully!`, { variant: "success" });
          onDatasetUpdate({ id: docRef.id, ...datasetMetadata }); // Include Firestore document ID
          setFile(null); // Reset file state
          setFileName(""); // Reset filename
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      enqueueSnackbar("Error uploading file. Please try again.", { variant: "error" });
    } finally {
      setUploading(false);
    }
  };  

  return (
    <Box display="flex" flexDirection="column" gap={2} mb={3}>
      <Typography variant="h6">Upload a Dataset</Typography>
      <Box display="flex" alignItems="center" gap={2}>
        <input
          type="file"
          accept=".csv,.xlsx,.json"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="file-upload"
          disabled={uploading} // Disable input while uploading
        />
        <label htmlFor="file-upload">
          <Button variant="contained" component="span">
            Select File
          </Button>
        </label>
        {file && (
          <TextField
            label="File Name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            size="small"
          />
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
      </Box>
    </Box>
  );
};

export default DatasetUploader;