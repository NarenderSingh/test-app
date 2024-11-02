"use client";

import { MODAL_STYLE } from "@/app/utils/constants/app-constant";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

export default function OtpScreenModal() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const handleOpenOtp = () => {
    setOtp(new Array(6).fill(""));
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose} keepMounted={true}>
      <Box sx={MODAL_STYLE}>
        <Typography
          id="modal-modal-title"
          fontWeight={900}
          variant="h4"
          component="h2"
        >
          2-Factor Authentication
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span className="auth-code-p">
            Enter the authentication code below we sent to{" "}
            <b>+91 00000 00 00</b>
          </span>
          <br />
        </Typography>
        <div className="auth-code-div">
          <input type="text" maxLength={1} className="auth-code-input" />
          <input type="text" maxLength={1} className="auth-code-input" />
          <input type="text" maxLength={1} className="auth-code-input" />
          <input type="text" maxLength={1} className="auth-code-input" />
          <input type="text" maxLength={1} className="auth-code-input" />
          <input type="text" maxLength={1} className="auth-code-input" />
        </div>

        <div className="btn-right-div">
          <Button className="btn-code-link" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="btn-code" onClick={handleOpenOtp}>
            Continue
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
