import React from "react";

function BirdsEye() {
  return (
    <section className="section app-features">
      <div className="wrap-wide">
        <div className="app-features-image">
          <img
            src="/assets/images/deployment-nginx.png"
            alt="deployment process of nginx"
            style={{maxWidth: '700px'}}
          />
        </div>

        <div className="app-features-description">
          <h2>Bird's eye view of the Cluster state</h2>

          <ul>
            <li>
              One screen to view all the related cluster's objects and their
              dependencies
            </li>
            <li>
              Red/Green ready-state for all objects to provide a quick health
              check view
            </li>
            <li>
              Quick action buttons to facilitate deletion or scaling of the
              application
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default BirdsEye;
