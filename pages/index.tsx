import BirdsEye from '@components/features/BirdsEye';
import ChartRepositories from '@components/features/ChartRepositories';
import DashboardView from '@components/features/DashboardView';
import ManageNamespaces from '@components/features/ManageNamespaces';
import MultiCluster from '@components/features/MultiCluster';
import NativeKubernetes from '@components/features/NativeKubernetes';
import RealTimeUpdates from '@components/features/RealTimeUpdates';
import Footer from '@components/Footer';
import Header from '@components/Header';
import HeroBanner from '@components/HeroBanner';
import Layout from '@components/layouts/Layout';
import PricingTable from '@components/PricingTable';
import matter from 'gray-matter';
import React from "react";

export const Index = ({ posts, title, description, ...props }: any) => {
  return (
    <Layout>
      <Header />
      <HeroBanner />
      <BirdsEye />
      <RealTimeUpdates />
      <MultiCluster />
      <ManageNamespaces />
      <DashboardView />
      <NativeKubernetes />
      <ChartRepositories />
      <PricingTable />
      {/* Hack to disable Hubspot to collect info from non-HubSpot forms */}
      {/* reference: https://community.hubspot.com/t5/Lead-Capture-Tools/Ignore-a-specific-non-Hubspot-form-from-being-collected/m-p/367909/highlight/true#M4606 */}
      <span id="CollectedForms-5061743"></span>
      <Footer />
    </Layout>
  )
}

export default Index

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  const posts = ((context) => {
    const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map((key: any, index: any) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
      const value: any = values[index]
      const document = matter(value.default)
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug,
      }
    })
    return data
  })(require.context('../posts', true, /\.md$/))

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
