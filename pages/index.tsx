/* eslint-disable max-len */
import React from 'react';
import type {GetServerSideProps, NextPage} from 'next';
import Head from 'next/head';

import ChartBox from '../components/chart-box';
import axios from 'axios';
import Trend from '../models/trend';
import {useRouter} from 'next/router';
import ChartNewsList from '../components/chart-news-list';
interface PropsType {
  trends: Trend[]
}


const Home: NextPage<PropsType> = ({trends}: PropsType) => {
  const router = useRouter();
  const {napp} = router.query;
  const isNaverSection = Boolean(napp && napp == 'mysection');

  return (
    <div className='body-bg min-h-screen md:pt-20 pb-6 px-2 md:px-0 pt-12'>
      <Head>
        <title>리얼타임 실시간검색어</title>
        <meta name='description' content='실시간 검색어를 확인합니다.' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='bg-white max-w-4xl mx-auto p-8 md:p-12 rounded-lg md:shadow-2xl my-0 md:my-10'>
        <ChartBox trends={trends} isNaverSection={isNaverSection} reload={router.reload} />
        <ChartNewsList trends={trends} />
      </main>
    </div>
  );
};

export const getServerSideProps:GetServerSideProps<PropsType> = async ()=> {
  const res = await axios.get('https://raw.githubusercontent.com/realtime-trends/realtime-trends-data/data/trends.json');
  const data: object = await res.data;
  if (data) {
    // eslint-disable-next-line max-len
    const latestTimeStamp = Math.max.apply(null, data['timestamps' as keyof object]);
    const trends : Trend[] = data[latestTimeStamp as keyof object];
    return {
      props: {trends: trends},
    };
  } else {
    return {
      props: {trends: []},
    };
  }
};

export default Home;
