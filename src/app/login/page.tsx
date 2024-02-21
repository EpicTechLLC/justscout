"use client";
import { GoogleLoginButton } from "react-social-login-buttons";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { redirect } from "next/navigation";
import { AppRoutes } from "../enums/AppRoutes";
import Grid from "@mui/material/Grid";
import { Box, CircularProgress } from "@mui/material";

export default function Login() {
  const provider = new GoogleAuthProvider();
  const [user, loadingAuth] = useAuthState(getAuth());
  if (user && user !== null) {
    redirect(AppRoutes.ACCOUNT);
  }
  return loadingAuth ? (
    <Box textAlign="center">
      <CircularProgress />
    </Box>
  ) : (
    <Grid container>
      <GoogleLoginButton
        align="center"
        text="Google"
        onClick={() =>
          signInWithPopup(getAuth(), provider).then((result) => {
            redirect(AppRoutes.ACCOUNT);
            // if (result) {
            //   const credential =
            //     GoogleAuthProvider.credentialFromResult(result);
            //   const token = credential?.accessToken;
            //   if (token) {
            //     redirect(AppRoutes.ACCOUNT);
            //   }
            // }
          })
        }
      />
    </Grid>
  );
}
