/* eslint-disable max-len */
import React from 'react';
import type {NextPage} from 'next';
import Head from 'next/head';

import ChartBox from '../components/chart-box';
import axios from 'axios';
import Trend from '../models/trend';
import {useRouter} from 'next/router';
interface propsType {
  trends: Trend[]
}


const Home: NextPage<propsType> = ({trends}: propsType) => {
  const router = useRouter();
  const {napp} = router.query;

  if (napp && napp == 'mysection') {
    return (<ChartBox trends={trends} isNaverSection={true}/>);
  }

  return (
    <div className='body-bg min-h-screen md:pt-20 pb-6 px-2 md:px-0 pt-12'>
      <Head>
        <title>#실시간 검색어</title>
        <meta name="description" content="실시간 검색어를 확인합니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ChartBox trends={trends} isNaverSection={false}/>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  );
};

Home.getInitialProps = async () => {
  const res = await axios.get('https://raw.githubusercontent.com/hoyaaaa/realtime-trends-data/main/trends.json');
  const data: object = await res.data;
  if (data) {
    // eslint-disable-next-line max-len
    const latestTimeStamp = Math.max.apply(null, data['timestamps' as keyof object]);
    const trends : Trend[] = data[latestTimeStamp as keyof object];
    return {
      trends: trends,
    };
  } else {
    return {
      trends: [],
    };
  }
};

export default Home;
