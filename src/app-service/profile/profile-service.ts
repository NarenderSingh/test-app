import {
  IUserPassword,
  IUserUpdate,
} from "@/app/utils/interface/app-interface";
import { profileRepo } from "@/repo/profile/profile-repo";

async function getProfile() {
  return profileRepo.getProfile();
}

async function updateUserPassword(user: IUserPassword) {
  return profileRepo.updateUserPassword(user);
}

async function updateUser(user: IUserUpdate) {
  return profileRepo.updateUser(user);
}

export const profileService = {
  getProfile,
  updateUserPassword,
  updateUser,
};
