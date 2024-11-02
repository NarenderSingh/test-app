"use client";

import { useState } from "react";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";
import Link from "next/link";

import LoadingBackdrop from "@/app/component/backdrop";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";

export default function SingUpValidationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isFormValid, setFormValid] = useState(true);

  const inputChange = (e: any) => {
    const value = e?.target.value;
    setSearch(value);
  };

  const onSubmitOtp = () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(true);
      if (search !== "Barcleys Bank") {
        toast.error("Invalid RSSDID");
        setLoading(false);
        return;
      }

      setLoading(false);
      toast.success("Valid RSSDID");
      setTimeout(() => {
        router.push("/auth/signup");
      }, 500);
    }, 2000);
  };

  const validateForm = (): boolean => {
    toast.dismiss();
    setFormValid(false);

    if (search == "") {
      toast.error("Please enter the RSSID");
      setFormValid(false);
      return false;
    }

    setFormValid(true);
    return true;
  };

  return (
    <div>
      {loading && <LoadingBackdrop />}
      <h1>Setup your account</h1>
      <p className="sub-header">
        We suggest using the email address you use at work
      </p>

      <form>
        <label className="form-label">RSSDID</label>
        <TextField
          type="text"
          name="rssdid"
          className={isFormValid == false ? "input-field error" : "input-field"}
          value={search}
          onChange={inputChange}
          placeholder="RSSDID"
          required
          fullWidth
        />

        <LoadingButton
          size="medium"
          onClick={onSubmitOtp}
          loading={loading}
          loadingPosition="start"
          variant="contained"
          fullWidth
        >
          Search
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
