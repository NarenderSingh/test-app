import img_profile from "@/themes-utils/images/admin/profile.png";
import img_settings from "@/themes-utils/images/admin/settings.png";
import img_members from "@/themes-utils/images/admin/members.png";
import img_access_control from "@/themes-utils/images/admin/access_control.png";
import img_billing from "@/themes-utils/images/admin/billing.png";
import img_plan from "@/themes-utils/images/admin/plan.png";

import img_hashed from "@/themes-utils/images/admin/hashed.png";
import user_network from "@/themes-utils/images/admin/user_network.png";
import img_square from "@/themes-utils/images/admin/square.png";
import img_coz from "@/themes-utils/images/admin/coz.png";
import Img_artboard from "@/themes-utils/images/admin/artboard.png";

import { IMenu, INav } from "../interface/app-interface";

export const MENU_LIST: IMenu[] = [
  {
    id: 1,
    name: "Profile",
    img_icon: img_profile,
    img_alt: "img_profile",
    active: true,
    route: "/admin/profile",
  },
  {
    id: 2,
    name: "Settings",
    img_icon: img_settings,
    img_alt: "img_settings",
    active: false,
    route: "/admin/settings",
  },
  {
    id: 3,
    name: "Members",
    img_icon: img_members,
    img_alt: "img_members",
    active: false,
    route: "/admin/members",
  },
  {
    id: 4,
    name: "Access Control",
    img_icon: img_access_control,
    img_alt: "img_access_control",
    active: false,
    route: "/admin/access-control",
  },
  {
    id: 5,
    name: "Billing",
    img_icon: img_billing,
    img_alt: "img_billing",
    active: false,
    route: "/admin/billing/completed",
  },
  {
    id: 6,
    name: "Plan",
    img_icon: img_plan,
    img_alt: "img_plan",
    active: false,
    route: "/admin/plan",
  },
];

export const NAV_LIST: INav[] = [
  {
    id: 1,
    img_icon: img_hashed,
    img_alt: "img_hashed",
    active: true,
    route: "https://reporting.coreinsights.cloud/",
    position: "top",
  },
  {
    id: 2,
    img_icon: user_network,
    img_alt: "user_network",
    active: false,
    route: "",
    position: "top",
  },
  {
    id: 3,
    img_icon: img_square,
    img_alt: "img_square",
    active: false,
    route: "",
    position: "top",
  },
  {
    id: 4,
    img_icon: img_coz,
    img_alt: "img_coz",
    active: false,
    route: "",
    position: "bottom",
    class: "small",
  },
  {
    id: 5,
    img_icon: Img_artboard,
    img_alt: "Img_artboard",
    active: false,
    route: "",
    position: "bottom",
  },
];
