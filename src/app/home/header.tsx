import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import white_logo from "@/themes-utils/images/home/white_logo.png";
// import kickstarter from "@/themes-utils/images/home/kickstarter.png";
// import twitter from "@/themes-utils/images/home/twitter.png";
// import instacart from "@/themes-utils/images/home/instacart.png";
// import pinterest from "@/themes-utils/images/home/pinterest.png";
// import lyft from "@/themes-utils/images/home/lyft.png";
// import shoppfy from "@/themes-utils/images/home/shoppfy.png";
// import slack from "@/themes-utils/images/home/slack.png";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { APP_COOKIES } from "../utils/cookies/cookies";
import { NameInitialsAvatar } from "react-name-initials-avatar";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PaymentIcon from "@mui/icons-material/Payment";
import AssessmentIcon from "@mui/icons-material/Assessment";

export default function Header() {
  const router = useRouter();
  const [isAuthd, setIsAuthd] = useState(false);
  const [username, setUsername] = useState("");
  const [anchorEl, setAnchorEl] = useState<null>(null);
  const openMenu = Boolean(anchorEl);

  useEffect(() => {
    setIsAuthd(APP_COOKIES.get("is_authd"));
    setUsername(APP_COOKIES.get("username"));
  }, []);

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
      <header className="header">
        <div className="company-logo-left">
          <Link href="https://www.altigen.com/" target="_blank">
            <Image src={white_logo} alt="company logo" />
          </Link>
        </div>
        {!isAuthd ? (
          <div className="center">
            <Link
              className="signin-btn btn-gap anchor-link"
              role="button"
              href="/auth/signup/validation"
            >
              Sign Up
            </Link>
            <Link
              className="signin-btn btn-gap anchor-link round-btn"
              role="button"
              href="/auth/signin"
            >
              Sign In
            </Link>
          </div>
        ) : (
          <div className="center">
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClickMenu}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={openMenu ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
              >
                <NameInitialsAvatar name={username} />
                <h5 className="username-h4">{username}</h5>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              onClick={handleCloseMenu}
              className="menu-list"
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
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
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Link href="/admin/profile">
                <MenuItem>
                  <Avatar>
                    <AccountBoxIcon />
                  </Avatar>
                  Profile
                </MenuItem>
              </Link>
              <Link href="/admin/billing/completed">
                <MenuItem>
                  <Avatar>
                    <PaymentIcon />
                  </Avatar>
                  Billings
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
          </div>
        )}

        <div className="header-label-div">
          <span className="header-label">
            <span className="header-span">NEW</span> Introducing: CoreInsights
            AI is an innovative AI consulting teams that works with you to
            further understand your data!
          </span>
        </div>

        <h1>CoreInsights Application Suite</h1>
        <p className="header-label-medium">
          <span>A Complete Suite of AI-based Analytics Solutions</span>
          <span>Delivering 360&deg; Views of Your Customer Interactions</span>
        </p>
        {isAuthd && (
          <div className="cta-buttons">
            <a href="#">
              <ChevronRightIcon className="chevron-right-icon" /> Demo Sandbox
            </a>
            <a href="#" className="secondary">
              Schedule a Demo
            </a>
          </div>
        )}
        <div className="social-icons">
          {/* <a href="#">
            <Image src={kickstarter} alt="kickstarter" />
          </a>
          <a href="#">
            <Image src={twitter} alt="twitter" />
          </a>
          <a href="#">
            <Image src={instacart} alt="instacart" />
          </a>
          <a href="#">
            <Image src={pinterest} alt="pinterest" />
          </a>
          <a href="#">
            <Image src={lyft} alt="lyft" />
          </a>
          <a href="#">
            <Image src={shoppfy} alt="shopfy" />
          </a>
          <a href="#">
            <Image src={slack} alt="slack" />
          </a> */}
        </div>
      </header>
    </React.Fragment>
  );
}
