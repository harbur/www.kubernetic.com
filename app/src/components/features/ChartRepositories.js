import React from "react";

function ChartRepositories() {
  return (
    <section class="section app-features-reverse app-features">
      <div class="wrap-wide">
        <div class="app-features-image">
          <img
            src="assets/images/chart-repos.png"
            alt=""
            style={{ maxWidth: "700px" }}
          />
        </div>

        <div class="app-features-description">
          <h2>Chart Repositories Support</h2>

          <ul>
            <li>
              Fully compatible with{" "}
              <a target="_new" href="https://helm.sh/">
                Helm
              </a>{" "}
              Chart Repositories
            </li>
            <li>Public & Private Repositories support</li>
            <li>One Click install process for the Charts</li>
            <li>Manage Chart releases on the cluster through Kubernetic</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ChartRepositories;
