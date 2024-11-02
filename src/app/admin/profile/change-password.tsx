"use client";

import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MODAL_STYLE } from "@/app/utils/constants/app-constant";
import { toast } from "react-toastify";
import { ProfileContext } from "@/app/utils/context/app-context";
import LoadingBackdrop from "@/app/component/backdrop";
import { IUserPassword } from "@/app/utils/interface/app-interface";
import { profileService } from "@/app-service/profile/profile-service";

export default function ChangePasswordModal() {
  const profileContext = useContext(ProfileContext);
  const { passwordModal, setPasswordModal } = profileContext;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUserPassword>({
    password: "",
    confirm_password: "",
  });
  const [isFormValid, setFormValid] = useState({
    password: true,
    confirmPassword: true,
  });

  useEffect(() => {
    cleanForm();
  }, [passwordModal]);

  const inputChange = (e: any) => {
    const value = e?.target.value;
    const field = e?.target.name;

    setUser({
      ...user,
      [field]: value,
    });
  };

  const handleClosePasswordModal = () => {
    setPasswordModal(false);
  };

  const onUpdatePassword = () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      profileService
        .updateUserPassword(user)
        .then(() => {
          setLoading(false);
          cleanForm();
          toast.success("Password updated successfully.");
          handleClosePasswordModal();
        })
        .catch((e: any) => {
          setLoading(false);
          toast.error("Error updating Password.");
        });
    }, 1500);
  };

  const validateForm = (): boolean => {
    toast.dismiss();

    if (user.password == "") {
      toast.error("Please enter the New Password");
      setFormValid({ ...isFormValid, password: false });
      return false;
    }

    if (user.confirm_password == "") {
      toast.error("Please enter the Repeat New Password");
      setFormValid({
        ...isFormValid,
        password: true,
        confirmPassword: false,
      });
      return false;
    }

    if (user.password !== user.confirm_password) {
      toast.error("New Password and Repeat New Password should be same");
      setLoading(false);
      return false;
    }

    setFormValid({
      password: true,
      confirmPassword: true,
    });
    return true;
  };

  const cleanForm = () => {
    setUser({
      password: "",
      confirm_password: "",
    });
  };

  return (
    <React.Fragment>
      <Modal
        open={passwordModal}
        onClose={handleClosePasswordModal}
        keepMounted={true}
      >
        <Box sx={MODAL_STYLE}>
          {loading && <LoadingBackdrop />}
          <Typography
            id="modal-modal-title"
            fontWeight={900}
            variant="h4"
            component="h2"
          >
            Change Password
          </Typography>
          <div className="form-password">
            <form action="#" method="POST">
              <label className="form-label">Enter New Password</label>

              <TextField
                type="password"
                name="password"
                className={
                  !isFormValid.password ? "input-field error" : "input-field"
                }
                value={user.password}
                onChange={inputChange}
                placeholder="Password"
                required
                fullWidth
              />
              <br />

              <label className="form-label">Repeat New Password</label>
              <TextField
                type="password"
                name="confirm_password"
                className={
                  !isFormValid.confirmPassword
                    ? "input-field error"
                    : "input-field"
                }
                value={user.confirm_password}
                onChange={inputChange}
                placeholder="Confirm Password"
                required
                fullWidth
              />
            </form>
          </div>

          <div className="btn-right-div">
            <Button
              className="btn-code-link"
              onClick={handleClosePasswordModal}
            >
              Cancel
            </Button>
            <LoadingButton
              size="medium"
              onClick={onUpdatePassword}
              loading={loading}
              loadingPosition="start"
              variant="contained"
            >
              Update
            </LoadingButton>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
