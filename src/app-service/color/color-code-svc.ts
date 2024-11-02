import { colorCodeRepo } from "@/repo/color/color-code-repo";

async function getColorCodes() {
  return colorCodeRepo.getColorCodes();
}

export const colorCodeService = {
  getColorCodes,
};
