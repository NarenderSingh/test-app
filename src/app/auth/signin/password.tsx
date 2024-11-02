"use client";

import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InfoIcon from "@mui/icons-material/Info";
import { IPassword } from "@/app/utils/interface/app-interface";

export default function PasswordComponent(props: IPassword) {
  const { password, isPasswordValid, inputChange } = props;
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <div>
        <OutlinedInput
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={inputChange}
          placeholder="Password"
          required
          fullWidth
          className={
            isPasswordValid == false ? "input-field error" : "input-field"
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
      <span className="password-info">
        <InfoIcon className="info-icon" /> User combination of alphanumberic
      </span>
    </React.Fragment>
  );
}
