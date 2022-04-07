/* eslint-disable max-len */
import Image from 'next/image';
import React from 'react';

const ExtensionDownloadButton = () => {
  return (
    <div className="hidden md:grid md:grid-cols-5 p-5 m-2 bg-gray-100 md:hover:bg-blue-300"
      onClick={() => {
        window.open('https://chrome.google.com/webstore/detail/dmbaagbmhlhdnlmbcncneijndejlalie');
      }}>
      <div className='flex justify-start items-center'>
        <Image src="/chromewebstore.svg" height={48} width={48} />
      </div>
      <div className='col-span-4 flex justify-end items-center'>
        <span>
          브라우저에&nbsp;<span className='text-red-500'>#실시간검색어</span>&nbsp;설치
        </span>
      </div>
    </div>);
};

export default ExtensionDownloadButton;
