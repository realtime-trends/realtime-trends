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
          <meta name="google-site-verification" content="54SG3TNIx0BzNeZ1-XFsHzAM09nR1-K4X1_MjwaXLDY" />
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
