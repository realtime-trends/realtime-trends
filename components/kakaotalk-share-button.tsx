/* eslint-disable max-len */
import Image from 'next/image';
import React from 'react';

const KakaotalkShareButton = () => {
  return (
    <div className="grid grid-cols-5 p-5 m-2 bg-gray-100 md:hover:bg-blue-300"
      onClick={() => {
        try {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
        } catch {} finally {
          window.Kakao.Link.sendCustom({
            templateId: 74677,
          });
        }
      }}>
      <div className='flex justify-start items-center'>
        <Image src="/kakaotalk.svg" height={32} width={32} />
      </div>
      <div className='col-span-4 flex justify-end items-center break-normal'>
        <span>카카오톡으로&nbsp;<span className='text-yellow-700'>리얼타임 실검</span>&nbsp;공유</span>
      </div>
    </div>
  );
};

export default KakaotalkShareButton;
