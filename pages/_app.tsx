import Footer from '@components/Footer';
import Header from '@components/Header';
import Layout from '@components/layouts/Layout';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './_app.css';

library.add(fas, fab);

type MyAppProps = { Component: any, pageProps: any }

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <Layout>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Layout>
  )
}

export default MyApp
