"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MUILink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useAuthState } from "react-firebase-hooks/auth";
import { User, getAuth } from "firebase/auth";
import { AppRoutes } from "../enums/AppRoutes";
import Link from "next/link";
import { ExploreOutlined } from "@mui/icons-material";
import AccountMenu from "./UI/Organism/AccountMenu/AccountMenu";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user] = useAuthState(getAuth());
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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
            }}
            p={2}
          >
            Teams
          </MUILink>
          <MUILink
            component={Link}
            href={AppRoutes.SCOUTING}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
            p={2}
          >
            Scouting
          </MUILink>
          <AccountMenu
            user={user as User}
            navigate={(route) => router.push(route)}
            signOut={() =>
              getAuth()
                .signOut()
                .then(() => router.push(AppRoutes.LOGIN))
                .catch((error) => {
                  console.error(error);
                })
            }
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
