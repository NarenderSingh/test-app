import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function Pricing() {
  return (
    <React.Fragment>
      <section className="pricing">
        <h2>Pricing</h2>
        <div>
          <ButtonGroup className="btn-group-pricing" variant="contained">
            <Button>Monthly</Button>
            <Button variant="outlined">Yearly</Button>
          </ButtonGroup>
        </div>
        <div className="plans">
          <div className="plan recommended">
            <span className="plan-recommended">RECOMMENDED</span>
            <h3>Core Insight IVR</h3>
            <p>
              <span className="amount-sign">$</span>
              <span className="amount">500</span> <span>/mo</span>
            </p>
            <ul>
              <li>
                <CheckCircleOutlineIcon
                  fontSize="small"
                  sx={{ color: "lightgreen" }}
                />
                <span>Integration to your IVR</span>
              </li>
              <li>
                <CheckCircleOutlineIcon
                  fontSize="small"
                  sx={{ color: "lightgreen" }}
                />
                <span>Connected Banking Core</span>
              </li>
              <li>
                <CheckCircleOutlineIcon
                  fontSize="small"
                  sx={{ color: "lightgreen" }}
                />
                <span>Includes CoreInsights AI</span>
              </li>
            </ul>
            <div className="plan-footer plan-recommended-footer">
              <Button variant="outlined">SIGN UP TODAY</Button>
            </div>
          </div>
          <div className="plan">
            <h3>Coming soon</h3>
            <p>
              <span className="amount-sign">$</span>
              <span className="amount">500</span> <span>/mo</span>
            </p>
            <ul>
              <li>
                <CheckCircleOutlineIcon
                  fontSize="small"
                  sx={{ color: "lightgreen" }}
                />
                <span>Integration to your IVR</span>
              </li>
              <li>
                <CheckCircleOutlineIcon
                  fontSize="small"
                  sx={{ color: "lightgreen" }}
                />
                <span>Connected Banking Core</span>
              </li>
              <li>
                <CheckCircleOutlineIcon
                  fontSize="small"
                  sx={{ color: "lightgreen" }}
                />
                <span>Includes CoreInsights AI</span>
              </li>
            </ul>
            <div className="plan-footer">
              <Button variant="outlined">SIGN UP NOW</Button>
            </div>
          </div>
          <div className="plan">
            <h3>Coming soon</h3>
            <p>
              <span className="amount-sign">$</span>
              <span className="amount">500</span> <span>/mo</span>
            </p>
            <ul>
              <li>
                <CheckCircleOutlineIcon
                  fontSize="small"
                  sx={{ color: "lightgreen" }}
                />
                <span>Integration to your IVR</span>
              </li>
              <li>
                <CheckCircleOutlineIcon
                  fontSize="small"
                  sx={{ color: "lightgreen" }}
                />
                <span>Connected Banking Core</span>
              </li>
              <li>
                <CheckCircleOutlineIcon
                  fontSize="small"
                  sx={{ color: "lightgreen" }}
                />
                <span>Includes CoreInsights AI</span>
              </li>
            </ul>
            <div className="plan-footer">
              <Button variant="outlined">SIGN UP NOW</Button>
            </div>
          </div>
          <div className="plan">
            <h3>Coming soon</h3>
            <p>
              <span className="amount-sign">$</span>
              <span className="amount">500</span> <span>/mo</span>
            </p>
            <ul>
              <li>
                <CheckCircleOutlineIcon
                  fontSize="small"
                  sx={{ color: "lightgreen" }}
                />
                <span>Integration to your IVR</span>
              </li>
              <li>
                <CheckCircleOutlineIcon
                  fontSize="small"
                  sx={{ color: "lightgreen" }}
                />
                <span>Connected Banking Core</span>
              </li>
              <li>
                <CheckCircleOutlineIcon
                  fontSize="small"
                  sx={{ color: "lightgreen" }}
                />
                <span>Includes CoreInsights AI</span>
              </li>
            </ul>
            <div className="plan-footer">
              <Button variant="outlined">SIGN UP NOW</Button>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
