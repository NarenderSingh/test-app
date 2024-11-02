"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import LoadingBackdrop from "@/app/component/backdrop";
import { userService } from "@/app-service/user/user-service";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isFormValid, setFormValid] = useState({
    email: true,
  });

  const inputChange = (e: any) => {
    const value = e?.target.value;
    setEmail(value);
  };

  const onSubmit = () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const payload = { email: email };
      userService
        .validateEmail(payload)
        .then((d: any) => {
          if (d.data) {
            toast.success("Email verification successful");
            setLoading(false);
            router.push("/auth/forgot-password/setup?email=" + email, {
              scroll: false,
            });
          } else {
            toast.error("No account found with this email");
            setLoading(false);
          }
        })
        .catch((e: any) => {
          toast.error(e?.response?.data?.message);
          setLoading(false);
        });
    }, 1500);
  };

  const validateForm = (): boolean => {
    toast.dismiss();

    setFormValid({
      email: true,
    });

    if (email == "") {
      toast.error("Please enter the email");
      setFormValid({ email: false });
      return false;
    }

    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      ) === false
    ) {
      toast.error("Please enter a valid email");
      setFormValid({ email: false });
      return false;
    }

    setFormValid({ email: true });
    return true;
  };

  return (
    <div>
      {loading && <LoadingBackdrop />}
      <h1>Welcome to Altigen</h1>
      <p className="sub-header">Please enter your valid email to proceed</p>
      <form action="#" method="POST">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <TextField
          type="email"
          name="email"
          className={!isFormValid.email ? "input-field error" : "input-field"}
          value={email}
          onChange={inputChange}
          placeholder="Email"
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
          Request
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
