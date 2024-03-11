"use client";
import { AppUserContext } from "@/app/Context/AppUserContext";
import AccountInformationTemplate from "@/app/components/UI/Template/AccountInformationTemplate/AccountInformationTemplate";
import TeamDashboardTemplate from "@/app/components/UI/Template/TeamDashboardTemplate/TeamDashboardTemplate";
import { AppRoutes } from "@/app/enums/AppRoutes";
import { PermissionTypes } from "@/app/enums/PermissionTypes";
import { ITeamMember } from "@/app/types/ITeamMember";
import firebaseRequest from "@/app/util/firebaseRequest";
import { User } from "firebase/auth";
import { useContext, useEffect, useState } from "react";

export default function Account() {
  const { userInfo, user, loadingUser, permission } =
    useContext(AppUserContext);

  const [members, setMembers] = useState<string[][]>([]);
  const [requests, setRequests] = useState<string[][]>([]);

  async function getTeamList() {
    const api = firebaseRequest(user as User);
    let result = (await api
      .get(`/api/settings/team?teamNumber=${userInfo?.teamNumber}`)
      .json()) as ITeamMember[];
    if (result) {
      let members: string[][] = [];
      let requests: string[][] = [];
      for (let memberKey in result) {
        const member = result[memberKey];
        if (Object.values(PermissionTypes).includes(member.role as never)) {
          members.push([member.displayName, member.role as string, memberKey]);
        } else {
          requests.push([member.displayName, memberKey]);
        }
      }
      setMembers(members);
      setRequests(requests);
    }
  }
  useEffect(() => {
    if (!loadingUser) {
      getTeamList();
    }
  }, [loadingUser]);

  async function handleRoleUpdate(uid: string, role: PermissionTypes) {
    const api = firebaseRequest(user as User);
    await api
      .post(`/api/settings/team`, {
        json: {
          uid: uid,
          role: role,
          teamNumber: userInfo?.teamNumber,
        },
      })
      .json();
    getTeamList();
  }
  async function handleRejection(uid: string, role: PermissionTypes) {
    const api = firebaseRequest(user as User);
    await api
      .delete(`/api/settings/team`, {
        json: {
          uid: uid,
          teamNumber: userInfo?.teamNumber,
        },
      })
      .json();
    getTeamList();
  }

  return (
    <TeamDashboardTemplate
      teamMembers={members}
      userPermissions={permission}
      handleRoleUpdate={handleRoleUpdate}
      requests={requests}
      handleRejection={handleRejection}
    />
  );
}
