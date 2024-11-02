import { genericHttps } from "../generic/generic-https";

async function getRoles() {
  const endpoint = "roles/get-roles";
  return await genericHttps.get(endpoint);
}

export const roleRepo = {
  getRoles,
};
