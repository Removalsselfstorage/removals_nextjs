import FullRating from '@/components/Rating/FullRating';
import { truncateTexts } from '@/utils/truncateText';
import React from 'react';

const ReviewCard = ({ name, location, date, rating, comment }) => {
  function spliceFirstLetter(sentence) {
    if (sentence.length === 0) {
      return sentence;
    }

    const words = sentence.split(' ');

    const firstWord = words[0].split('');

    return firstWord[0];
  }
  return (
    <div className="card md:w-[400px] bg-base-100 shadow-xl flex flex-col px-[30px] py-[30px] ">
      <div className="   flex items-center w-full space-x-[10px]">
        <div className="bg-primary rounded-full h-[50px] w-[50px] grid place-items-center text-white font-semibold text-[20px]">
          {spliceFirstLetter(name)}
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">
            {name}, ({location})
          </p>
          <p className="text-[14px] text-gray-500">{date}</p>
        </div>
      </div>
      <div className="">
        <FullRating value={rating} color="text-secondary" />
      </div>
      <div className="overflow-auto scrollbar-thin scrollbar-track-gray-200/50 scrollbar-thumb-gray-500/20 scrollbar-default h-[100px]">
        <p className="leading-[25px] ">{comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
