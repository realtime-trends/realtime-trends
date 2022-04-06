/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
          <meta name="google-site-verification" content="wNBO74d0veQz9o6UYxEbLs7o_cHkeafkF9pKpShKaYA" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
