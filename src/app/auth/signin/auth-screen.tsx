"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import LoadingBackdrop from "@/app/component/backdrop";
import {
  COOKIES_OPTIONS,
  MODAL_STYLE,
} from "@/app/utils/constants/app-constant";
import {
  IAuthModalProps,
  IValidateOtp,
} from "@/app/utils/interface/app-interface";
import { userService } from "@/app-service/user/user-service";

export default function AuthScreenModal(props: IAuthModalProps) {
  const { openAuth, setOpenAuth, otp, setOtp, setCookie } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCloseOtp = () => {
    toast.dismiss();
    setOpenAuth(false);
  };

  const handleOtpInputChange = (element: any, index: number) => {
    if (isNaN(element.value)) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Move to next input box if the current one has a value
    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleOtpKeyDown = (e: any, index: number) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        if (e.target.previousSibling) {
          e.target.previousSibling.focus();
        }
      } else {
        // Clear the current input on backspace
        setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);
      }
    }
  };

  const onSubmitOtp = (e: any) => {
    e.preventDefault();
    toast.dismiss();

    const value = otp.join("");

    if (value.length < 6) {
      toast.error("Enter all the digits of OTP");
      return;
    }

    const payload: IValidateOtp = {
      otp: Number(value),
    };

    setLoading(true);
    setTimeout(() => {
      userService
        .validateOtp(payload)
        .then((d: any) => {
          if (d?.data === true) {
            setCookie("is_authd", true, COOKIES_OPTIONS);
            setOpenAuth(false);
            toast.success("Login Successful");
            router.push("/admin/profile");
            setTimeout(() => {
              setLoading(false);
            }, 2000);
          } else {
            toast.error("Invalid OTP");
            setLoading(false);
          }
        })
        .catch((e: any) => {
          setLoading(false);
          toast.error("Error: " + e.message);
        });
    }, 1000);
  };

  return (
    <Modal
      open={openAuth}
      onClose={handleCloseOtp}
      keepMounted={true}
      disableEscapeKeyDown={true}
      disableScrollLock={true}
    >
      <Box sx={MODAL_STYLE}>
        {loading && <LoadingBackdrop />}
        <Typography fontWeight={900} variant="h4" component="h2">
          2-Factor Authentication
        </Typography>
        <Typography id="modal-auth-description" sx={{ mt: 2 }}>
          <span className="auth-code-p">
            Use an authentication app such as <b>Authy</b> or{" "}
            <b>Google Authenticator</b> to generate an authentication code
          </span>
          <br />
        </Typography>
        <div className="auth-code-div">
          {otp.map((data, index) => (
            <input
              className="auth-code-input"
              type="text"
              name="otp"
              maxLength={1}
              key={index}
              value={data}
              onChange={(e) => handleOtpInputChange(e.target, index)}
              onKeyDown={(e) => handleOtpKeyDown(e, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>
        <div className="btn-right-div">
          <Button className="btn-code-link" onClick={handleCloseOtp}>
            Cancel
          </Button>
          <LoadingButton
            size="medium"
            onClick={onSubmitOtp}
            loading={loading}
            loadingPosition="start"
            variant="contained"
          >
            Continue
          </LoadingButton>
        </div>
      </Box>
    </Modal>
  );
}
