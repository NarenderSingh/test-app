import React from "react";
import AddIcon from "@mui/icons-material/Add";

export default function Faq() {
  return (
    <React.Fragment>
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-label">
          Please see these most commonly asked questions about the product.
        </div>
        <div className="faq-list">
          <div className="faq-item">
            <p>
              <b className="faq-question">
                Will CoreInsights integrate with my banks core systems?
              </b>
              <span>
                Yes, we are currently integrated with most major banking cores
                and are ready to work with your team for any custom integrations
                that we don&apos;t currently have available.
              </span>
              <AddIcon className="add-icon" />
            </p>
          </div>
          <div className="faq-item">
            <p>
              <b className="faq-question">
                We have a 3rd Party IVR. Can we use CoreInsights?
              </b>
              <span>
                Probably, we have extensive knowledge of voice based IVRs and
                our team of engineers are available to work with 3rd parties to
                connect to your IVR.
              </span>
              <AddIcon className="add-icon" />
            </p>
          </div>
          <div className="faq-item">
            <p>
              <b className="faq-question">
                What is my RSSDID and is it required?
              </b>
              <span>
                All financial institutions in the US have been assigned a RSSDID
                and should be available from your executive team. We maintain a
                list of those IDs on our end to validate that you are truly a
                registered financial entity. We require this to keep our systems
                secure and free from spammers and attackers.
              </span>
              <AddIcon className="add-icon" />
            </p>
          </div>
          <div className="faq-item">
            <p>
              <b className="faq-question">
                Will there be an enterprise wide license we can acquire?
              </b>
              <span>
                Yes, if you are a larger organization and paying for individual
                accounts doesn&apos;t fit, reach out to our sales team for a
                model that will work for you.
              </span>
              <AddIcon className="add-icon" />
            </p>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
