"use client";
import { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { JustScoutRoutes } from "./types/Routes";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [user, setUser] = useState<null | {
    displayName: string;
    email: string;
  }>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          displayName: firebaseUser.displayName || "User",
          email: firebaseUser.email || "Unknown Email",
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "4rem 0",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ fontWeight: "bold", mb: "1rem" }}>
            The Ultimate FRC Scouting Platform
          </Typography>
          <Typography variant="h6" sx={{ mb: "2rem", color: "#555" }}>
            Streamline your team’s scouting process and make data-driven
            decisions with Just Scout.
          </Typography>
          {user ? (
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#1976d2" }}
            >
              Welcome back, {user.displayName}!
            </Typography>
          ) : (
            <Button
              variant="contained"
              size="large"
              sx={{ backgroundColor: "#1976d2", fontWeight: "bold" }}
              onClick={() => {
                window.location.href = "/login"; // Navigate to login page
              }}
            >
              Login to Get Started
            </Button>
          )}
        </Container>
      </Box>
      <Box
        sx={{
          padding: "4rem 0",
          backgroundColor: "#fff",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: "2rem" }}>
            Features
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: "2rem",
            }}
          >
            {[
              {
                title: "Robot Profiles",
                description:
                  "Explore detailed robot profiles with stats and information from Statbotics and the Blue Alliance.",
                link: JustScoutRoutes.profiles.subpaths.teams.path,
              },
              {
                title: "Custom Profiles (Coming Soon)",
                description:
                  "Share personalized profiles of your robot with other teams effortlessly.",
                link: null,
              },
              {
                title: "Scouting (Coming Soon)",
                description:
                  "Leverage profiles to enhance your scouting experience and strategy.",
                link: null,
              },
            ].map((feature, index) => (
              <Box key={index} sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {feature.title}
                </Typography>
                <Typography sx={{ color: "#555", mt: "0.5rem" }}>
                  {feature.description}
                </Typography>
                {feature.link && (
                  <Button
                    variant="text"
                    sx={{ color: "#1976d2", fontWeight: "bold", mt: "1rem" }}
                    onClick={() => router.push(feature.link)}
                  >
                    Learn More
                  </Button>
                )}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
