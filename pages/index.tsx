import BirdsEye from '@components/features/BirdsEye';
import ChartRepositories from '@components/features/ChartRepositories';
import DashboardView from '@components/features/DashboardView';
import ManageNamespaces from '@components/features/ManageNamespaces';
import MultiCluster from '@components/features/MultiCluster';
import NativeKubernetes from '@components/features/NativeKubernetes';
import RealTimeUpdates from '@components/features/RealTimeUpdates';
import HeroBanner from '@components/HeroBanner';
import PricingTable from '@components/PricingTable';
import matter from 'gray-matter';
import React from "react";

export const Index = ({ posts, title, description, ...props }: any) => {
  return (
    <>
      <HeroBanner />
      <BirdsEye />
      <RealTimeUpdates />
      <MultiCluster />
      <ManageNamespaces />
      <DashboardView />
      <NativeKubernetes />
      <ChartRepositories />
      <PricingTable />
    </>
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
