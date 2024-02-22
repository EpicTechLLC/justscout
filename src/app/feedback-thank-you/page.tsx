import { Box, Link, Typography } from "@mui/material";
import { AppRoutes } from "../enums/AppRoutes";

export default function FeedBackThankYou() {
  return (
    <Box m={2}>
      <Typography>Thank you for your feedback.</Typography>
      <Link href={AppRoutes.HOME}>Go to home page</Link>
    </Box>
  );
}
