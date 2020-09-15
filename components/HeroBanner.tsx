import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";
import ReactGA, { OutboundLink } from "react-ga";

export default function HeroBanner() {
  return (
    <header className="welcome">
      <div className="welcome-content">
        <div className="welcome-sentence">
          <h1>The Kubernetes Desktop Client</h1>
          <p>Cluster management, simplified.</p>
        </div>

        <div className="welcome-buttons">
          <OutboundLink
            className="btn btn-big"
            eventLabel="download mac"
            to="https://kubernetic.s3.amazonaws.com/Kubernetic-2.12.0.dmg"
          >
            Download Now
          </OutboundLink>
          <p>
            <small>
              <i>
                Or choose to download for your platform:
                <ReactGA.OutboundLink
                  className="fa fa-apple"
                  eventLabel="download mac"
                  to="https://kubernetic.s3.amazonaws.com/Kubernetic-2.12.0.dmg"
                >
                  {" "}
                  <FontAwesomeIcon icon={['fab', 'apple']} />
                  {" "}
                  Mac OS
                </ReactGA.OutboundLink>{" "}
                ,
                <ReactGA.OutboundLink
                  eventLabel="download linux"
                  to="https://kubernetic.s3.amazonaws.com/Kubernetic-2.12.0.tar.gz"
                >
                  {" "}
                  <FontAwesomeIcon icon={['fab', 'linux']} />
                  {" "}
                  Linux
                </ReactGA.OutboundLink>{" "}
                ,
                <ReactGA.OutboundLink
                  className="fa fa-windows"
                  eventLabel="download win"
                  to="https://kubernetic.s3.amazonaws.com/Kubernetic+Setup+2.12.0.exe"
                >
                  {" "}
                  <FontAwesomeIcon icon={['fab', 'windows']} />
                  {" "}
                  Windows
                </ReactGA.OutboundLink>
              </i>
            </small>
          </p>
        </div>
      </div>
    </header>
  )
}
