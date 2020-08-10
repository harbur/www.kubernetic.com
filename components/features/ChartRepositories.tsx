import React from "react"

export default function ChartRepositories() {
  return (
    <section className="section app-features-reverse app-features">
      <div className="wrap-wide">
        <div className="app-features-image">
          <img
            src="/images/chart-repos.png"
            alt=""
            style={{ maxWidth: "700px" }}
          />
        </div>

        <div className="app-features-description">
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
  )
}
