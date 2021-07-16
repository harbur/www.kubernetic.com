import Footer from '@components/Footer';
import { HeaderSolid } from '@components/Header';
import Layout from '@components/layouts/Layout';
import React from "react";

export default function CheckoutLayout({ children }: { children: any }) {
    return (
        <Layout title="Payment Checkout">
            <HeaderSolid />
            <div className="pt-32 pb-10">
                {children}
                <div className="md:pt-20 pt-12 pl-4 pr-4 text-center italic font-light text-gray-700 text-sm">
                    We use industry-standard encryption to protect the confidentiality of your personal information.
                    This purchase and product fulfillment are through Stripe, a trusted reseller for https://kubernetic.com.
                </div>
            </div>
            <Footer />
        </Layout>

    )
}