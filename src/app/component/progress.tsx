import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function LoadingProgress() {
  return (
    <Box sx={{ width: "100%", color: "#007bff" }}>
      <LinearProgress />
    </Box>
  );
}
