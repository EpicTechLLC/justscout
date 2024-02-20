import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { Fragment, PropsWithChildren, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Divider, Grid } from "@mui/material";
import { usePathname } from "next/navigation";
import { ISetting } from "@/app/types/ISettings";
import ColorModeToggle from "../../Atom/ColorModeToggle/ColorModeToggle";

export interface SideBarProps extends PropsWithChildren {
  Settings: ISetting[];
}

export default function SideBar({ Settings, children }: SideBarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Grid
      container
      spacing={4}
      m={1}
      justifyContent="center"
      alignContent="center"
    >
      <Grid item xs={12} sm={12} md={2}>
        <Grid item sm={12}>
          <Typography
            variant={"h4"}
            fontWeight="bold"
            onClick={() => setIsOpen(!isOpen)}
          >
            Settings
            {isOpen ? (
              <ExpandLessIcon
                fontSize="large"
                sx={{ mb: -1, display: { md: "none" } }}
              />
            ) : (
              <ExpandMoreIcon
                fontSize="large"
                sx={{ mb: -1, display: { md: "none" } }}
              />
            )}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={3}
          display={{
            sm: isOpen ? "flex" : "none",
            xs: isOpen ? "flex" : "none",
            md: "flex",
          }}
        >
          <List>
            {Settings.map((setting, index) => {
              const selected = setting.path === pathname;
              return (
                <Fragment key={index}>
                  <ListItem key={index}>
                    <ListItemButton
                      selected={selected}
                      component="a"
                      href={setting.path}
                    >
                      <Typography variant="h5">{setting.title}</Typography>
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="middle" />
                </Fragment>
              );
            })}
            <ListItem>
              <ListItemButton disableGutters={true}>
                <ColorModeToggle />
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid item sm={12} md={10}>
        {children}
      </Grid>
    </Grid>
  );
}
