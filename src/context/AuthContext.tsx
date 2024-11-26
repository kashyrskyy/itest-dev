// src/context/AuthContext.tsx
import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signInAnonymously, User } from "firebase/auth";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  signInAnonymously: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth State Changed:", currentUser); // Debugging
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInAnonymouslyHandler = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Error during anonymous sign-in:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInAnonymously: signInAnonymouslyHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};