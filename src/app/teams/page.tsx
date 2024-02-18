"use client";
import ky from "ky";
import { useEffect, useState } from "react";
import { ITeam } from "../types/ITeam";
import TeamsTable from "../components/team/TeamsTable";
import { Box, CircularProgress } from "@mui/material";
import firebaseRequest from "../util/firebaseRequest";
import { User, getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { IUserInfo } from "../types/IUserInfo";

export default function Teams() {
  const [user, loadingAuth] = useAuthState(getAuth());
  const [teamsList, setTeamsList] = useState<ITeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [userTeamNumber, setUserTeamNumber] = useState("");

  async function getUserInfo() {
    const api = firebaseRequest(user as User);
    let result = (await api
      ?.get("/api/settings/account-info")
      .json()) as IUserInfo;
    if (result) {
      setUserTeamNumber(result.teamNumber);
    }
  }

  const getData = async () => {
    setTeamsList([]);
    setLoading(true);
    const data = (await ky
      .get(`/api/teams`, { timeout: false, cache: "force-cache" })
      .json()) as ITeam[];

    setTeamsList(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (!loadingAuth && user) {
      getUserInfo();
    }
  }, [loadingAuth]);

  return loading ? (
    <Box textAlign="center">
      <CircularProgress />
      <br />
      Getting Teams...
    </Box>
  ) : (
    <TeamsTable teamsList={teamsList} userTeam={userTeamNumber} />
  );
}
