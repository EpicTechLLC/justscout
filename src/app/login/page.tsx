"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "../firebaseConfig";

export default function Login() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/account");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

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
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Just Scout
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Sign in with Google to continue
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoogleLogin}
        sx={{
          fontSize: "1rem",
          padding: "10px 20px",
          textTransform: "none",
        }}
      >
        Sign in with Google
      </Button>
    </Container>
  );
}
