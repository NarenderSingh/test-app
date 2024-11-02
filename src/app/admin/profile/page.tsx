"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import img_oval_user from "@/themes-utils/images/admin/oval_user.png";
import { IUserUpdate } from "@/app/utils/interface/app-interface";
import Button from "@mui/material/Button";
import LoadingBackdrop from "@/app/component/backdrop";
import ChangePasswordModal from "./change-password";
import QrCodeModal from "./qr-code";
import { ProfileContext } from "@/app/utils/context/app-context";
import { profileService } from "@/app-service/profile/profile-service";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [qrCodeModal, setQrCodeModal] = useState(false);
  const [isFormValid, setFormValid] = useState({
    first_name: true,
    last_name: true,
    phone: true,
  });
  const [user, setUser] = useState<IUserUpdate>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    photo_url: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      getProfile();
    }
  }, []);

  const getProfile = () => {
    setLoading(true);
    setTimeout(() => {
      profileService
        .getProfile()
        .then((d: any) => {
          setUser(d?.data);
          setLoading(false);
        })
        .catch((e: any) => {
          setLoading(false);
          toast.error(e?.response?.data?.message);
        });
    }, 1000);
  };

  const inputChange = (e: any) => {
    const value = e?.target.value;
    const field = e?.target.name;

    setUser({
      ...user,
      [field]: value,
    });
  };

  const onUpdateChanges = () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      profileService
        .updateUser(user)
        .then((d: any) => {
          console.log(d);
          setLoading(false);
          setUser(d?.data);
          toast.success("Account updated successfully.");
        })
        .catch((e: any) => {
          setLoading(false);
          toast.error("Error updating account.");
        });
    }, 1500);
  };

  const validateForm = (): boolean => {
    toast.dismiss();

    if (user.first_name == "") {
      toast.error("Please enter the First Name");
      setFormValid({ ...isFormValid, first_name: false });
      return false;
    }

    if (user.last_name == "") {
      toast.error("Please enter the Last Name");
      setFormValid({ ...isFormValid, first_name: true, last_name: false });
      return false;
    }

    if (user.phone == "") {
      toast.error("Please enter the Phone Number");
      setFormValid({
        ...isFormValid,
        first_name: true,
        last_name: true,
        phone: false,
      });
      return false;
    }

    setFormValid({
      first_name: true,
      last_name: true,
      phone: true,
    });
    return true;
  };

  const setNewPassword = () => {
    setPasswordModal(true);
  };

  const setUp2FactorAuth = () => {
    setQrCodeModal(true);
  };

  return (
    <React.Fragment>
      <ProfileContext.Provider
        value={{
          passwordModal,
          setPasswordModal,
          qrCodeModal,
          setQrCodeModal,
        }}
      >
        <div>
          {loading && <LoadingBackdrop />}
          <h2 className="profile-title">Profile Details</h2>
          <p className="profile-description">
            Help us serve you better by filling out your profile! It only takes
            a few minutes and will personalize your experience on our portal.
            Update your preferences, picture, and contact details to get the
            most out of our services.
          </p>
          <div className="profile-picture">
            <Image src={img_oval_user} alt="profile picture" />
            <p className="profile-picture-label">Profile Picture</p>
          </div>

          <div className="profile-name">
            <div className="first">
              <label className="form-label">First Name</label>
              <TextField
                type="text"
                name="first_name"
                className={
                  !isFormValid.first_name ? "input-field error" : "input-field"
                }
                value={user.first_name}
                onChange={inputChange}
                placeholder="First Name"
                required
                fullWidth
              />
            </div>
            <div className="second">
              <label className="form-label">Last Name</label>
              <TextField
                type="text"
                name="last_name"
                className={
                  !isFormValid.last_name ? "input-field error" : "input-field"
                }
                value={user.last_name}
                onChange={inputChange}
                placeholder="Last Name"
                fullWidth
              />
            </div>
          </div>

          <label className="form-label">Email</label>
          <h4 className="h4-email">{user.email}</h4>
          <label className="form-label">Phone Number</label>
          <div>
            <TextField
              type="text"
              name="phone"
              className={
                !isFormValid.phone ? "input-field error" : "input-field"
              }
              value={user.phone}
              onChange={inputChange}
              placeholder="Phone"
              fullWidth
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <span>
              You can change a password if you don&apos;t want to use old one
            </span>
            <Button
              size="medium"
              onClick={setNewPassword}
              variant="contained"
              color="error"
            >
              Set New Password
            </Button>
          </div>

          <div className="form-group">
            <label className="form-label">2-Factor Authentication</label>
            <span>Click the button below to turn it on</span>
            <Button
              size="medium"
              onClick={setUp2FactorAuth}
              variant="contained"
              color="error"
            >
              Setup 2-Factor
            </Button>
          </div>

          <hr />
          <div className="text-align-right">
            <LoadingButton
              size="medium"
              onClick={onUpdateChanges}
              loading={loading}
              loadingPosition="start"
              variant="contained"
            >
              Update
            </LoadingButton>
          </div>
        </div>

        <ChangePasswordModal />

        <QrCodeModal />
      </ProfileContext.Provider>
    </React.Fragment>
  );
}
