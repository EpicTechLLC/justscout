"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MUILink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { AppRoutes } from "../enums/AppRoutes";
import Link from "next/link";
import { ExploreOutlined } from "@mui/icons-material";

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
            Just Scout <ExploreOutlined fontSize="inherit" />
          </Typography>
          <MUILink
            component={Link}
            href={AppRoutes.TEAMS}
            style={{
              textDecoration: "none",
              color: "inherit",
              paddingRight: "2rem",
            }}
          >
            Teams
          </MUILink>
          {user === null || user === undefined ? (
            <MUILink
              component={Link}
              href={AppRoutes.LOGIN}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              Login
            </MUILink>
          ) : (
            <MUILink
              component={Link}
              href={AppRoutes.ACCOUNT}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              Account
            </MUILink>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
