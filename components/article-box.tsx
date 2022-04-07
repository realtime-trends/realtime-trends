/* eslint-disable max-len */
import React from 'react';
import Article from '../models/article';
import Image from 'next/image';

interface PropsType {
    article: Article
}

const AriticleBox = ({article} : PropsType) => {
  return (
    <div
      className="grid grid-cols-5 grid-rows-5 grid-flow-col p-3 gap-x-5 gap-y-1 md:hover:bg-blue-300"
      onClick={() => {
        window.open(article.link);
      }}
    >
      <div className="col-span-4 row-span-2 font-bold text-blue-800">
        <p className='line-clamp-2'>
          {article.title}
        </p>
      </div>
      <div className="col-span-4 row-span-3 text-gray-400 text-sm">
        <p className='line-clamp-3'>
          {article.content}
        </p>
      </div>
      <div className="row-span-5 flex justify-center items-center">
        <Image src={article.thumnail} width={300} height={200} />
      </div>
    </div>
  );
};

export default AriticleBox;
