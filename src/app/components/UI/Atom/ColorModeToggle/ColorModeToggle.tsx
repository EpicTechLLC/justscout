import { useContext, useEffect, useState } from "react";
import { useColorScheme, useTheme } from "@mui/material/styles";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Button from "@mui/material/Button";
import { ColorModeContext } from "@/app/Context/ColorModeContext";
export default function ColorModeToggle() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button size="small" variant="outlined" onClick={colorMode.toggleColorMode}>
      Theme
      {theme.palette.mode !== "light" ? (
        <LightModeOutlinedIcon sx={{ ml: 1 }} />
      ) : (
        <DarkModeOutlinedIcon sx={{ ml: 1 }} />
      )}
    </Button>
  );
}
