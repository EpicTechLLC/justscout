import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { Fragment, PropsWithChildren, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Divider } from "@mui/material";
// import ModeToggle from "../../Layout/ModeToggle";
import { usePathname } from "next/navigation";
import { ISetting } from "@/app/types/ISettings";

export interface SideBarProps extends PropsWithChildren {
  Settings: ISetting[];
}

export default function SideBar({ Settings, children }: SideBarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Grid container spacing={8} justifyContent="center" m={1}>
      <Grid
        spacing={1}
        lg={2}
        xs={12}
        justifyContent="center"
        textAlign="center"
        alignContent="center"
      >
        <Grid xs={12}>
          <Typography
            variant={"h4"}
            fontWeight="bold"
            onClick={() => setIsOpen(!isOpen)}
          >
            Settings
            {isOpen ? (
              <ExpandLessIcon
                fontSize="large"
                sx={{ mb: -1, display: { lg: "none" } }}
              />
            ) : (
              <ExpandMoreIcon
                fontSize="large"
                sx={{ mb: -1, display: { lg: "none" } }}
              />
            )}
          </Typography>
        </Grid>
        <Grid
          xs={12}
          display={{ xs: isOpen ? null : "none", lg: "flex" }}
          textAlign="center"
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
            {/* <ListItem>
              <ListItemButton>
                <ModeToggle />
              </ListItemButton>
            </ListItem> */}
          </List>
        </Grid>
      </Grid>
      <Grid lg={10} md={10}>
        {children}
      </Grid>
    </Grid>
  );
}
