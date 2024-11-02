import { APP_COOKIES } from "@/app/utils/cookies/cookies";
import { API_CONFIG } from "@/repo/config/api-config";
import axios from "axios";

const API_URL = API_CONFIG.url;

async function getUserSession() {
  const token = APP_COOKIES.get("token");
  const user_id = APP_COOKIES.get("user_id");
  const url = API_URL + "reports/get-user-session/" + user_id;
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  return axios
    .get(url, {
      headers: headers,
    })
    .then((d: any) => {
      return d;
    })
    .catch((e: any) => {
      throw e;
    });
}

export const reportServer = {
  getUserSession,
};
