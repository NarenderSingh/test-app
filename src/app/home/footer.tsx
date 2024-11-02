import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/themes-utils/images/auth-layout/logo.png";
import usamap from "@/themes-utils/images/home/usamap.png";
import { IFooterProps } from "../utils/interface/app-interface";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function Footer(props: IFooterProps) {
  return (
    <React.Fragment>
      <footer className="footer">
        <div className="footer-links">
          <div className="split-first">
            <div className="split-one">
              <Link href="https://www.altigen.com/" target="_blank">
                <Image src={logo} alt="companylogo" className="logo" />
              </Link>
            </div>
            <div className="split-two">
              <div className="social-media">
                <Link
                  href="https://www.facebook.com/people/AltiGen-Communications-Inc/100070896436853/"
                  target="_blank"
                >
                  <FacebookIcon color="action" className="img-footer" />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/altigen-technologies"
                  target="_blank"
                >
                  <LinkedInIcon color="action" className="img-footer" />
                </Link>
                <Link
                  href="https://www.youtube.com/@altigentechnologies"
                  target="_blank"
                >
                  <YouTubeIcon color="action" className="img-footer" />
                </Link>
              </div>
              <div className="language">
                <Image src={usamap} alt="usa map" className="usa-map" />
                <label>English</label>
              </div>
            </div>
          </div>
          <div className="split-second anchor-footer">
            <div>
              <h4>Company</h4>
              <p>
                <Link
                  href="https://www.altigen.com/who-we-are/"
                  target="_blank"
                >
                  About Us
                </Link>
              </p>
              <p>
                <Link
                  href=" https://www.altigen.com/careers-2-0/"
                  target="_blank"
                >
                  Careers
                </Link>
              </p>
              <p>
                <Link
                  href="https://www.altigen.com/?post_type=post"
                  target="_blank"
                >
                  Blog
                </Link>
              </p>
              <p>
                <Link
                  href="https://www.altigen.com/investor-relations-2/#recent-press-releases"
                  target="_blank"
                >
                  Press
                </Link>
              </p>
            </div>
            <div>
              <h4>Product</h4>
              <p className="anchor-product" onClick={props.onScrollToPricing}>
                Core Insight IVR
              </p>
            </div>
            <div>
              <h4>Resources</h4>
              <p>
                <Link
                  href="https://www.altigen.com/privacy-policy-2-0/"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
              </p>
              <p>
                <Link href="https://www.altigen.com/terms-2-0/" target="_blank">
                  Terms
                </Link>
              </p>
              <p>
                <Link
                  href="https://www.altigen.com/security-2-0/"
                  target="_blank"
                >
                  Security
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}
