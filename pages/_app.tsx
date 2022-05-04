/* eslint-disable require-jsdoc */
import React, {useEffect} from 'react';
import '../styles/globals.css';
import type {AppProps} from 'next/app';
import * as ga from '../lib/ga';
import {useRouter} from 'next/router';
import Script from 'next/script';

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

  return (
    <>
      <Script src="https://developers.kakao.com/sdk/js/kakao.min.js"/>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
      <Script id="adsense-id" async
        onError={(e) => {
          console.error('Script failed to load', e);
        }}
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
        crossOrigin="anonymous"
      />
      <Component {...pageProps} />
    </>);
}

export default MyApp;
