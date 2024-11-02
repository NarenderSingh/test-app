"use client";

import { useState } from "react";
import { toast } from "react-toastify";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import InfoIcon from "@mui/icons-material/Info";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import LoadingBackdrop from "@/app/component/backdrop";
import { userService } from "@/app-service/user/user-service";

export default function ForgotPasswordSetupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    password: "",
    confirm_password: "",
  });
  const [isFormValid, setFormValid] = useState({
    password: true,
    confirm_password: true,
  });

  const inputChange = (e: any) => {
    const value = e?.target.value;
    const field = e?.target.name;

    setUser({
      ...user,
      [field]: value,
    });
  };

  const onSubmit = () => {
    if (!validateForm()) {
      return;
    }

    if (user.password !== user.confirm_password) {
      toast.error("Password and Confirm Password should be same");
      setLoading(false);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const payload = {
        password: user.password,
        confirm_password: user.confirm_password,
        email: searchParams.get("email"),
      };

      userService
        .resetPassword(payload)
        .then(() => {
          toast.success("Password reset successfully. Sign in to continue");
          setLoading(false);
          router.push("/auth/signin");
        })
        .catch((e: any) => {
          toast.error(e?.response?.data?.message);
          setLoading(false);
        });
    }, 1500);
  };

  const validateForm = (): boolean => {
    toast.dismiss();

    if (user.password == "") {
      toast.error("Please enter the Password");
      setFormValid({ ...isFormValid, password: false });
      return false;
    }

    if (user.confirm_password == "") {
      toast.error("Please enter the Password");
      setFormValid({ ...isFormValid, password: true, confirm_password: false });
      return false;
    }

    setFormValid({ password: true, confirm_password: true });
    return true;
  };

  return (
    <div>
      {loading && <LoadingBackdrop />}
      <h1>Welcome to Altigen</h1>
      <p className="sub-header">
        We suggest using the email address you use at work
      </p>
      <form action="#" method="POST">
        <label className="form-label">Password</label>

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
        <span className="password-info">
          <InfoIcon className="info-icon" /> User combination of alphanumberic
        </span>
        <label className="form-label">Confirm Password</label>
        <TextField
          type="password"
          name="confirm_password"
          className={
            !isFormValid.confirm_password ? "input-field error" : "input-field"
          }
          value={user.confirm_password}
          onChange={inputChange}
          placeholder="Confirm Password"
          required
          fullWidth
        />
        <LoadingButton
          size="medium"
          onClick={onSubmit}
          loading={loading}
          loadingPosition="start"
          variant="contained"
          fullWidth
        >
          Reset Password
        </LoadingButton>
      </form>
      <div className="signin-link">
        <p>
          Already have an account? <Link href="/auth/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
