import React from "react"

export default function ManageNamespaces() {
  return (
    <section className="section app-features app-features-reverse section-dark">
      <div className="wrap-wide">
        <div className="app-features-image">
          <img
            src="/images/namespaces.png"
            alt="view and creation process of namespaces"
            style={{ maxWidth: "700px" }}
          />
        </div>

        <div className="app-features-description">
          <h2>Easy Namespace Management</h2>

          <ul>
            <li>Manage your namespaces easily through the UI</li>
            <li>Instant switch of current namespace on the top menu.</li>
            <li>
              Possibility to switch to aggregate view of
              <i>All</i> namespaces
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
