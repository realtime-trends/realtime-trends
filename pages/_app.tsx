/* eslint-disable require-jsdoc */
import React, {useEffect} from 'react';
import '../styles/globals.css';
import type {AppProps} from 'next/app';
import * as ga from '../lib/ga';
import {useRouter} from 'next/router';

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      ga.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;
