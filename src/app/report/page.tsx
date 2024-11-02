"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { IReportSession } from "../utils/interface/app-interface";
import { toast } from "react-toastify";
import { reportService } from "@/app-service/report/report-service";
import LoadingBackdrop from "../component/backdrop";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PaymentIcon from "@mui/icons-material/Payment";
import HomeIcon from "@mui/icons-material/Home";
import Settings from "@mui/icons-material/Settings";
import Link from "next/link";

export default function Report() {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [session, setSession] = useState<IReportSession>({
    sessionKey: null,
    userKey: null,
  });

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      getUserSession();
    }
  }, []);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List className="left-nav-report">
        <Link href="/">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/admin/profile">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/admin/settings">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary={"Settings"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/admin/billing/completed">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PaymentIcon />
              </ListItemIcon>
              <ListItemText primary={"Billings"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  const getUserSession = async () => {
    setLoading(true);
    reportService
      .getUserSession()
      .then((d: any) => {
        const data = d?.data;
        const newSession = {
          sessionKey: data?.ResultSessionKey,
          userKey: data?.ResultUserKey,
        };
        setSession(newSession);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      })
      .catch((e: any) => {
        toast.error(e?.response?.data?.message);
      });
  };

  return (
    <div className="container-report">
      {loading && <LoadingBackdrop />}
      <div>
        <Button className="report-menu-btn" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </Button>
        <h3 className="report-title">Dashboard Reports</h3>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
      {session.sessionKey !== null && session.userKey !== null && (
        <iframe
          src={`https://reporting.coreinsights.cloud/s/e5517?SessionKey=${session.sessionKey}&UserKey=${session.userKey}`}
          scrolling="no"
          frameBorder="0"
          className="report-frame"
        ></iframe>
      )}
    </div>
  );
}
