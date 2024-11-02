import { ROLES, SEARCH_TYPE } from "../constants/app-enum";

export interface IUserLogin {
  email: string;
  password: string;
  otp?: string;
}

export interface IValidateOtp {
  otp: number;
}

export interface IValidateEmail {
  email: string;
}

export interface IUserRegister {
  rssd_id: number;
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  password: string;
}

export interface IUserUpdate {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  photo_url: string;
}

export interface IUserPassword {
  password: string;
  confirm_password: string;
}

export interface ISignInFormValid {
  email: boolean;
  password: boolean;
  isValid: boolean;
}

export interface IMenu {
  id: number;
  name: string;
  img_icon: any;
  img_alt: string;
  active: boolean;
  route: string;
}

export interface INav {
  id: number;
  img_icon: any;
  img_alt: string;
  active: boolean;
  route: string;
  position: string;
  class?: string;
}

export interface IProfileContext {
  passwordModal: boolean;
  setPasswordModal: any;
  qrCodeModal: boolean;
  setQrCodeModal: any;
}

export interface IAuthModalProps {
  openAuth: boolean;
  setOpenAuth: any;
  otp: string[];
  setOtp: any;
  cookies: any;
  setCookie: any;
}

export interface IToken {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  user_id: number;
}

export interface IPassword {
  password: string;
  isPasswordValid: boolean;
  inputChange: any;
}

export interface IResetPassword {
  email: string;
  password: string;
  confirm_password: string;
}

export interface IUserInvite {
  email?: string;
  role?: string;
}

export interface ISendInvite {
  email: string;
  role_id: number;
}

export interface IUpdateRole {
  user_id: number;
  role_id: number;
}

export interface IMember {
  id: number;
  name: string;
  email: string;
  isEdited: boolean;
  photo_url: string;
  role: ROLES;
  searchType: SEARCH_TYPE;
}

export interface IInviteModal {
  inviteModal: boolean;
  setInviteModal: any;
  setSearchType: any;
  getInvites: any;
  roles: IRole[];
}

export interface IRole {
  id: number;
  title: string;
}

export interface IModuleAccess {
  id: number;
  title: string;
  info?: string;
  status: boolean;
  admin_access: boolean;
  manager_access: boolean;
  user_access: boolean;
}

export interface IReportSession {
  sessionKey: string;
  userKey: string;
}

export interface IFooterProps {
  onScrollToPricing: any;
}

export interface ISaveSetting {
  user_id?: number;
  primary_color: string;
  secondary_color: string;
  success_color: string;
  danger_color: string;
}

export interface IColorCode {
  id: number;
  code: string;
}

export interface IColor {
  primary: string;
  secondary: string;
  success: string;
  danger: string;
}

export interface IUpdateModuleAccess {
  id: number;
  column_name: string;
  checked: boolean;
}
