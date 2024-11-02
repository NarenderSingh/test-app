"use client";

import { useRef } from "react";
import Header from "./header";
import Feature from "./feature";
import Pricing from "./pricing";
import Testimonial from "./testimonial";
import Faq from "./faq";
import Explore from "./explore";
import Footer from "./footer";

export default function HomePage() {
  const ref = useRef(null);

  const onScrollToPricing = () => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container-home">
      <Header />
      <Feature />
      <div ref={ref}>
        <Pricing />
      </div>
      <Testimonial />
      <Faq />
      <Explore />
      <Footer onScrollToPricing={onScrollToPricing} />
    </div>
  );
}
