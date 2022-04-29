/* eslint-disable max-len */
import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import Trend from '../models/trend';
import ChartRow from './chart-row';
import ExtensionDownloadButton from './extension-download-button';
import KakaotalkShareButton from './kakaotalk-share-button';
import NaverOpenmainButton from './naver-openmain-button';
import {RefreshIcon} from '@heroicons/react/solid';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
      Kakao: any;
  }
}

interface PropsType {
  trends: Trend[],
  isNaverSection: boolean,
  reload: Function
}

const searchEngines = [
  {
    name: 'Google',
    logo: './google.svg',
    searchUrl: 'https://www.google.com/search?q=',
  },
  {
    name: 'Naver',
    logo: './naver.svg',
    searchUrl: 'https://search.naver.com/search.naver?query=',
  },
];

/**
 * ChartBox for web.
 *
 * @component
 * @example
 * return (
 *  <ChartBox/>
 * )
 * @return {JSX.Element}
 */
const ChartBox = ({trends, isNaverSection, reload}: PropsType): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchEngine, setSearchEngine] = useState(isNaverSection ? 1 : 0);

  useEffect(()=>{
    const interval = setInterval(()=>{
      setActiveIndex((i) => (i + 1) % 10);
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div>
      <section>
        <div className='flex justify-between items-center'>
          <div className='flex justify-center items-center'>
            <h4 className="font-bold text-2xl">급상승 검색어</h4>
            <RefreshIcon onClick={() => reload()} width={32} height={32} className='bg-gray-300 rounded-full fill-white ml-3 p-1 hover:bg-blue-300'/>
          </div>
          <div
            className='items-center text-center'
            onClick={() => {
              setSearchEngine((searchEngine + 1)%searchEngines.length);
            }}
          >
            <div className="text-xs font-bold text-gray-400 mb-1">
              검색엔진변경
            </div>
            <Image src={searchEngines[searchEngine].logo} alt={searchEngines[searchEngine].name} width={32} height={32} />
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="grid md:grid-cols-2 md:gap-5 divide-y md:divide-y-0">
          <div className="grid grid-rows-5 divide-y">
            {trends?.slice(0, 5).map((trend: Trend, index: number) => {
              return (
                <div
                  className='p-2 md:hover:bg-blue-300'
                  key={index + 1}
                  style={{flexGrow: 1, height: '100%'}}
                  onClick={() => {
                    const encodedKeyword = encodeURI(trend.keyword);
                    window.open(searchEngines[searchEngine].searchUrl + encodedKeyword);
                  }}
                >
                  <ChartRow trend={trend} ranking={index + 1} bold={index == activeIndex}/>
                </div>
              );
            })}
          </div>
          <div className="grid grid-rows-5 divide-y border-y">
            {trends?.slice(5, 10).map((trend: Trend, index: number) => {
              index += 5;
              return (
                <div
                  className='p-2 md:hover:bg-blue-300'
                  key={index + 1}
                  style={{flexGrow: 1, height: '100%'}}
                  onClick={() => {
                    const encodedKeyword = encodeURI(trend.keyword);
                    window.open(searchEngines[searchEngine].searchUrl + encodedKeyword);
                  }}
                >
                  <ChartRow trend={trend} ranking={index + 1} bold={index == activeIndex}/>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="grid md:grid-cols-2 font-bold text-sm md:text-base">
          <KakaotalkShareButton/>
          <ExtensionDownloadButton/>
          <NaverOpenmainButton isNaverSection={isNaverSection} />
        </div>
      </section>
    </div>
  );
};

export default ChartBox;
