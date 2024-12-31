import { Menu as MenuIcon } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { JustScoutRoutes } from "../types/Routes";
import { auth } from "../firebaseConfig";
import { TeamInfoSimpleType } from "../types/TeamInfoSimpleType ";

const drawerWidth = 240;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountMenuAnchor, setAccountMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [user, setUser] = useState<null | {
    displayName: string;
    photoURL: string;
  }>(null);
  const [searchResults, setSearchResults] = useState<TeamInfoSimpleType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          displayName: firebaseUser.displayName || "User",
          photoURL: firebaseUser.photoURL || "",
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
  };

  const handleNavigateToAccount = () => {
    router.push("/account");
    handleAccountMenuClose();
  };

  const handleLogin = () => {
    router.push("/login");
    handleAccountMenuClose();
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
    handleAccountMenuClose();
  };

  const handleSearch = async (query: string) => {
    if (query.trim().length > 0) {
      try {
        const response = await fetch(`/api/search-team?query=${query}`);
        if (response.ok) {
          const result = await response.json();
          if (result && typeof result === "object" && !Array.isArray(result)) {
            setSearchResults([result]);
          } else {
            console.error("Unexpected API result format:", result);
            setSearchResults([]);
          }
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error searching teams:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{ my: 2, cursor: "pointer" }}
        onClick={() => router.push("/")}
      >
        Just Scout
      </Typography>
      <Divider />
      <List>
        {Object.values(JustScoutRoutes).map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => router.push(`${item.path}`)}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {user ? (
          [
            <ListItem disablePadding key="account">
              <ListItemButton onClick={handleNavigateToAccount}>
                <ListItemText primary="My Account" />
              </ListItemButton>
            </ListItem>,
            <ListItem disablePadding key="logout">
              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>,
          ]
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogin}>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: "block" }}
          >
            Just Scout
          </Typography>
          <Box sx={{ flexGrow: 1, maxWidth: "300px", mx: 2 }}>
            <Autocomplete
              size="small"
              options={searchResults}
              getOptionLabel={(option: TeamInfoSimpleType) =>
                `${option.team_number} - ${option.nickname}`
              }
              onInputChange={(_, value) => handleSearch(value)}
              onChange={(_, value) => {
                if (value) {
                  router.push(
                    `${JustScoutRoutes.profiles.subpaths.team.path}/${value.team_number}`
                  );
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Teams..."
                  variant="filled"
                  sx={{
                    backgroundColor: "white",
                  }}
                />
              )}
              noOptionsText="No teams found"
            />
          </Box>
          <Box
            sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
          >
            {Object.values(JustScoutRoutes).map((item) => (
              <Button
                key={item.name}
                sx={{ color: "#fff" }}
                onClick={() => router.push(`${item.path}`)}
              >
                {item.name}
              </Button>
            ))}
            <IconButton onClick={handleAccountMenuOpen} sx={{ ml: 2 }}>
              <AccountCircleIcon sx={{ color: "#fff" }} />
            </IconButton>
            <Menu
              anchorEl={accountMenuAnchor}
              open={Boolean(accountMenuAnchor)}
              onClose={handleAccountMenuClose}
            >
              {user ? (
                [
                  <MenuItem key="account" onClick={handleNavigateToAccount}>
                    My Account
                  </MenuItem>,
                  <MenuItem key="logout" onClick={handleLogout}>
                    Logout
                  </MenuItem>,
                ]
              ) : (
                <MenuItem key="login" onClick={handleLogin}>
                  Login
                </MenuItem>
              )}
            </Menu>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 1 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
