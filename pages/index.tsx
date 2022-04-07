/* eslint-disable max-len */
import React from 'react';
import type {NextPage} from 'next';
import Head from 'next/head';

import ChartBox from '../components/chart-box';
import axios from 'axios';
import Trend from '../models/trend';
import * as cheerio from 'cheerio';
import {useRouter} from 'next/router';
import Article from '../models/article';
import ChartNewsList from '../components/chart-news-list';
interface PropsType {
  trends: Trend[]
}


const Home: NextPage<PropsType> = ({trends}: PropsType) => {
  const router = useRouter();
  const {napp} = router.query;

  if (napp && napp == 'mysection') {
    return (
      <main className='bg-white max-w-4xl mx-auto p-8 md:p-12 rounded-lg md:shadow-2xl my-0 md:my-10'>
        <ChartBox trends={trends} isNaverSection={true} reload={router.reload} />
        <ChartNewsList trends={trends} isNaverSection={true} />
      </main>);
  }

  return (
    <div className='body-bg min-h-screen md:pt-20 pb-6 px-2 md:px-0 pt-12'>
      <Head>
        <title>#실시간 검색어</title>
        <meta name="description" content="실시간 검색어를 확인합니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='bg-white max-w-4xl mx-auto p-8 md:p-12 rounded-lg shadow-2xl my-10'>
        <ChartBox trends={trends} isNaverSection={false} reload={router.reload} />
        <ChartNewsList trends={trends} />
      </main>
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
    await Promise.all(trends.map(async (trend, index) => {
      const url = 'https://search.naver.com/search.naver?where=news&sm=tab_jum&query=' + encodeURIComponent(trend.keyword);
      const res = await axios.get(url);
      const $ = cheerio.load(await res.data);
      const topArticles : Article[] = $('ul.list_news > li').filter((index) => index < 3).map((_index, item) => {
        return {
          title: $(item).find('a.news_tit').attr('title') || '',
          link: $(item).find('a.news_tit').attr('href') || '',
          content: $(item).find('a.api_txt_lines.dsc_txt_wrap').text(),
          thumnail: $(item).find('img.thumb.api_get').attr('src') || '',
        };
      }).toArray();
      trends[index].topArticles = topArticles;
    }));
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
