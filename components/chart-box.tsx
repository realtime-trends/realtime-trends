/* eslint-disable max-len */
import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import Trend from '../models/trend';
import ChartRow from './chart-row';
import loadOpenmain from '../scripts/loadopenmain';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
      Kakao: any;
  }
}

interface propsType {
  trends: Trend[],
  isNaverSection: boolean
}

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
const ChartBox = ({trends, isNaverSection}: propsType): JSX.Element => {
  const [isNaver, setIsNaver] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);


  useEffect(()=>{
    const interval = setInterval(()=>{
      setActiveIndex((i) => (i + 1) % 10);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadOpenmain(() => {
      if (!isNaverSection) {
        setLoaded(true);
      }
    });
  });

  return (
    // eslint-disable-next-line max-len
    <div className={'bg-white max-w-xl mx-auto p-8 md:p-12 rounded-lg ' + (isNaverSection ? 'md:shadow-2xl my-0 md:my-10' : 'shadow-2xl my-10')}>
      <section>
        <div className='flex justify-between items-center'>
          <div>
            <h4 className="font-bold text-2xl">급상승 검색어</h4>
          </div>
          <div className="form-check form-switch">
            <label className="relative flex justify-between items-center p-2 text-xl">
              <Image src="/google.svg" alt="Google logo" width={24} height={24} />
              <input type="checkbox" className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md" defaultChecked={isNaver} onClick={() => setIsNaver((v) => !v)}/>
              <span className="w-16 h-8 flex items-center flex-shrink-0 mx-2 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-500 after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-8"></span>
              <Image src="/naver.svg" alt="Naver logo" width={24} height={24} />
            </label>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="grid md:grid-cols-2">
          <div className="grid grid-rows-5 ">
            {trends?.slice(0, 5).map((trend: Trend, index: number) => {
              return (
                <div
                  className='p-2 md:hover:bg-blue-300'
                  key={index + 1}
                  style={{flexGrow: 1, height: '100%'}}
                  onClick={() => {
                    const encodedKeyword = encodeURI(trend.keyword);
                    if (isNaver) {
                      window.open('https://search.naver.com/search.naver?query=' + encodedKeyword);
                    } else {
                      window.open('https://www.google.com/search?q=' + encodedKeyword);
                    }
                  }}
                >
                  <ChartRow trend={trend} ranking={index + 1} bold={index == activeIndex}/>
                </div>
              );
            })}
          </div>
          <div className="grid grid-rows-5">
            {trends?.slice(5, 10).map((trend: Trend, index: number) => {
              index += 5;
              return (
                <div
                  className='p-2 md:hover:bg-blue-300'
                  key={index + 1}
                  style={{flexGrow: 1, height: '100%'}}
                  onClick={() => {
                    const encodedKeyword = encodeURI(trend.keyword);
                    if (isNaver) {
                      window.open('https://search.naver.com/search.naver?query=' + encodedKeyword);
                    } else {
                      window.open('https://www.google.com/search?q=' + encodedKeyword);
                    }
                  }}
                >
                  <ChartRow trend={trend} ranking={index + 1} bold={index == activeIndex}/>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-10 text-lg font-bold">
        <div className="grid grid-cols-3 p-2 md:hover:bg-blue-300"
          onClick={() => {
            try {
              window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
            } catch {} finally {
              window.Kakao.Link.sendCustom({
                templateId: 74677,
              });
            }
          }}>
          <div className='flex justify-center items-center'><Image src="/kakaotalk.svg" height={48} width={48} /></div>
          <div className='col-span-2 flex justify-center items-center'>카카오톡 공유</div>
        </div>
        <div className="hidden md:grid md:grid-cols-3 p-2 md:hover:bg-blue-300"
          onClick={() => {
            window.open('https://chrome.google.com/webstore/detail/dmbaagbmhlhdnlmbcncneijndejlalie');
          }}>
          <div className='flex justify-center items-center'><Image src="/chromewebstore.svg" height={48} width={48} /></div>
          <div className='col-span-2 flex justify-center items-center'>확장 프로그램 설치</div>
        </div>
        {loaded ? <div className="flex p-2 md:hidden justify-center items-center md:hover:bg-blue-300">
          <div className="nv-openmain" data-title="실시간검색어" data-type="W2"></div>
        </div> : ''}
      </section>
    </div>
  );
};

export default ChartBox;
