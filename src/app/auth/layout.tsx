"use client";

import Image from "next/image";
import logo from "@/themes-utils/images/auth-layout/logo.png";
import mask from "@/themes-utils/images/auth-layout/mask_user.png";
import { Suspense } from "react";
import { CookiesProvider } from "react-cookie";
import Link from "next/link";
import Loading from "../loading";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <div className="container">
        <div className="left">
          <div className="login-box">
            <div className="company-logo">
              <Link href="/">
                <Image src={logo} alt="company logo" />
              </Link>
            </div>

            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
        </div>
        <div className="right">
          <div className="info">
            <Image src={mask} alt="mask user" />
            <h2>Josh Brollins</h2>
            <p className="info-title">Operations Manager</p>
            <p>
              CoreInsights has completely transformed the way we understand our
              IVR call data. The insights are clear, actionable, and have helped
              us optimize our customer interactions in ways we hadn&apos;t
              imagined. We&apos;ve reduced call times and improved satisfaction
              almost immediately after implementing the software.
            </p>
          </div>
          <div className="pattern"></div>
        </div>
      </div>
    </CookiesProvider>
  );
}
