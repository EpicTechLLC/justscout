"use client";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import Loader from "../components/Loader";

export const dynamic = "force-dynamic";

export default function Account() {
  const [user, setUser] = useState<null | {
    displayName: string;
    email: string;
    uid: string;
  }>(null);
  const [teamNumber, setTeamNumber] = useState("");
  const [savedTeamNumber, setSavedTeamNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          displayName: firebaseUser.displayName || "User",
          email: firebaseUser.email || "No email available",
          uid: firebaseUser.uid,
        });
        const docRef = doc(db, `users/${firebaseUser.uid}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fetchedTeamNumber = docSnap.data().teamNumber || "";
          setTeamNumber(fetchedTeamNumber);
          setSavedTeamNumber(fetchedTeamNumber);
        }
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

  const handleSaveTeamNumber = async () => {
    if (!user || !teamNumber) return;

    setLoading(true);
    try {
      await setDoc(
        doc(db, `users/${user.uid}`),
        { teamNumber: parseInt(teamNumber, 10) },
        { merge: true }
      );
      setSavedTeamNumber(teamNumber);
    } catch (error) {
      console.error("Error saving team number:", error);
    } finally {
      setLoading(false);
    }
  };

  return !user ? (
    <Loader />
  ) : (
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
        Welcome, {user.displayName}
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        {user.email}
      </Typography>
      <Box sx={{ mt: 4, width: "100%" }}>
        <TextField
          label="FRC Team Number"
          variant="outlined"
          fullWidth
          value={teamNumber}
          type="number" // Only allow numeric input
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              // Allow only numbers
              setTeamNumber(value);
            }
          }}
          disabled={loading}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSaveTeamNumber}
          disabled={loading || teamNumber === savedTeamNumber || !teamNumber}
        >
          {loading ? "Saving..." : "Save Team Number"}
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="secondary"
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
