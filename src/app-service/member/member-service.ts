import { ISendInvite, IUpdateRole } from "@/app/utils/interface/app-interface";
import { memberRepo } from "@/repo/member/member-repo";

async function getMembers() {
  return memberRepo.getMembers();
}

async function getInvites() {
  return memberRepo.getInvites();
}

async function sendInvite(invite: ISendInvite) {
  return memberRepo.sendInvite(invite);
}

async function updateRole(role: IUpdateRole) {
  return memberRepo.updateRole(role);
}

export const memberService = {
  getMembers,
  getInvites,
  sendInvite,
  updateRole,
};
