import { reportServer } from "@/reporting/stimulsoft";

async function updateUser() {
  return reportServer.getUserSession();
}

async function getUserSession() {
  return reportServer.getUserSession();
}

export const reportService = {
  updateUser,
  getUserSession,
};
