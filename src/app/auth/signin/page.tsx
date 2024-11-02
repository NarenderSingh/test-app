"use client";

import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import {
  ISignInFormValid,
  IUserLogin,
} from "@/app/utils/interface/app-interface";
import LoadingBackdrop from "@/app/component/backdrop";
import { userService } from "@/app-service/user/user-service";
import AuthScreenModal from "./auth-screen";
import PasswordComponent from "./password";
import { useCookies } from "react-cookie";
import { COOKIES_OPTIONS } from "@/app/utils/constants/app-constant";

export default function SingInPage() {
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies([
    "token",
    "user_id",
    "is_authd",
    "username",
  ]);
  const [isFormValid, setFormValid] = useState<ISignInFormValid>({
    email: true,
    password: true,
    isValid: true,
  });
  const [openAuth, setOpenAuth] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [user, setUser] = useState<IUserLogin>({
    email: "",
    password: "",
    otp: "",
  });

  const inputChange = (e: any) => {
    const value = e?.target.value;
    const field = e?.target.name;

    setUser({
      ...user,
      [field]: value,
    });
  };

  const onSignIn = () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const data: IUserLogin = {
        email: user.email,
        password: user.password,
      };
      userService
        .signIn(data)
        .then((d: any) => {
          const data = d?.data;
          setCookie("token", data?.access_token, COOKIES_OPTIONS);
          setCookie("user_id", data?.user_id, COOKIES_OPTIONS);
          setCookie("username", data?.username, COOKIES_OPTIONS);
          setCookie("is_authd", false, COOKIES_OPTIONS);
          setLoading(false);
          handleOpenOtp();
        })
        .catch((e: any) => {
          setLoading(false);

          if (e.status === 401) {
            toast.error("Error: " + e?.response?.data?.detail);
            return;
          }

          toast.error("Error: " + e.message);
        });
    }, 500);
  };

  const validateForm = (): boolean => {
    toast.dismiss();
    setFormValid({ email: true, password: true, isValid: true });

    if (user.email == "") {
      toast.error("Please enter the email");
      setFormValid({ ...isFormValid, email: false, isValid: false });
      return false;
    }

    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        user.email
      ) === false
    ) {
      toast.error("Please enter a valid email");
      setFormValid({ ...isFormValid, email: false, isValid: false });
      return false;
    }

    if (user.password == "") {
      toast.error("Please enter the password");
      setFormValid({
        ...isFormValid,
        email: true,
        password: false,
        isValid: false,
      });
      return false;
    }

    // if (/^([a-z0-9]{5,})$/.test(user.password) === false) {
    //   toast.error("Your password should be a combination of alphanumberic");
    //   return false;
    // }

    return true;
  };

  const handleOpenOtp = () => {
    setOtp(new Array(6).fill(""));
    setOpenAuth(true);
  };

  return (
    <React.Fragment>
      {loading && <LoadingBackdrop />}
      <div>
        <h1>Welcome to Altigen</h1>
        <p className="sub-header">
          We suggest using the email address you use at work
        </p>
        <form action="#" method="POST">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <TextField
            type="email"
            name="email"
            className={
              isFormValid.email == false ? "input-field error" : "input-field"
            }
            value={user.email}
            onChange={inputChange}
            placeholder="Email"
            required
            fullWidth
          />

          <label htmlFor="password" className="form-label">
            Password
          </label>
          <PasswordComponent
            password={user.password}
            isPasswordValid={isFormValid.password}
            inputChange={inputChange}
          />

          <div className="forgot-password">
            <Link href="/auth/forgot-password/request">Forgot Password?</Link>
          </div>
          <LoadingButton
            size="medium"
            onClick={onSignIn}
            loading={loading && !openAuth}
            loadingPosition="start"
            variant="contained"
            fullWidth
          >
            Sign In
          </LoadingButton>
        </form>
        <p className="signup">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup/validation">Sign Up</Link>
        </p>
      </div>
      <AuthScreenModal
        otp={otp}
        setOtp={setOtp}
        openAuth={openAuth}
        setOpenAuth={setOpenAuth}
        cookies={cookies}
        setCookie={setCookie}
      />
    </React.Fragment>
  );
}
