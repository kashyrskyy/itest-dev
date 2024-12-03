// src/components/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { Button, Box, Typography, CircularProgress, Alert } from "@mui/material";
import AnonymousLogin from "./AnonymousLogin";
import KeepSignedInCheckbox from "./KeepSignedInCheckbox";

const LoginPage: React.FC = () => {
  const navigate = useNavigate(); // For navigation after login
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keepSignedIn, setKeepSignedIn] = useState(false); // State for checkbox

  const saveUserToFirestore = async () => {
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        // New user: Record account creation time
        await setDoc(userDocRef, {
          createdAt: serverTimestamp(), // Firestore timestamp for account creation
          lastLogin: serverTimestamp(), // Firestore timestamp for last login
          isAnonymous: user.isAnonymous || false, // Distinguish user type
        });
        console.log("New user added to Firestore.");
      } else {
        // Existing user: Update only the last login time
        await setDoc(
          userDocRef,
          { lastLogin: serverTimestamp() },
          { merge: true }
        );
        console.log("User login time updated in Firestore.");
      }
    }
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setError(null);

    try {
      const persistence = keepSignedIn ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistence);

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", {
        name: user.displayName,
        email: user.email,
      });

      // Save user to Firestore after successful login
      await saveUserToFirestore();

      // Redirect to the dashboard after successful login
      navigate("/dashboard");
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#F8F6F4"
    >
      <Typography variant="h4" gutterBottom>
        Welcome to iTest Dashboard - Dev Mode
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        disabled={loading}
        sx={{ marginTop: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Sign in with Google"}
      </Button>
      <AnonymousLogin keepSignedIn={keepSignedIn} />
      <KeepSignedInCheckbox
        keepSignedIn={keepSignedIn}
        onChange={(checked) => setKeepSignedIn(checked)}
      />
    </Box>
  );
};

export default LoginPage;