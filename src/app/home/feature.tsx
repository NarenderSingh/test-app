import React from "react";
import Image from "next/image";
import finger from "@/themes-utils/images/home/finger.png";
import user from "@/themes-utils/images/home/user.png";
import dot from "@/themes-utils/images/home/dot.png";

export default function Feature() {
  return (
    <React.Fragment>
      <section className="features">
        <h2>Product Features</h2>
        <div className="features-label">
          Today’s Customer Engagement analytics and reporting solutions are
          narrowly focused on transactional data showing. What happened and When
          it happened, but not “Who” it happened to. Without knowing Who (the
          Bank/ CU customer), traditional analytics are only somewhat insightful
          and certainly not actionable
        </div>
        <div className="features-view">
          <div className="feature-view">
            <p>
              <b>64+</b> <span>Detailed Views</span>
            </p>
            <p>
              <b>1000s</b> <span>Possible Recommendations</span>
            </p>
          </div>
          <div className="feature-view">
            <p>
              <b>4</b> <span>Focused Applications</span>
            </p>
            <p>
              <b>1</b> <span>AI Consulting Team</span>
            </p>
          </div>
        </div>
        <div className="cards">
          <div className="card">
            <Image src={finger} alt="finger" className="feature-card-img" />
            <h3>Self-Serve</h3>
            <p>
              CoreInsights self service portal allows Bank and Credit Union
              executives to easy access all the relevant tools, reports and AI
              in a simple and easy to use interface.
            </p>
          </div>
          <div className="card">
            <Image src={dot} alt="dot" className="feature-card-img" />
            <h3>Cores</h3>
            <p>
              CoreInsights has access to most banking cores to provide the most
              relevant customer profile data in real-time for more accurate
              insights.
            </p>
          </div>
          <div className="card">
            <Image src={user} alt="user" className="feature-card-img" />
            <h3>Cloud</h3>
            <p>
              Delivered over the cloud, CoreInsights always keeps your data
              secure and protected.
            </p>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
