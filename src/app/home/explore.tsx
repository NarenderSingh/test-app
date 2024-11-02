import React from "react";
import Image from "next/image";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import rectangle from "@/themes-utils/images/home/rectangle.png";
import mask_demo from "@/themes-utils/images/home/mask_demo.png";

export default function Explore() {
  return (
    <React.Fragment>
      <section className="explores">
        <div className="explore">
          <div className="card">
            <div className="split-first">
              <Image src={mask_demo} alt="mask user" />
            </div>
            <div className="split-second">
              <p>
                <a href="#">
                  <strong>SCHEDULE DEMO</strong>
                  <ArrowRightAltIcon />
                </a>
              </p>
              <p>
                <span>
                  Ready to see our software in action? Connect with our sales
                  team for a personalized demo and learn how our insights can
                  transform your business. (this should go to a form to fill out
                  with name, email and optional phone number that sends an email
                  to our sales team)
                </span>
              </p>
            </div>
          </div>

          <div className="card">
            <div className="split-first">
              <Image src={rectangle} alt="mask user" />
            </div>
            <div className="split-second">
              <p>
                <a href="#">
                  <strong>EXPLORE THE SANDBOX</strong>
                  <ArrowRightAltIcon />
                </a>
              </p>
              <p>
                <span>
                  Sign up today and you will be able to interact with our sample
                  sandbox data at no obligation for 30 days. See reports and
                  samples before you connect to your production data sources and
                  experience the value of the CoreInsights today! (this should
                  just take them to sign up.)
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
