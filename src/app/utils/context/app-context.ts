import { createContext } from "react";
import { IProfileContext } from "../interface/app-interface";

export const ProfileContext = createContext<IProfileContext>({
  passwordModal: false,
  setPasswordModal: () => {},
  qrCodeModal: false,
  setQrCodeModal: () => {},
});
