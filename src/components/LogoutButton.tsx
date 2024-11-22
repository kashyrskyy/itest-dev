// src/components/LogoutButton.tsx
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Logs the user out
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Button
      color="inherit"
      onClick={handleLogout}
      sx={{
        marginLeft: "10px",
        textDecoration: "none",
        fontWeight: "normal",
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;