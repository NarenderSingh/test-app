"use client";

import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import img_logo from "@/themes-utils/images/auth-layout/logo.png";
import { usePathname, useRouter } from "next/navigation";
import { MENU_LIST, NAV_LIST } from "../utils/constants/menu-list";
import { IMenu, INav } from "../utils/interface/app-interface";
import Link from "next/link";
import { APP_COOKIES } from "../utils/cookies/cookies";
import Skeleton from "@mui/material/Skeleton";
import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import AssessmentIcon from "@mui/icons-material/Assessment";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [menuList, setMenuList] = useState<IMenu[]>(MENU_LIST);
  const [navList, setNavList] = useState<INav[]>(NAV_LIST);
  const [isAuthd, setIsAuthd] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let isAuth = APP_COOKIES.get("is_authd");
      if (isAuth === undefined) {
        isAuth = false;
        router.push("/auth/signin");
      }

      if (!isAuth) {
        router.push("/auth/signin");
      }

      setIsAuthd(isAuth);
    }
  }, [isAuthd, router]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const onMenuClick = (item: any) => {
    setMenuList(
      menuList.map((menu: IMenu) => {
        return menu.id === item.id
          ? { ...menu, active: true }
          : { ...menu, active: false };
      })
    );
    router.push(item.route);
  };

  const onNavClick = (item: any) => {
    setNavList(
      navList.map((nav: INav) => {
        return nav.id === item.id
          ? { ...nav, active: true }
          : { ...nav, active: false };
      })
    );
    if (item.route !== "") {
      window.open(item.route, "_blank");
    }
  };

  const renderMenuList = (menuList: IMenu[]) => {
    return menuList?.map((item: IMenu) => {
      let className = "not-active";
      if (item.route === pathname) {
        className = "active-menu";
      }

      return (
        <li
          key={item.name}
          className={className}
          onClick={() => onMenuClick(item)}
        >
          <Image src={item.img_icon} alt={item.img_alt} />
          <span>{item.name}</span>
        </li>
      );
    });
  };

  const [anchorEl, setAnchorEl] = useState<null>(null);
  const openMenu = Boolean(anchorEl);

  const handleClickMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const onsignOut = () => {
    APP_COOKIES.remove("token");
    APP_COOKIES.remove("user_id");
    APP_COOKIES.remove("is_authd");
    APP_COOKIES.remove("username");
    window.location.reload();
  };

  return (
    <React.Fragment>
      {!isAuthd && (
        <div className="profile-page-container">
          <Box sx={{ width: "100%" }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        </div>
      )}

      {isAuthd && (
        <div className="profile-page-container">
          <div className="left-nav-slider">
            <div className="slider-placeholder">
              <ul>
                <li>
                  <Link href="/">
                    <Image src={img_logo} alt="img_logo" />
                  </Link>
                </li>
                {navList?.map((item: INav, key: number) => {
                  return (
                    item?.position === "top" && (
                      <li
                        key={key}
                        onClick={() => onNavClick(item)}
                        className={item.active ? "active" : ""}
                      >
                        <Link href={item.route}>
                          <Image src={item.img_icon} alt={item.img_alt} />
                        </Link>
                      </li>
                    )
                  );
                })}
              </ul>
            </div>

            <div className="slider-placeholder-bottom">
              <ul>
                {navList?.map((item: INav, key: number) => {
                  return (
                    item?.position === "bottom" && (
                      <li
                        key={key}
                        onClick={() => onNavClick(item)}
                        className={item.active ? "active" : ""}
                      >
                        <Tooltip title="Account settings">
                          <Image
                            src={item.img_icon}
                            alt={item.img_alt}
                            className={item.class}
                            onClick={handleClickMenu}
                            aria-controls={
                              openMenu ? "account-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={openMenu ? "true" : undefined}
                          />
                        </Tooltip>
                        <Menu
                          anchorEl={anchorEl}
                          open={openMenu}
                          className="menu-list"
                          onClose={handleCloseMenu}
                          onClick={handleCloseMenu}
                          slotProps={{
                            paper: {
                              elevation: 0,
                              sx: {
                                filter:
                                  "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                mt: -18,
                                "& .MuiAvatar-root": {
                                  width: 32,
                                  height: 32,
                                  ml: -0.5,
                                  mr: 1,
                                },
                                "&::before": {
                                  content: '""',
                                  display: "block",
                                  position: "absolute",
                                  top: 0,
                                  right: 14,
                                  width: 10,
                                  height: 10,
                                  bgcolor: "background.paper",
                                  transform: "translateY(-50%) rotate(45deg)",
                                  zIndex: 0,
                                },
                              },
                            },
                          }}
                        >
                          <Link href="/">
                            <MenuItem>
                              <Avatar>
                                <HomeIcon />
                              </Avatar>
                              Home
                            </MenuItem>
                          </Link>
                          <Link href="/report">
                            <MenuItem>
                              <Avatar>
                                <AssessmentIcon />
                              </Avatar>
                              Reports
                            </MenuItem>
                          </Link>
                          <Divider />
                          <Link href="/auth/signup/validation">
                            <MenuItem>
                              <ListItemIcon>
                                <PersonAdd fontSize="small" />
                              </ListItemIcon>
                              Add another user
                            </MenuItem>
                          </Link>
                          <Link href="/admin/settings">
                            <MenuItem>
                              <ListItemIcon>
                                <Settings fontSize="small" />
                              </ListItemIcon>
                              Settings
                            </MenuItem>
                          </Link>
                          <MenuItem onClick={onsignOut}>
                            <ListItemIcon>
                              <Logout fontSize="small" />
                            </ListItemIcon>
                            Sign Out
                          </MenuItem>
                        </Menu>
                      </li>
                    )
                  );
                })}
              </ul>
            </div>
          </div>

          <nav className={`left-nav ${isNavOpen ? "open" : "closed"}`}>
            <button className="toggle-nav" onClick={toggleNav}>
              {isNavOpen ? "<" : ">"}
            </button>
            {isNavOpen && <ul>{renderMenuList(menuList)}</ul>}
          </nav>

          <div className="profile-page-container">
            <div className="profile-details-container">{children}</div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
