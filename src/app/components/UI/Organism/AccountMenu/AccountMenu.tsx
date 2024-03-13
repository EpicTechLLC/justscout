import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { User } from "firebase/auth";
import { Fragment, useRef, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppRoutes } from "@/app/enums/AppRoutes";

export interface AccountMenuProps {
  user: User;
  navigate: (route: AppRoutes) => void;
  signOut: () => void;
}

export default function AccountMenu({
  user,
  navigate,
  signOut,
}: AccountMenuProps) {
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setTimeout(() => setIsOpen(false), 100);
  };

  const handleProfileClick = () => {
    handleClose();
    navigate(AppRoutes.ACCOUNT);
  };
  const handleSignOut = () => {
    handleClose();
    signOut();
  };
  const handleFeedBackClick = () => {
    handleClose();
    navigate(AppRoutes.FEEDBACK);
  };
  return (
    <Fragment>
      <IconButton
        ref={buttonRef}
        aria-label={user ? "button-account-Menu" : "login"}
        sx={{ color: "white" }}
        onClick={() => (user ? setIsOpen(true) : navigate(AppRoutes.LOGIN))}
      >
        <AccountCircleIcon fontSize="large" />
        <Menu
          id="account-menu"
          anchorEl={buttonRef.current}
          open={isOpen}
          onClose={handleClose}
          aria-label="account-Menu"
        >
          <MenuItem onClick={handleProfileClick}>Account</MenuItem>
          <MenuItem onClick={handleFeedBackClick}>Feedback</MenuItem>
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>
      </IconButton>
    </Fragment>
  );
}
