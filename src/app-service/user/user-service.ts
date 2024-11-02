import {
  IResetPassword,
  IUserLogin,
  IUserRegister,
  IValidateEmail,
  IValidateOtp,
} from "@/app/utils/interface/app-interface";
import { userRepo } from "@/repo/user/user-repo";

async function signIn(data: IUserLogin) {
  return userRepo.signIn(data);
}

async function validateOtp(data: IValidateOtp) {
  return userRepo.validateOtp(data);
}

async function addUser(user: IUserRegister) {
  return userRepo.addUser(user);
}

async function validateEmail(user: IValidateEmail) {
  return userRepo.validateEmail(user);
}

async function resetPassword(user: IResetPassword) {
  return userRepo.resetPassword(user);
}

export const userService = {
  signIn,
  validateOtp,
  addUser,
  validateEmail,
  resetPassword,
};
