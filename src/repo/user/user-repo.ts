import {
  IResetPassword,
  IUserLogin,
  IUserRegister,
  IValidateEmail,
  IValidateOtp,
} from "@/app/utils/interface/app-interface";
import axios from "axios";
import { API_CONFIG } from "../config/api-config";
import { APP_COOKIES } from "@/app/utils/cookies/cookies";
import { genericHttps } from "../generic/generic-https";

const API_URL = API_CONFIG.url;

async function signIn(data: IUserLogin) {
  const url = API_URL + "auth";
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const form_data = {
    username: data.email,
    password: data.password,
  };

  return axios
    .post(url, form_data, {
      headers: headers,
    })
    .then((d: any) => {
      return d;
    })
    .catch((e: any) => {
      throw e;
    });
}

async function validateOtp(data: IValidateOtp) {
  const user_id = APP_COOKIES.get("user_id");
  const endpoint = "auth/validate-otp";
  const payload = {
    user_id: user_id,
    otp: data.otp,
  };

  return await genericHttps.post(endpoint, payload);
}

async function addUser(user: IUserRegister) {
  const endpoint = "users";
  return await genericHttps.post(endpoint, user);
}

async function validateEmail(user: IValidateEmail) {
  const endpoint = "users/validate-email";
  const payload = {
    email: user.email,
  };

  return await genericHttps.post(endpoint, payload);
}

async function resetPassword(user: IResetPassword) {
  const endpoint = "users/reset-password";
  return await genericHttps.put(endpoint, user);
}

export const userRepo = {
  signIn,
  validateOtp,
  addUser,
  validateEmail,
  resetPassword,
};
