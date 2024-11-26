// src/components/MyAccount.tsx

import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const MyAccount: React.FC = () => {
  const [userData, setUserData] = useState<{
    createdAt: string | null;
    lastLogin: string | null;
    uid: string;
    isAnonymous?: boolean; // Added to track if the user is anonymous
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        const user = auth.currentUser;

        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userDocRef);

          if (userSnapshot.exists()) {
            const data = userSnapshot.data();

            setUserData({
              createdAt: data.createdAt?.toDate().toLocaleString() || null,
              lastLogin: data.lastLogin?.toDate().toLocaleString() || null,
              uid: user.uid,
              isAnonymous: user.isAnonymous, // Capture anonymous status
            });
          } else {
            setError(
                "Unable to retrieve account details. Please ensure you are logged in and try refreshing the page."
            );
          }
        } else {
          setError("No authenticated user found.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start" // Align items to the top
      minHeight="100vh"
      bgcolor="#F8F6F4"
      p={3}
    >
      <Card sx={{ width: 400, padding: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          {
            <Avatar sx={{ width: 80, height: 80, marginBottom: 2 }}>
              <AccountCircleIcon sx={{ fontSize: 80 }} />
            </Avatar>
          }
          <Typography variant="h5" gutterBottom>
            {userData?.isAnonymous ? "Anonymous User" : "User"}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {"Account Details"}
          </Typography>
        </Box>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                <strong>Firestore ID:</strong>
              </Typography>
              <Typography variant="body1">{userData?.uid}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                <strong>Account Created At:</strong>
              </Typography>
              <Typography variant="body1">{userData?.createdAt || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                <strong>Last Login:</strong>
              </Typography>
              <Typography variant="body1">{userData?.lastLogin || "N/A"}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyAccount;