"use client";
import { AppUserContext } from "@/app/Context/AppUserContext";
import SignUpTemplate from "@/app/components/UI/Template/SignUpTemplate/SignUpTemplate";
import { AppRoutes } from "@/app/enums/AppRoutes";
import { ITeam } from "@/app/types/ITeam";
import firebaseRequest from "@/app/util/firebaseRequest";
import { User, getAuth } from "firebase/auth";
import ky from "ky";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function SignupPage({}: {}) {
  const { user, triggerUpdate } = useContext(AppUserContext);
  const router = useRouter();
  const [teamNumber, setTeamNumber] = useState("");
  const currentTeamNumber = useRef("");
  const [teamName, setTeamName] = useState("");
  async function getTeamNumber(teamNumber: string) {
    const teamInfo = (await ky
      .get(`/api/team/${teamNumber}`)
      .json()
      .catch(() => {
        return undefined;
      })) as ITeam;
    if (teamInfo && currentTeamNumber.current === teamNumber) {
      setTeamName(teamInfo.nameShort);
    }
  }
  async function signUp() {
    const api = firebaseRequest(user as User);
    const result = await api.get(`/api/signup/${teamNumber}`).catch((e) => {
      return undefined;
    });
    if (result) {
      triggerUpdate();
    }
  }
  useEffect(() => {
    setTeamName("");
    if (teamNumber !== "") {
      currentTeamNumber.current = teamNumber;
      getTeamNumber(teamNumber);
    }
  }, [teamNumber]);

  return (
    <SignUpTemplate
      signOut={() =>
        getAuth()
          .signOut()
          .then(() => router.push(AppRoutes.LOGIN))
          .catch((error: any) => {
            console.error(error);
          })
      }
      submit={signUp}
      setTeamNumber={(e: string) => setTeamNumber(e)}
      teamName={teamName}
    />
  );
}
