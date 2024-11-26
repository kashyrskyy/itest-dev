// src/components/AnonymousLogin.tsx
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { signInAnonymously } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AnonymousLogin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnonymousLogin = async () => {
    setLoading(true);

    try {
      const result = await signInAnonymously(auth);
      const user = result.user;
      console.log("Anonymous User Logged In:", user);

      // Save anonymous user to Firestore
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(
        userDocRef,
        {
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          isAnonymous: true, // Flag for anonymous users
        },
        { merge: true }
      );

      // Redirect anonymous user to the dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during anonymous login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={handleAnonymousLogin}
      disabled={loading}
      sx={{ marginTop: 2 }}
    >
      {loading ? <CircularProgress size={24} /> : "Continue as Guest"}
    </Button>
  );
};

export default AnonymousLogin;