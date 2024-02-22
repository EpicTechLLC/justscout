"use client";
import { ExploreOutlined } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import EventInfoDisplayTemplate from "./components/UI/Template/EventInfoDisplayTemplate/EventInfoDisplayTemplate";
import { useState } from "react";
import ShareEventTemplate from "./components/UI/Template/ShareEventTemplate/ShareEventTemplate";
import uniqueID from "./util/uniqueID";

export default function Home() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const columns = [
    { id: uniqueID(), label: "Robot Name", value: "Bob" },
    { id: uniqueID(), label: "Drive Train", value: "Swerve" },
    { id: uniqueID(), label: "Climb", value: "Yes" },
    { id: uniqueID(), label: "Shoot", value: "Yes" },
    { id: uniqueID(), label: "Auto", value: "Yes, left side" },
  ];
  return (
    <Grid container spacing={6} textAlign="center" justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h2">
          Just Scout <ExploreOutlined fontSize="inherit" sx={{ pt: 2 }} />
        </Typography>
        <Typography>
          A simple way to share scouting information for FRC Teams
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          Share your robots capabilities at an event with scouters using a link
          or QR code
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <EventInfoDisplayTemplate
          navigateToEdit={() => {}}
          handleDeleteClick={() => {}}
          openShareModalOpen={() => setIsShareModalOpen(true)}
          isCreator={false}
          name={`Event Name (${new Date().getFullYear()})`}
          columns={columns}
          createdBy={""}
          modifiedBy={""}
          modifiedByName={"FRC Team Member"}
          timeStamp={0}
          modified={Date.now() - 60000}
        />
        <ShareEventTemplate
          open={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          eventName={"First Event"}
          urlToCopy={origin}
          columns={columns}
        />
      </Grid>
    </Grid>
  );
}
