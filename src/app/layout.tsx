"use client";

import { baselightTheme } from "@/themes-utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "./global.css";
import "react-toastify/dist/ReactToastify.css";

export default function RootAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={baselightTheme}>{children}</ThemeProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </body>
    </html>
  );
}
