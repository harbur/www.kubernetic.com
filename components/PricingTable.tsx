import React from "react";
import { Button, Divider, Form, FormGroup } from "semantic-ui-react";
import getStripe from "@utils/stripe/getStripe";
import licenseServer from "@utils/services/licenseServer";

export default function PricingTable() {
  const [licenses, updateLicenses] = React.useState(1)
  async function handleClick(licenses: number) {
    const stripe = await getStripe()
    let code = await licenseServer.createSession(licenses)
    await stripe!.redirectToCheckout({
      sessionId: code.id
    })
  }


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
                <strong><s style={{ color: "#a6a6a6" }}>€60</s></strong><br />
                <strong>€30</strong>
              </div>
              <div className="pricing-plan-features">
                <p />
                  one time fee
                  <p />
                <p>EARLY BIRD</p>
              </div>
              <div className="pricing-plan-includes">
                <div className="pricing-plan-additional">Includes</div>
                <div className="pricing-plan-features">
                  <p>1 user</p>
                  <p>unlimited app updates</p>
                  <p>multi-OS license</p>
                  <p>
                    <strong>unlimited</strong> clusters
                    </p>
                  <p>
                    <strong>unlimited</strong> namespaces
                    </p>
                </div>
              </div>
              <FormGroup>
                <Divider hidden />
                <label>Licenses</label>
                <Form.Input
                  width={2}
                  min={1}
                  defaultValue={1}
                  type="number"
                  onChange={e => updateLicenses(Number(e.target.value))}
                />
                <Divider hidden />
              </FormGroup>
              <Button onClick={() => handleClick(licenses)} className="btn btn-big">
                Buy Now
                </Button>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
