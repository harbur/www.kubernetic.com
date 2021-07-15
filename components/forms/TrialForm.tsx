import InputField from "@components/ui/form/InputField";
import Link from "next/link";
import { useState } from "react";

const expectedUsersOptions = [
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
  const [expectedUsers, updateExpectedUsers] = useState<string>()

  return (
    <div className="p-10 text-left border shadow-xl rounded-lg border-blue-500">
      <h3>Get Started with Kubernetic Team in minutes</h3>

      <p className="pt-5 pb-5 font-extralight">After signing up, we will send you a trial license which will be active for 30 days with seats for 10 users. Once you get your license you can follow the installation process in <Link href="https://docs.kubernetic.com/installation/team"><a>our guide</a></Link>.</p>
      <form name="enterprise-trial" method="POST" aria-disabled={true} data-netlify="true">
        <h6 className="pt-4 pb-2 underline">Trial Details</h6>
        <InputField label="Your Name" name="name" required/>
        <InputField label="Company Email" name="email" required/>
        <InputField label="Job Title" name="job-title" required/>
        <h6 className="pt-4 pb-2 underline">Organization</h6>
        <InputField label="Country" name="country" required/>
        <div className="inline-block relative w-full required field">
          <label>Expected Users</label>
          <div className="relative">
            <select className="block appearance-none w-full bg-white border hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border focus:border-blue-400" name="expected-users" id="expected-users" onChange={(e) => updateExpectedUsers(e.currentTarget.value)}>
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100+">100+</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>

        </div>

        <InputField label="Phone" name="phone" />

        <label className="block pt-4">
          <input name="gdpr" id="gdpr" type="checkbox" checked={gdpr} onChange={() => updateGDPR(!gdpr)} />
          <span className="pl-3 italic text-sm">I agree to receive Harbur marketing communications via email. I can always update my preferences later.</span>
        </label>

        <label className="block pt-4">
          <input name="terms" id="terms" type="checkbox" checked={terms} onChange={() => updateTerms(!terms)} />
          <span className="pl-3 italic text-sm">I agree to the Harbur <Link href="https://harbur.io/privacy/index.html"><a rel="noopener" target="_blank" className="border-b border-gray-500 border-dotted">Terms of Use & Privacy Policy</a></Link>.</span>
        </label>

        <input type="hidden" name="form-name" value="enterprise-trial" />
        <button className={`btn btn-green btn-popup mt-6 inline-flex rounded py-3 w-full ${!terms ? "opacity-50" : ""}`} type="submit" disabled={!terms}>Create Trial</button>
      </form>
    </div>
  )
}
