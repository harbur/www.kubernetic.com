import Footer from '@components/Footer';
import { HeaderSolid } from '@components/Header';
import Layout from '@components/layouts/Layout';
import licenseServer from '@utils/services/licenseServer';
import getStripe from '@utils/stripe/getStripe';
import React, { useEffect, useMemo, useState } from "react";
import { Form } from 'semantic-ui-react';
import CountryField from './components/CountryField';

export default function Checkout() {
  const [licenses, updateLicenses] = useState(1)
  const [country, updateCountry] = useState<string>("")
  const [taxID, updateTaxID] = useState("")
  const [subtotal, updateSubtotal] = useState(0)
  const [taxPercent, updateTaxPercent] = useState(21)
  const [tax, updateTax] = useState<number>(0)
  const [total, updateTotal] = useState<number>(0)
  const [showTaxID, updateShowTaxID] = useState(false)
  const [clicked, setClicked] = useState(false)
  async function handleClick() {
    setClicked(true)
    if (invalidTaxID !== "") return
    const stripe = await getStripe()
    var code: any
    if (!isEuropeanCountry(country)) {
      code = await licenseServer.createSession(licenses, "", country)
    }
    code = await licenseServer.createSession(licenses, taxID, country)
    await stripe!.redirectToCheckout({ sessionId: code.id })
  }

  // Calculate showTaxID
  useEffect(() => {
    updateShowTaxID(isEuropeanCountry(country))
    updateTaxID("")
  }, [country])

  // Calculate Subtotal
  useEffect(() => {
    updateSubtotal(licenses * 60)
  }, [licenses])

  // Calculate TaxPercent
  useEffect(() => {
    // On Spain Tax is not excluded, so we collect 21%
    if (country === "Spain") {
      updateTaxPercent(21)
      return
    }
    // For personal Licenses (without TAX ID), we collect 21%
    if (taxID === "") {
      updateTaxPercent(21)
      return
    }
    // For valid TAX IDs, we don't collect, otherwise we collect 21%
    if (invalidTaxID === "") {
      updateTaxPercent(0)
    } else {
      updateTaxPercent(21)
    }
  }, [country, taxID])

  // Calculate Tax
  useEffect(() => {
    updateTax(subtotal * taxPercent / 100)
  }, [subtotal, taxPercent])

  // Calculate Total
  useEffect(() => {
    updateTotal(subtotal + tax)
  }, [subtotal, tax])

  // Calculate if TaxID is invalid
  const invalidTaxID = useMemo(() => {
    if (taxID.length > 0 && taxID.length < 9) {
      return "This tax ID is invalid."
    }
    return ""
  }, [taxID])

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(response => {
        updateCountry(response.country_name)
      })
  }, [])

  return (
    <Layout title="Payment Checkout">
      <HeaderSolid />
      <div className="pt-40 pb-10">
        <Form>
          <div className="pl-20 pr-20 md:px-32 lg:px-64 divider divide-y">
            <div>
              <CountryField value={country} onChange={updateCountry} />
              <h4>Your Order</h4>
            </div>
            <ul className="p-4">
              <div className="float-right text-gray-700">€ 60.00</div>
              <h5 className="italic">Kubernetic Desktop License</h5>
              <LicensesField value={licenses} onChange={updateLicenses} />
            </ul>
            <div className="block p-4">
              <SubtotalSum licenses={licenses} />
              <TaxSum taxPercent={taxPercent} tax={tax} />
              {showTaxID && <TaxIDField value={taxID} onChange={updateTaxID} invalidTaxID={invalidTaxID} />}
              <TotalSum total={total} />
            </div>
            <div className="pt-20 pb-20">
              <button className={`btn btn-blue btn-popup float-right rounded py-3 px-8 w-40 ${invalidTaxID !== "" ? "opacity-50" : ""}`} disabled={invalidTaxID !== ""} onClick={handleClick} >
                {clicked ? "Loading..." : "Next"}
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

function TaxIDField({ value, onChange, invalidTaxID }: { value: string, onChange(value: string): void, invalidTaxID: string }) {
  return (
    <div className="block pb-8 pt-2">
      <Form.Input
        className="float-right w-40"
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
        error={invalidTaxID}
      />

      <div className="flex-grow pt-2" >VAT ID <span data-balloon-length="large" aria-label="The VAT ID is only relevant for corporate customers within the EU.  The VAT ID consists of two letters identifying the country (ES), and the country-specific number of digits. Enter your VAT ID in accordance with your country-specific format. If this does not apply to you, or you are an individual, leave the VAT ID field empty." data-balloon-pos="up" className="bg-gray-200 rounded text-gray-700"> &nbsp;?&nbsp;</span></div>
    </div>
  )
}


function LicensesField({ value, onChange }: { value: number, onChange(value: number): void }) {
  return (
    <div className="block pb-4">
      <Form.Input
        size="mini"
        className="float-right w-40"
        min={1}
        type="number"
        value={value}
        onChange={e => onChange(Math.abs(Number((e.target.value))))}
      />

      <div className="flex-grow pt-2">Update Quantity</div>
    </div>
  )
}


function SubtotalSum({ licenses }: { licenses: number }) {
  return (
    <div className="pt-2">
      <div className="float-right text-gray-700">€ {licenses * 60}.00</div>
      <div className="flex-grow">Subtotal</div>
    </div>
  )
}

function TaxSum({ taxPercent, tax }: { taxPercent: number, tax: number }) {
  return (
    <div className="pt-2">
      <div className="float-right text-gray-700">€ {tax.toFixed(2)}</div>
      <div className="flex-grow">Tax ({taxPercent}%)</div>
    </div>
  )
}

function TotalSum({ total }: { total: number }) {
  return (
    <div className="pt-2">
      <h4 className="float-right text-gray-700">€ {total.toFixed(2)}</h4>
      <h4 className="italic">Total</h4>
    </div>
  )
}

function isEuropeanCountry(country: string): boolean {
  switch (country) {
    case "Austria":
    case "Belgium":
    case "Bulgaria":
    case "Croatia":
    case "Cyprus":
    case "Czech Republic":
    case "Denmark":
    case "Estonia":
    case "Finland":
    case "France":
    case "Germany":
    case "Greece":
    case "Hungary":
    case "Ireland":
    case "Italy":
    case "Latvia":
    case "Lithuania":
    case "Luxembourg":
    case "Malta":
    case "Netherlands":
    case "Poland":
    case "Portugal":
    case "Romania":
    case "Slovakia":
    case "Slovenia":
    case "Spain":
    case "Sweden":
      return true;
  }
  return false
}