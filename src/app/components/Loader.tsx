import { Box, CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <Box display="flex" justifyContent="center" width="auto">
      <CircularProgress size={75} />
    </Box>
  );
}
