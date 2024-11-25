// src/hooks/useDatasetDeletion.ts

import { useSnackbar } from "notistack";
import { deleteObject, ref } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";
import { storage, db } from "../firebaseConfig";

export const useDatasetDeletion = () => {
  const { enqueueSnackbar } = useSnackbar();

  const deleteDataset = async (
    dataset: { id: string; name: string; storagePath: string },
    onDatasetUpdate: (callback: (prevDatasets: any[]) => any[]) => void
  ) => {
    if (!dataset || !dataset.id) {
      enqueueSnackbar("Invalid dataset selected for deletion.", { variant: "error" });
      return;
    }

    try {
      enqueueSnackbar(`Deleting dataset: ${dataset.name}`, { variant: "info" });

      console.log("Attempting to delete file at:", dataset.storagePath);

      const storageRef = ref(storage, dataset.storagePath);
      await deleteObject(storageRef);

      console.log("File deleted successfully from storage:", dataset.storagePath);
      enqueueSnackbar(`File deleted: ${dataset.name}`, { variant: "success" });

      const docRef = doc(db, "datasets", dataset.id);
      await deleteDoc(docRef);

      console.log("Metadata deleted successfully from Firestore:", dataset.id);
      enqueueSnackbar(`Metadata removed for dataset: ${dataset.name}`, { variant: "success" });

      onDatasetUpdate((prevDatasets) =>
        prevDatasets.filter((d) => d.id !== dataset.id)
      );
    } catch (err) {
      console.error("Error deleting dataset:", err);
      enqueueSnackbar("Error deleting dataset. Please try again.", { variant: "error" });
    }
  };

  return { deleteDataset };
};