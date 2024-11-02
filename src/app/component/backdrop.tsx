import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingBackdrop() {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#007bff", zIndex: theme.zIndex.drawer + 1 })}
      open={true}
    >
      <CircularProgress />
    </Backdrop>
  );
}
