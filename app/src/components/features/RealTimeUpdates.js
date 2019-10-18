import React from "react";

function RealTimeUpdates() {
  return (
    <section class="section section-dark app-features-reverse app-features">
      <div class="wrap-wide">
        <div class="app-features-image">
          <img
            src="assets/images/deployment-update-version.png"
            alt="update a deployment version and see results on real-time"
            style={{ maxWidth: "700px" }}
          />
        </div>

        <div class="app-features-description">
          <h2>Real Time updates</h2>

          <ul>
            <li>Get real-time updates of the state of your cluster</li>
            <li>
              See the evolution of your cluster as it changes the actual state
              to meet desired state of cluster
            </li>
            <li>
              Pin-point possible issues of downtime throughout application
              upgrade process, by getting eyes on-site
            </li>
            <li>
              Training of developers / ops is much easier when they can see the
              actual process
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default RealTimeUpdates;
