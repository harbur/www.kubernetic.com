import Footer from '@components/Footer';
import { HeaderSolid } from '@components/Header';
import Layout from '@components/layouts/Layout';
import React from "react";

export default function SignUpRequest() {
  return (
    <Layout title="Payment Success">
      <HeaderSolid />
      <div className="p-40 text-center">
        <h2>Thank you for registering your Kubernetic Account!</h2>

        <ul className="pt-10">
          <li>Please follow the instructions we just emailed to you.</li>
        </ul>
      </div>
      <Footer />
    </Layout>
  )
}
