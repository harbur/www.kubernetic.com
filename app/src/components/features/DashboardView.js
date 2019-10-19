import React from "react";

function DashboardView() {
  return (
    <section className="section app-features">
      <div className="wrap-wide">
        <div className="app-features-image">
          <img
            src="/assets/images/dashboard.png"
            alt="dashboard view"
            style={{ maxWidth: "700px" }}
          />
        </div>

        <div className="app-features-description">
          <h2>Dashboard view</h2>

          <ul>
            <li>Real time counters of the objects in Kubernetes</li>
            <li>Ideal for Wall or second screen displays</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default DashboardView;
