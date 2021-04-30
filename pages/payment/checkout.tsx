import Footer from '@components/Footer';
import { HeaderSolid } from '@components/Header';
import Layout from '@components/layouts/Layout';
import licenseServer from '@utils/services/licenseServer';
import getStripe from '@utils/stripe/getStripe';
import React, { useEffect, useMemo, useState } from "react";
import { Form } from 'semantic-ui-react';

export default function Checkout() {
  const [licenses, updateLicenses] = useState(1)
  const [country, updateCountry] = useState<string>("")
  const [taxID, updateTaxID] = useState("")
  const [subtotal, updateSubtotal] = useState(0)
  const [taxPercent, updateTaxPercent] = useState(21)
  const [tax, updateTax] = useState<number>(0)
  const [total, updateTotal] = useState<number>(0)
  const [showTaxID, updateShowTaxID] = useState(false)

  async function handleClick() {
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
    updateSubtotal(licenses * 30)
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
              <div className="float-right text-gray-700">€ 30.00</div>
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
              <button className={`btn btn-blue btn-popup float-right rounded py-3 px-8 ${invalidTaxID !== "" ? "opacity-50" : ""}`} disabled={invalidTaxID !== ""} onClick={handleClick} >
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

function CountryField({ value, onChange }: { value: string, onChange(value: string): void }) {
  return (
    <div className="float-right w-56 block relative align-text-bottom pr-4 text-right">
      <div className="relative">
        <select className="block appearance-none w-full hover:border-gray-500 px-4 py-2 pr-8 leading-tight focus:outline-none focus:border bg-transparent focus:border-blue-400" name="country" id="country" value={value} onChange={(e) => onChange(e.currentTarget.value)}>
          <option hidden></option>
          <option value="Afganistan">Afghanistan</option>
          <option value="Albania">Albania</option>
          <option value="Algeria">Algeria</option>
          <option value="American Samoa">American Samoa</option>
          <option value="Andorra">Andorra</option>
          <option value="Angola">Angola</option>
          <option value="Anguilla">Anguilla</option>
          <option value="Antigua & Barbuda">Antigua & Barbuda</option>
          <option value="Argentina">Argentina</option>
          <option value="Armenia">Armenia</option>
          <option value="Aruba">Aruba</option>
          <option value="Australia">Australia</option>
          <option value="Austria">Austria</option>
          <option value="Azerbaijan">Azerbaijan</option>
          <option value="Bahamas">Bahamas</option>
          <option value="Bahrain">Bahrain</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="Barbados">Barbados</option>
          <option value="Belarus">Belarus</option>
          <option value="Belgium">Belgium</option>
          <option value="Belize">Belize</option>
          <option value="Benin">Benin</option>
          <option value="Bermuda">Bermuda</option>
          <option value="Bhutan">Bhutan</option>
          <option value="Bolivia">Bolivia</option>
          <option value="Bonaire">Bonaire</option>
          <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
          <option value="Botswana">Botswana</option>
          <option value="Brazil">Brazil</option>
          <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
          <option value="Brunei">Brunei</option>
          <option value="Bulgaria">Bulgaria</option>
          <option value="Burkina Faso">Burkina Faso</option>
          <option value="Burundi">Burundi</option>
          <option value="Cambodia">Cambodia</option>
          <option value="Cameroon">Cameroon</option>
          <option value="Canada">Canada</option>
          <option value="Canary Islands">Canary Islands</option>
          <option value="Cape Verde">Cape Verde</option>
          <option value="Cayman Islands">Cayman Islands</option>
          <option value="Central African Republic">Central African Republic</option>
          <option value="Chad">Chad</option>
          <option value="Channel Islands">Channel Islands</option>
          <option value="Chile">Chile</option>
          <option value="China">China</option>
          <option value="Christmas Island">Christmas Island</option>
          <option value="Cocos Island">Cocos Island</option>
          <option value="Colombia">Colombia</option>
          <option value="Comoros">Comoros</option>
          <option value="Congo">Congo</option>
          <option value="Cook Islands">Cook Islands</option>
          <option value="Costa Rica">Costa Rica</option>
          <option value="Cote DIvoire">Cote DIvoire</option>
          <option value="Croatia">Croatia</option>
          <option value="Cuba">Cuba</option>
          <option value="Curaco">Curacao</option>
          <option value="Cyprus">Cyprus</option>
          <option value="Czech Republic">Czech Republic</option>
          <option value="Denmark">Denmark</option>
          <option value="Djibouti">Djibouti</option>
          <option value="Dominica">Dominica</option>
          <option value="Dominican Republic">Dominican Republic</option>
          <option value="East Timor">East Timor</option>
          <option value="Ecuador">Ecuador</option>
          <option value="Egypt">Egypt</option>
          <option value="El Salvador">El Salvador</option>
          <option value="Equatorial Guinea">Equatorial Guinea</option>
          <option value="Eritrea">Eritrea</option>
          <option value="Estonia">Estonia</option>
          <option value="Ethiopia">Ethiopia</option>
          <option value="Falkland Islands">Falkland Islands</option>
          <option value="Faroe Islands">Faroe Islands</option>
          <option value="Fiji">Fiji</option>
          <option value="Finland">Finland</option>
          <option value="France">France</option>
          <option value="French Guiana">French Guiana</option>
          <option value="French Polynesia">French Polynesia</option>
          <option value="French Southern Ter">French Southern Ter</option>
          <option value="Gabon">Gabon</option>
          <option value="Gambia">Gambia</option>
          <option value="Georgia">Georgia</option>
          <option value="Germany">Germany</option>
          <option value="Ghana">Ghana</option>
          <option value="Gibraltar">Gibraltar</option>
          <option value="Great Britain">Great Britain</option>
          <option value="Greece">Greece</option>
          <option value="Greenland">Greenland</option>
          <option value="Grenada">Grenada</option>
          <option value="Guadeloupe">Guadeloupe</option>
          <option value="Guam">Guam</option>
          <option value="Guatemala">Guatemala</option>
          <option value="Guinea">Guinea</option>
          <option value="Guyana">Guyana</option>
          <option value="Haiti">Haiti</option>
          <option value="Hawaii">Hawaii</option>
          <option value="Honduras">Honduras</option>
          <option value="Hong Kong">Hong Kong</option>
          <option value="Hungary">Hungary</option>
          <option value="Iceland">Iceland</option>
          <option value="Indonesia">Indonesia</option>
          <option value="India">India</option>
          <option value="Iran">Iran</option>
          <option value="Iraq">Iraq</option>
          <option value="Ireland">Ireland</option>
          <option value="Isle of Man">Isle of Man</option>
          <option value="Israel">Israel</option>
          <option value="Italy">Italy</option>
          <option value="Jamaica">Jamaica</option>
          <option value="Japan">Japan</option>
          <option value="Jordan">Jordan</option>
          <option value="Kazakhstan">Kazakhstan</option>
          <option value="Kenya">Kenya</option>
          <option value="Kiribati">Kiribati</option>
          <option value="Korea North">Korea North</option>
          <option value="Korea Sout">Korea South</option>
          <option value="Kuwait">Kuwait</option>
          <option value="Kyrgyzstan">Kyrgyzstan</option>
          <option value="Laos">Laos</option>
          <option value="Latvia">Latvia</option>
          <option value="Lebanon">Lebanon</option>
          <option value="Lesotho">Lesotho</option>
          <option value="Liberia">Liberia</option>
          <option value="Libya">Libya</option>
          <option value="Liechtenstein">Liechtenstein</option>
          <option value="Lithuania">Lithuania</option>
          <option value="Luxembourg">Luxembourg</option>
          <option value="Macau">Macau</option>
          <option value="Macedonia">Macedonia</option>
          <option value="Madagascar">Madagascar</option>
          <option value="Malaysia">Malaysia</option>
          <option value="Malawi">Malawi</option>
          <option value="Maldives">Maldives</option>
          <option value="Mali">Mali</option>
          <option value="Malta">Malta</option>
          <option value="Marshall Islands">Marshall Islands</option>
          <option value="Martinique">Martinique</option>
          <option value="Mauritania">Mauritania</option>
          <option value="Mauritius">Mauritius</option>
          <option value="Mayotte">Mayotte</option>
          <option value="Mexico">Mexico</option>
          <option value="Midway Islands">Midway Islands</option>
          <option value="Moldova">Moldova</option>
          <option value="Monaco">Monaco</option>
          <option value="Mongolia">Mongolia</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Morocco">Morocco</option>
          <option value="Mozambique">Mozambique</option>
          <option value="Myanmar">Myanmar</option>
          <option value="Nambia">Nambia</option>
          <option value="Nauru">Nauru</option>
          <option value="Nepal">Nepal</option>
          <option value="Netherland Antilles">Netherland Antilles</option>
          <option value="Netherlands">Netherlands (Holland, Europe)</option>
          <option value="Nevis">Nevis</option>
          <option value="New Caledonia">New Caledonia</option>
          <option value="New Zealand">New Zealand</option>
          <option value="Nicaragua">Nicaragua</option>
          <option value="Niger">Niger</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Niue">Niue</option>
          <option value="Norfolk Island">Norfolk Island</option>
          <option value="Norway">Norway</option>
          <option value="Oman">Oman</option>
          <option value="Pakistan">Pakistan</option>
          <option value="Palau Island">Palau Island</option>
          <option value="Palestine">Palestine</option>
          <option value="Panama">Panama</option>
          <option value="Papua New Guinea">Papua New Guinea</option>
          <option value="Paraguay">Paraguay</option>
          <option value="Peru">Peru</option>
          <option value="Phillipines">Philippines</option>
          <option value="Pitcairn Island">Pitcairn Island</option>
          <option value="Poland">Poland</option>
          <option value="Portugal">Portugal</option>
          <option value="Puerto Rico">Puerto Rico</option>
          <option value="Qatar">Qatar</option>
          <option value="Republic of Montenegro">Republic of Montenegro</option>
          <option value="Republic of Serbia">Republic of Serbia</option>
          <option value="Reunion">Reunion</option>
          <option value="Romania">Romania</option>
          <option value="Russia">Russia</option>
          <option value="Rwanda">Rwanda</option>
          <option value="St Barthelemy">St Barthelemy</option>
          <option value="St Eustatius">St Eustatius</option>
          <option value="St Helena">St Helena</option>
          <option value="St Kitts-Nevis">St Kitts-Nevis</option>
          <option value="St Lucia">St Lucia</option>
          <option value="St Maarten">St Maarten</option>
          <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
          <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
          <option value="Saipan">Saipan</option>
          <option value="Samoa">Samoa</option>
          <option value="Samoa American">Samoa American</option>
          <option value="San Marino">San Marino</option>
          <option value="Sao Tome & Principe">Sao Tome & Principe</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
          <option value="Senegal">Senegal</option>
          <option value="Seychelles">Seychelles</option>
          <option value="Sierra Leone">Sierra Leone</option>
          <option value="Singapore">Singapore</option>
          <option value="Slovakia">Slovakia</option>
          <option value="Slovenia">Slovenia</option>
          <option value="Solomon Islands">Solomon Islands</option>
          <option value="Somalia">Somalia</option>
          <option value="South Africa">South Africa</option>
          <option value="Spain">Spain</option>
          <option value="Sri Lanka">Sri Lanka</option>
          <option value="Sudan">Sudan</option>
          <option value="Suriname">Suriname</option>
          <option value="Swaziland">Swaziland</option>
          <option value="Sweden">Sweden</option>
          <option value="Switzerland">Switzerland</option>
          <option value="Syria">Syria</option>
          <option value="Tahiti">Tahiti</option>
          <option value="Taiwan">Taiwan</option>
          <option value="Tajikistan">Tajikistan</option>
          <option value="Tanzania">Tanzania</option>
          <option value="Thailand">Thailand</option>
          <option value="Togo">Togo</option>
          <option value="Tokelau">Tokelau</option>
          <option value="Tonga">Tonga</option>
          <option value="Trinidad & Tobago">Trinidad & Tobago</option>
          <option value="Tunisia">Tunisia</option>
          <option value="Turkey">Turkey</option>
          <option value="Turkmenistan">Turkmenistan</option>
          <option value="Turks & Caicos Is">Turks & Caicos Is</option>
          <option value="Tuvalu">Tuvalu</option>
          <option value="Uganda">Uganda</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Ukraine">Ukraine</option>
          <option value="United Arab Erimates">United Arab Emirates</option>
          <option value="United States of America">United States of America</option>
          <option value="Uraguay">Uruguay</option>
          <option value="Uzbekistan">Uzbekistan</option>
          <option value="Vanuatu">Vanuatu</option>
          <option value="Vatican City State">Vatican City State</option>
          <option value="Venezuela">Venezuela</option>
          <option value="Vietnam">Vietnam</option>
          <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
          <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
          <option value="Wake Island">Wake Island</option>
          <option value="Wallis & Futana Is">Wallis & Futana Is</option>
          <option value="Yemen">Yemen</option>
          <option value="Zaire">Zaire</option>
          <option value="Zambia">Zambia</option>
          <option value="Zimbabwe">Zimbabwe</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
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
      <div className="float-right text-gray-700">€ {licenses * 30}.00</div>
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