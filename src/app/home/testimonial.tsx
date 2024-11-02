import React from "react";
import Image from "next/image";
import mask_user_1 from "@/themes-utils/images/home/mask_user_1.png";
import mask_user_2 from "@/themes-utils/images/home/mask_user_2.png";
import metro_quote_up from "@/themes-utils/images/home/metro_quote_up.png";
import metro_quote_down from "@/themes-utils/images/home/metro_quote_down.png";

export default function Testimonial() {
  return (
    <React.Fragment>
      <section className="testimonials">
        <h2>Testimonials</h2>
        <div className="testimonails-label">
          Financial executives and fintech experts agree that CoreInsights
          provides the most comprehensive views into your customers than any
          product on the market. Below are a few examples of what they had to
          say.
        </div>
        <div className="testimonial">
          <Image
            className="img-quote-down"
            src={metro_quote_down}
            alt="metro quote"
          />
          <div className="card">
            <p>
              <Image src={mask_user_1} alt="mask user" />
              <strong>Jeremiah Fleming - CEO</strong>
            </p>
            <p>
              CoreInsights has provided us with unprecedented insights into our
              customers&apos; behavior, intents and experiences.
            </p>
          </div>
          <Image
            className="img-quote-up"
            src={metro_quote_up}
            alt="metro quote"
          />

          <Image
            className="img-quote-down"
            src={metro_quote_down}
            alt="metro quote"
          />
          <div className="card">
            <p>
              <Image src={mask_user_2} alt="mask user" />
              <strong>Deb Davis - Fiserv</strong>
            </p>
            <p>
              We have 1000s of Banks and Credit Unions using our IVR. We have
              never seen a better product for providing truly valuable and
              actionable insights into what our users experience is. (pending
              approval or change)
            </p>
          </div>
          <Image
            className="img-quote-up"
            src={metro_quote_up}
            alt="metro quote"
          />
        </div>
      </section>
    </React.Fragment>
  );
}
