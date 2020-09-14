import TrialForm from "@components/forms/TrialForm"
import React from "react"

export default function Trial() {
  return (
    <section className="section app-features-reverse app-features">
      <div className="wrap-wide">
        <div className="license">
          <TrialForm />
        </div>
      </div>
    </section>
  )
}
