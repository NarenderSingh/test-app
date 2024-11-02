import { ISaveSetting } from "@/app/utils/interface/app-interface";
import { settingRepo } from "@/repo/setting/setting-repo";

async function getSettingDetail() {
  return settingRepo.getSettingDetail();
}

async function saveOrUpdateSetting(setting: ISaveSetting) {
  return settingRepo.saveOrUpdateSetting(setting);
}

export const settingService = {
  getSettingDetail,
  saveOrUpdateSetting,
};
