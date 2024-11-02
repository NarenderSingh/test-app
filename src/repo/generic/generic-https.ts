import axios from "axios";
import { APP_COOKIES } from "@/app/utils/cookies/cookies";
import { API_CONFIG } from "../config/api-config";

const API_URL = API_CONFIG.url;

const get = async (endpoint: string) => {
  const url = API_URL + endpoint;
  const token = APP_COOKIES.get("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  return axios
    .get(url, {
      headers: headers,
    })
    .then((data: any) => {
      return data;
    })
    .catch((error: any) => {
      throw error;
    });
};

const post = async (endpoint: string, payload: any) => {
  const url = API_URL + endpoint;
  const token = APP_COOKIES.get("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  return axios
    .post(url, payload, {
      headers: headers,
    })
    .then((data: any) => {
      return data;
    })
    .catch((error: any) => {
      throw error;
    });
};

const put = async (endpoint: string, payload: any) => {
  const url = API_URL + endpoint;
  const token = APP_COOKIES.get("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  return await axios
    .put(url, payload, {
      headers: headers,
    })
    .then((data: any) => {
      return data;
    })
    .catch((error: any) => {
      throw error;
    });
};

export const genericHttps = {
  get,
  post,
  put,
};
