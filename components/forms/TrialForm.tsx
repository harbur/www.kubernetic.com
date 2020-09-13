import Link from "next/link";
import { useState } from "react";
import { Divider, FormButton, FormCheckbox, FormInput, FormSelect, Header, Input, Segment } from "semantic-ui-react";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";

const expectedUsers = [
  { key: "1", text: "1", value: "1" },
  { key: "5", text: "5", value: "5" },
  { key: "10", text: "10", value: "10" },
  { key: "20", text: "20", value: "20" },
  { key: "50", text: "50", value: "50" },
  { key: "100+", text: "100+", value: "100+" }
]

export default function TrialForm() {
  const [terms, updateTerms] = useState(false)
  const [gdpr, updateGDPR] = useState(false)

  return (
    <Segment color="blue" style={{ textAlign: "left", paddingLeft: "30px", paddingRight: "30px", paddingTop: "30px" }}>
      <Header>Get Started with Kubernetic Enterprise in minutes</Header>
      <HeaderSubHeader>After signing up, we will send you a trial license which will be active for 30 days with seats for 3 users. Once you get your license you can follow the installation process in <Link href="https://develop--docs-kubernetic.netlify.app/#/installation/enterprise"><a>our guide</a></Link>.</HeaderSubHeader>
      <Divider hidden />
      <form className="ui form" name="enterprise-trial" method="POST" data-netlify="true">
        <Header size="tiny">Trial Details</Header>
        <FormInput label="Your Name" required type="text" name="name" id="name" />
        <FormInput label="Company Email" required type="email" name="email" id="email" />
        <FormInput label="Job Title" required type="text" name="job-title" id="job-title" />
        <Header size="tiny">Organization</Header>
        <FormInput label="Country" required type="text" name="country" id="country" />
        <FormSelect placeholder="" options={expectedUsers} label="Expected Users" required name="expected-users" id="expected-users" />
        <FormInput label="Phone" name="phone" id="phone" />
        <FormCheckbox checked={terms} onChange={() => updateTerms(!terms)} label={<label>I agree to the Harbur <Link href="https://harbur.io/privacy/index.html"><a>Terms of Use & Privacy Policy</a></Link>.</label>} name="terms" id="terms" />
        <FormCheckbox checked={gdpr} onChange={() => updateGDPR(!gdpr)} label={<label>I agree to receive Harbur marketing communications via email. I can always update my preferences later.</label>} name="gdpr" id="gdpr" />
        <Input type="hidden" name="form-name" value="enterprise-trial" />
        <FormButton secondary type="submit">Create Trial</FormButton>
      </form>
    </Segment>
  )
}
