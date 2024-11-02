import { APP_COOKIES } from "@/app/utils/cookies/cookies";
import { genericHttps } from "../generic/generic-https";
import { ISaveSetting } from "@/app/utils/interface/app-interface";

async function getSettingDetail() {
  const user_id = APP_COOKIES.get("user_id");
  const endpoint = "settings/get-setting-detail/" + user_id;
  return await genericHttps.get(endpoint);
}

async function saveOrUpdateSetting(payload: ISaveSetting) {
  const user_id = APP_COOKIES.get("user_id");
  const endpoint = "settings/save-or-update-setting/";
  payload.user_id = user_id;
  return await genericHttps.post(endpoint, payload);
}

export const settingRepo = {
  getSettingDetail,
  saveOrUpdateSetting,
};
