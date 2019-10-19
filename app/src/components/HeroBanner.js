import React from "react";
import { OutboundLink } from "react-ga";
import ReactGA from "react-ga";
import { Link } from "react-router-dom";

function Headers() {
  return (
    <div>
            <header className="welcome">

<nav className="topbar">
  <Link to="/" className="topbar-logo">
    Kubernetic
  </Link>

  <div className="topbar-menu">
    <div className="topbar-menu-additional">
      <a href="#pricing">Pricing</a>
      <a href="http://docs.kubernetic.com/">Documentation</a>
    </div>
  </div>
</nav>
</header>

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
            to="https://kubernetic.s3.amazonaws.com/Kubernetic-2.4.1.dmg"
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
                  to="https://kubernetic.s3.amazonaws.com/Kubernetic-2.4.1.dmg"
                >
                  {" "}
                  Mac OS
                </ReactGA.OutboundLink>{" "}
                ,
                <ReactGA.OutboundLink
                  className="fa fa-linux"
                  eventLabel="download linux"
                  to="https://kubernetic.s3.amazonaws.com/Kubernetic-2.4.1.tar.gz"
                >
                  {" "}
                  Linux
                </ReactGA.OutboundLink>{" "}
                ,
                <ReactGA.OutboundLink
                  className="fa fa-windows"
                  eventLabel="download win"
                  to="https://kubernetic.s3.amazonaws.com/Kubernetic+Setup+2.4.1.exe"
                >
                  {" "}
                  Windows
                </ReactGA.OutboundLink>
              </i>
            </small>
          </p>
        </div>
      </div>
    </header>
    </div>
  );
}

export default Headers;
