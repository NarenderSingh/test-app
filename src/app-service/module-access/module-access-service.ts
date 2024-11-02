import { IUpdateModuleAccess } from "@/app/utils/interface/app-interface";
import { moduleAccessRepo } from "@/repo/module-access/module-access-repo";

async function getModuleAccess() {
  return moduleAccessRepo.getModuleAccess();
}

async function updateModuleAccess(payload: IUpdateModuleAccess) {
  return moduleAccessRepo.updateModuleAccess(payload);
}

export const moduleAccessService = {
  getModuleAccess,
  updateModuleAccess,
};
