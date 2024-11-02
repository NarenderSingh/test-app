import { APP_COOKIES } from "@/app/utils/cookies/cookies";
import {
  IUserPassword,
  IUserUpdate,
} from "@/app/utils/interface/app-interface";
import { genericHttps } from "../generic/generic-https";

const user_id = APP_COOKIES.get("user_id");

async function getProfile() {
  const endpoint = "profile/get-profile/" + user_id;
  return await genericHttps.get(endpoint);
}

async function updateUserPassword(user: IUserPassword) {
  const endpoint = "profile/update-password/" + user_id;
  return await genericHttps.put(endpoint, user);
}

async function updateUser(user: IUserUpdate) {
  const endpoint = "profile/update-user/" + user_id;
  return await genericHttps.put(endpoint, user);
}

export const profileRepo = {
  getProfile,
  updateUserPassword,
  updateUser,
};
