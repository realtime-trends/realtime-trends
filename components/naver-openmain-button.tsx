/* eslint-disable max-len */
import Image from 'next/image';
import React, {useEffect} from 'react';
import {useState} from 'react';
import loadOpenmain from '../scripts/loadopenmain';


interface PropsType {
    isNaverSection: boolean
}

const NaverOpenmainButton = function({isNaverSection}: PropsType) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [elementLoaded, setElementLoaded] = useState(false);

  useEffect(() => {
    if (!elementLoaded) {
      loadOpenmain(() => {
        if (!isNaverSection) {
          setScriptLoaded(true);

          const hiddenOpenmainElement = document.getElementById('hidden-openmain');
          if (hiddenOpenmainElement) {
            const openmainDiv = hiddenOpenmainElement.getElementsByTagName('div')[0];
            if (openmainDiv) {
              setElementLoaded(true);
            }
          }
        }
      });
    }
  });

  if (elementLoaded) {
    return (
      <>
        <div id="hidden-openmain" className="hidden nv-openmain" data-title="실시간검색어" data-type="W2"></div>
        <div className="grid grid-cols-5 p-5 m-2 md:hidden bg-gray-100 md:hover:bg-blue-300" onClick={() => {
          const element = document.querySelector('#hidden-openmain > div > button') as HTMLElement;
          element.click();
        }}>
          <div className='flex justify-start items-center'><Image src="/naver.svg" height={32} width={32} /></div>
          <div className='col-span-4 flex justify-end items-center'>
            <span>
              네이버 메인에&nbsp;<span className='text-green-500'>#실시간검색어</span>&nbsp;추가
            </span>
          </div>
        </div>
      </>
    );
  } else if (scriptLoaded) {
    return (
      <div id="hidden-openmain" className="hidden nv-openmain" data-title="실시간검색어" data-type="W2"></div>
    );
  } else {
    return (<div></div>);
  }
};

export default NaverOpenmainButton;
