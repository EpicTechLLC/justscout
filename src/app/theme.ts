import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9a0007", 
      contrastText: "#ffffff", 
    },
    secondary: {
      main: "#bf360c",
      contrastText: "#ffffff", 
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff", 
    },
    text: {
      primary: "#000000",
      secondary: "#333333", 
    },
  },
});

export default theme;
