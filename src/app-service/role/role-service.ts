import { roleRepo } from "@/repo/role/role-repo";

async function getRoles() {
  return roleRepo.getRoles();
}

export const roleService = {
  getRoles,
};
