/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import type {GetServerSideProps, NextPage} from 'next';
import Head from 'next/head';

import ChartBox from '../components/chart-box';
import axios from 'axios';
import Trend from '../models/trend';
import * as cheerio from 'cheerio';
import {useRouter} from 'next/router';
import Article from '../models/article';
import ChartNewsList from '../components/chart-news-list';

const Home: NextPage = () => {
  const [trends, setTrends] = useState<Trend[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/hoyaaaa/realtime-trends-data/main/trends.json').then((res) => {
      const latestTimeStamp = Math.max.apply(null, res.data['timestamps' as keyof object]);
      const trends : Trend[] = res.data[latestTimeStamp as keyof object];
      trends.forEach((trend, index) => {
        const url = 'https://search.naver.com/search.naver?where=news&sm=tab_jum&query=' + encodeURIComponent(trend.keyword);
        axios.get(url).then((res_) => {
          const $ = cheerio.load(res_.data);
          const topArticles : Article[] = $('ul.list_news > li').filter((index) => index < 3).map((_index, item) => {
            return {
              title: $(item).find('a.news_tit').attr('title') || '',
              link: $(item).find('a.news_tit').attr('href') || '',
              content: $(item).find('a.api_txt_lines.dsc_txt_wrap').text(),
              thumnail: $(item).find('img.thumb.api_get').attr('src') || '',
            };
          }).toArray();
          trends[index].topArticles = topArticles;
          setTrends(trends);
        });
      });
    });
  });

  const {napp} = router.query;

  if (!trends) {
    return (<div>Loading...</div>);
  }

  if (napp && napp == 'mysection') {
    return (
      <main className='bg-white max-w-4xl mx-auto p-8 md:p-12 rounded-lg md:shadow-2xl my-0 md:my-10'>
        <ChartBox trends={trends} isNaverSection={true} reload={router.reload} />
        <ChartNewsList trends={trends} />
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

// export const getServerSideProps:GetServerSideProps<PropsType> = async ()=> {

// };

export default Home;
