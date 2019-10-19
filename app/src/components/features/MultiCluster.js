import React from "react";

function MultiCluster() {
  return (
    <section className="section app-features">
      <div className="wrap-wide">
        <div className="app-features-image">
          <img src="/assets/images/clusters.png" alt="manage multiple contexts of kubeconfig" style={{ maxWidth: "700px" }} />
        </div>

        <div className="app-features-description">
          <h2>Multiple Clusters support</h2>

          <ul>
            <li>No configuration needed, just point and connect.</li>
            <li>
              Uses your
              <i>
                <code> ~/.kube/config </code>
              </i>
              file for authentication.
            </li>
            <li>
              If you have
              <i>
                <code> kubectl </code>
              </i>
              working, then Kubernetic will be up and running in no time.
            </li>
            <li>
              Syncs current cluster between Kubernetic and
              <i>
                <code> kubectl </code>
              </i>
              so you can use both at any time.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default MultiCluster;
