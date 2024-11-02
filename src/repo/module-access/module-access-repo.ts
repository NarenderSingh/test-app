import { genericHttps } from "../generic/generic-https";

async function getModuleAccess() {
  const endpoint = "module-access/get-module-access";
  return await genericHttps.get(endpoint);
}

async function updateModuleAccess(payload: any): Promise<any> {
  const endpoint = "module-access/update-module-access/" + payload?.id;
  return await genericHttps.put(endpoint, payload);
}

export const moduleAccessRepo = {
  getModuleAccess,
  updateModuleAccess,
};
