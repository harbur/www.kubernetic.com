import reducer, { initialState } from '@components/reducer';
import { StateProvider } from '@components/StateProvider';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'balloon-css';
import React from 'react';
import '../styles/index.css';
import '../styles/semantic.css';

library.add(fas, fab);

type MyAppProps = { Component: any, pageProps: any }

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
    <Component {...pageProps} />
    </StateProvider>
  )
}

export default MyApp
