"use client";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AppRoutes } from "../../enums/AppRoutes";
import { useRouter } from "next/navigation";
import { AppUserContext } from "@/app/Context/AppUserContext";
import ky from "ky";

export default function Feedback() {
  const { userInfo, loadingUser } = useContext(AppUserContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (!loadingUser && userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.displayName);
    }
  }, [loadingUser, userInfo]);
  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };
  const handleSubmit = async () => {
    await ky
      .post("/api/feedback", {
        json: {
          name,
          category,
          email,
          feedback: feedbackText,
        },
      })
      .then(() => router.push(AppRoutes.FEEDBACKTHANKYOU));
  };
  return (
    <Box>
      <Box m={3}>
        <Typography>
          Have a suggestion on a feature? Found a bug? or just want to give
          feedback? Fill out the form bellow and we will look into it.
        </Typography>
      </Box>
      <Box m={3}>
        <TextField
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          fullWidth
        />
      </Box>
      <Box m={3}>
        <TextField
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
        />
      </Box>
      <Box m={3}>
        <TextField
          select
          value={category}
          label="Category"
          placeholder="Category"
          onChange={handleCategoryChange}
          fullWidth
        >
          <MenuItem value={"Feedback"}>Feedback</MenuItem>
          <MenuItem value={"Feature"}>Feature</MenuItem>
          <MenuItem value={"Bug"}>Bug</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </TextField>
      </Box>
      <Box m={3}>
        <TextField
          sx={{ minWidth: "14rem" }}
          label={`Enter ${category ? category : "Feedback"} Details`}
          multiline
          minRows={2}
          fullWidth
          onChange={(event) => setFeedbackText(event.target.value)}
        />
      </Box>
      <Box m={3}>
        <Button
          variant="contained"
          disabled={
            name !== "" && email !== "" && feedbackText !== "" ? false : true
          }
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
