"use client";

import React, { useContext, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MODAL_STYLE } from "@/app/utils/constants/app-constant";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { ProfileContext } from "@/app/utils/context/app-context";

export default function QrCodeModal() {
  const profileContext = useContext(ProfileContext);
  const { qrCodeModal, setQrCodeModal } = profileContext;
  const [loading, setLoading] = useState(false);

  const handleOpenQrCodeModal = () => {
    setQrCodeModal(true);
  };

  const handleCloseQrCodeModal = () => {
    setQrCodeModal(false);
  };

  const onSubmit = () => {};

  return (
    <React.Fragment>
      <Modal
        open={qrCodeModal}
        onClose={handleCloseQrCodeModal}
        keepMounted={true}
      >
        <Box sx={MODAL_STYLE}>
          <Typography
            id="modal-modal-title"
            fontWeight={900}
            variant="h4"
            component="h2"
          >
            2-Factor Authentication Setup
          </Typography>
          <div className="form-password">
            <form action="#" method="POST">
              <FormControl>
                <br />
                <RadioGroup defaultValue="code" name="radio-buttons-group">
                  <FormControlLabel
                    value="code"
                    control={<Radio />}
                    className="radio-group-qrcode"
                    label="Through an authentication app"
                  />
                  <span className="radio-recommended">RECOMMENDED</span>
                  <label className="radio-label-qrcode">
                    Use an authentication app such as Authy or Google
                    Authenticator to generate an authentication code.
                  </label>
                  <br />
                  <FormControlLabel
                    value="sms"
                    control={<Radio />}
                    className="radio-group-qrcode"
                    label="Through SMS Text Message"
                  />
                  <label className="radio-label-qrcode">
                    We will send an authentication code to your mobile number.
                  </label>
                </RadioGroup>
              </FormControl>
            </form>
          </div>

          <div className="btn-right-div">
            <Button className="btn-code-link" onClick={handleCloseQrCodeModal}>
              Cancel
            </Button>
            <LoadingButton
              size="medium"
              onClick={onSubmit}
              loading={loading}
              loadingPosition="start"
              variant="contained"
            >
              Continue
            </LoadingButton>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
