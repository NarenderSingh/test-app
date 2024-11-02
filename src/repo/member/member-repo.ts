import { ISendInvite, IUpdateRole } from "@/app/utils/interface/app-interface";
import { genericHttps } from "../generic/generic-https";

async function getMembers(): Promise<any> {
  const endpoint = "members/get-members";
  return await genericHttps.get(endpoint);
}

async function getInvites(): Promise<any> {
  const endpoint = "members/get-invites";
  return await genericHttps.get(endpoint);
}

async function sendInvite(invite: ISendInvite): Promise<any> {
  const endpoint = "members/send-invite";
  return await genericHttps.post(endpoint, invite);
}

async function updateRole(role: IUpdateRole): Promise<any> {
  const endpoint = "members/update-user-role/" + role.user_id;
  return await genericHttps.put(endpoint, role);
}

export const memberRepo = {
  getMembers,
  getInvites,
  sendInvite,
  updateRole,
};
