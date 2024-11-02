import { genericHttps } from "../generic/generic-https";

async function getColorCodes(): Promise<any> {
  const endpoint = "color-codes/get-color-codes";
  return await genericHttps.get(endpoint);
}

export const colorCodeRepo = {
  getColorCodes,
};
