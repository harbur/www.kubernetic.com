import React from "react";

function Headers() {
  return (
    <header className="welcome">
      <nav className="topbar">
        <a href="https://kubernetic.com/" className="topbar-logo">
          Kubernetic
        </a>

        <div className="topbar-menu">
          <div className="topbar-menu-additional">
            <a href="#pricing">Pricing</a>
            <a href="http://docs.kubernetic.com/">Documentation</a>
          </div>
        </div>
      </nav>
      <div className="welcome-content">
        <div className="welcome-sentence">
          <h1>The Kubernetes Desktop Client</h1>
          <p>Cluster management, simplified.</p>
        </div>

        <div className="welcome-buttons">
          <a href="https://kubernetic.s3.amazonaws.com/Kubernetic-2.4.1.dmg" className="btn btn-big">
            Download Now
          </a>
          <p>
            <small>
              <i>
                Or choose to download for your platform:
                <a href="https://kubernetic.s3.amazonaws.com/Kubernetic-2.4.1.dmg" className="fa fa-apple">
                  {" "}
                  Mac OS
                </a>{" "}
                ,
                <a href="https://kubernetic.s3.amazonaws.com/Kubernetic-2.4.1.tar.gz" className="fa fa-linux">
                  {" "}
                  Linux
                </a>{" "}
                ,
                <a href="https://kubernetic.s3.amazonaws.com/Kubernetic+Setup+2.4.1.exe" className="fa fa-windows">
                  {" "}
                  Windows
                </a>
              </i>
            </small>
          </p>
        </div>
      </div>
    </header>
  );
}

export default Headers;
