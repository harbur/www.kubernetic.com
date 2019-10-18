import React from "react";

function PricingTable() {
  return (
    <section id="pricing" class="section home-pricing">
      <div class="wrap-ultra">
        <h3 class="section-name">Pricing</h3>

        <ul class="pricing-table active">
          <li>
            <div class="pricing-plan _most-popular">
              <div class="pricing-plan-popular _has-text">Limited</div>
              <div class="pricing-plan-name">Desktop Edition</div>
              <div class="pricing-plan-price">
                <strong>€59</strong>
              </div>
              <div class="pricing-plan-features">
                <p />
                per user / year
                <p />
              </div>
              <div class="pricing-plan-includes">
                <div class="pricing-plan-additional">Includes</div>
                <div class="pricing-plan-features">
                  <p>
                  1 user
                  </p>
                  <p>
                  Unlimited app updates
                  </p>
                  <p>
                  Multi-OS license
                  </p>
                  <p>
                    <strong>unlimited</strong> clusters
                  </p>
                  <p>
                    <strong>unlimited</strong> namespaces
                  </p>
                </div>
              </div>
              <a href="" class="btn btn-big">
                Buy Now
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default PricingTable;
