"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { AppRoutes } from "../enums/AppRoutes";

export default function Header() {
  const [user] = useAuthState(getAuth());

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            component={Link}
            href={AppRoutes.HOME}
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            Just Scout
          </Typography>
          <Link
            href={AppRoutes.TEAMS}
            style={{
              textDecoration: "none",
              color: "inherit",
              paddingRight: "2rem",
            }}
          >
            Teams
          </Link>
          {user === null || user === undefined ? (
            <Link
              href={AppRoutes.LOGIN}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              Login
            </Link>
          ) : (
            <Link
              href={AppRoutes.ACCOUNT}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              Account
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
