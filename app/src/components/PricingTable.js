import React from "react";
import licenseServer from "../services/licenseServer";

class PricingTable extends React.Component {
  async handleClick() {
    let code = await licenseServer.createSession()
    console.log(code)
    const stripe = window.Stripe('pk_test_T7mLNhEI2PjHP95pAVXjTmKz00n4zAWGQ3');
    const {error} = await stripe.redirectToCheckout({
      sessionId: code.id
    })
    
  }

  render() {
    return (
      <section id="pricing" className="section home-pricing">
        <div className="wrap-ultra">
          <h3 className="section-name">Pricing</h3>

          <ul className="pricing-table active">
            <li>
              <div className="pricing-plan _most-popular">
                <div className="pricing-plan-popular _has-text">Limited</div>
                <div className="pricing-plan-name">Desktop Edition</div>
                <div className="pricing-plan-price">
                  <strong>€59</strong>
                </div>
                <div className="pricing-plan-features">
                  <p />
                  per user / year
                  <p />
                </div>
                <div className="pricing-plan-includes">
                  <div className="pricing-plan-additional">Includes</div>
                  <div className="pricing-plan-features">
                    <p>1 user</p>
                    <p>Unlimited app updates</p>
                    <p>Multi-OS license</p>
                    <p>
                      <strong>unlimited</strong> clusters
                    </p>
                    <p>
                      <strong>unlimited</strong> namespaces
                    </p>
                  </div>
                </div>
                <a onClick={() => this.handleClick()} className="btn btn-big">
                  Buy Now
                </a>
              </div>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}

export default PricingTable;
