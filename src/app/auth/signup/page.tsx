"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IUserRegister } from "@/app/utils/interface/app-interface";
import { userService } from "@/app-service/user/user-service";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Tooltip from "@mui/material/Tooltip";
import LoadingBackdrop from "@/app/component/backdrop";

export default function SingUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isFormValid, setFormValid] = useState({
    first_name: true,
    email: true,
    password: true,
  });

  const [user, setUser] = useState<IUserRegister>({
    rssd_id: 3,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const inputChange = (e: any) => {
    const value = e?.target.value;
    const field = e?.target.name;

    setUser({
      ...user,
      [field]: value,
    });
  };

  const onSignUp = () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      userService.addUser(user).then((d) => {
        console.log(d);
        setLoading(true);
        toast.success("Account created successfully. Please login");
        router.push("/auth/signin");
      });
      setLoading(false);
    }, 1500);
  };

  const validateForm = (): boolean => {
    toast.dismiss();

    if (user.first_name == "") {
      toast.error("Please enter the First Name");
      setFormValid({ ...isFormValid, first_name: false });
      return false;
    }

    if (user.email == "") {
      toast.error("Please enter the Email");
      setFormValid({ ...isFormValid, first_name: true, email: false });
      return false;
    }

    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        user.email
      ) === false
    ) {
      toast.error("Please enter a valid email");
      setFormValid({ ...isFormValid, first_name: true, email: false });
      return false;
    }

    if (user.password == "") {
      toast.error("Please enter the Password");
      setFormValid({
        ...isFormValid,
        first_name: true,
        email: true,
        password: false,
      });
      return false;
    }

    setFormValid({
      first_name: true,
      email: true,
      password: true,
    });
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
        <Tooltip title="RSSDID is disabled">
          <span>
            <TextField
              type="text"
              name="rssdid"
              className={"input-field"}
              // value={user.rssd_id}
              // onChange={inputChange}
              placeholder="Barcleys Bank"
              required
              disabled
              fullWidth
            />
          </span>
        </Tooltip>

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
        <label className="form-label">Last Name</label>
        <TextField
          type="text"
          name="last_name"
          className={"input-field"}
          value={user.last_name}
          onChange={inputChange}
          placeholder="Last Name"
          fullWidth
        />
        <label className="form-label">Email</label>
        <TextField
          type="email"
          name="email"
          className={!isFormValid.email ? "input-field error" : "input-field"}
          value={user.email}
          onChange={inputChange}
          placeholder="Email"
          required
          fullWidth
        />
        <label className="form-label">Phone</label>
        <TextField
          type="text"
          name="phone"
          className={"input-field"}
          value={user.phone}
          onChange={inputChange}
          placeholder="Phone"
          fullWidth
        />
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
          fullWidth
        />
        {/* <div className="weak-password">Very weak</div> */}
        <LoadingButton
          size="medium"
          onClick={onSignUp}
          loading={loading}
          loadingPosition="start"
          variant="contained"
          fullWidth
        >
          Sign Up
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
