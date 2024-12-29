"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Loader from "../components/Loader";

export default function Account() {
  const [user, setUser] = useState<null | {
    displayName: string;
    email: string;
    photoURL: string;
  }>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          displayName: firebaseUser.displayName || "User",
          email: firebaseUser.email || "No email available",
          photoURL: firebaseUser.photoURL || "/default-avatar.jpg",
        });
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" gutterBottom>
        {user.displayName}
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        {user.email}
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogout}
          sx={{
            fontSize: "1rem",
            padding: "10px 20px",
            textTransform: "none",
          }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
}
