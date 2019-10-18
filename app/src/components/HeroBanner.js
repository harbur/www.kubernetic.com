import React from "react";

function Headers() {
  return (
    <header class="welcome">
      <nav class="topbar">
        <a href="https://kubernetic.com/" class="topbar-logo">
          Kubernetic
        </a>

        <div class="topbar-menu">
          <div class="topbar-menu-additional">
            <a href="#pricing">Pricing</a>
            <a href="http://docs.kubernetic.com/">Documentation</a>
          </div>
        </div>
      </nav>
      <div class="welcome-content">
        <div class="welcome-sentence">
          <h1>The Kubernetes Desktop Client</h1>
          <p>Cluster management, simplified.</p>
        </div>

        <div class="welcome-buttons">
          <a href="https://kubernetic.s3.amazonaws.com/Kubernetic-2.4.1.dmg" class="btn btn-big">
            Download Now
          </a>
          <p>
            <small>
              <i>
                Or choose to download for your platform:
                <a href="https://kubernetic.s3.amazonaws.com/Kubernetic-2.4.1.dmg" class="fa fa-apple">
                  {" "}
                  Mac OS
                </a>{" "}
                ,
                <a href="https://kubernetic.s3.amazonaws.com/Kubernetic-2.4.1.tar.gz" class="fa fa-linux">
                  {" "}
                  Linux
                </a>{" "}
                ,
                <a href="https://kubernetic.s3.amazonaws.com/Kubernetic+Setup+2.4.1.exe" class="fa fa-windows">
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
