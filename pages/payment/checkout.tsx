import Footer from '@components/Footer';
import { HeaderSolid } from '@components/Header';
import Layout from '@components/layouts/Layout';
import licenseServer from '@utils/services/licenseServer';
import getStripe from '@utils/stripe/getStripe';
import React, { useState } from "react";
import { Form } from 'semantic-ui-react';

export default function Checkout() {
  const [licenses, updateLicenses] = useState(1)
  async function handleClick(licenses: number) {
    const stripe = await getStripe()
    let code = await licenseServer.createSession(licenses)
    await stripe!.redirectToCheckout({
      sessionId: code.id
    })
  }

  return (
    <Layout>
      <HeaderSolid />
      <div className="pt-40 pb-10">
        <Form>
          <div className="pl-20 pr-20 md:pl-64 md:pr-64 divider divide-y">
            <h4>Your Order</h4>
            <ul className="p-4">
              <div className="float-right text-gray-700">€ 30</div>
              <h5 className="italic">Kubernetic Desktop License</h5>
              <div className="block">
                <Form.Input
                  size="mini"
                  className="float-right w-20"
                  min={1}
                  defaultValue={1}
                  type="number"
                  onChange={e => updateLicenses(Math.abs(Number((e.target.value))))}
                />

                <div className="flex-grow pt-2">Update Quantity</div>
              </div>
            </ul>
            <div className="block p-4">
              <h4 className="float-right text-gray-700">€ {licenses * 30}</h4>
              <h4 className="italic">Total</h4>
            </div>
            <div className="pt-20 pb-20">
              <button className="btn btn-blue btn-popup float-right rounded py-3 px-8" onClick={() => handleClick(licenses)} >
                Next
            </button>
            </div>
          </div>
        </Form>
        <div className="md:pt-20 pt-12 pl-4 pr-4 text-center italic font-light text-gray-700 text-sm">
          We use industry-standard encryption to protect the confidentiality of your personal information.
          This purchase and product fulfillment are through Stripe, a trusted reseller for https://kubernetic.com.
        </div>
      </div>
      <Footer />
    </Layout>
  )
}
