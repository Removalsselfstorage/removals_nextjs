import FullRating from '@/components/Rating/FullRating';
import { truncateTexts } from '@/utils/truncateText';
import React from 'react';

const ReviewCard = ({ name, location, date, rating, comment }) => {
  return (
    <div className="card carousel-item w-[400px] bg-base-100 shadow-xl flex flex-col px-[30px] py-[30px] ">
      <div className="   flex items-center w-full space-x-[10px]">
        <div className="bg-primary rounded-full h-[50px] w-[50px] grid place-items-center text-white font-semibold text-[20px]">
          K
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">{name}, {location} </p>
          <p className="text-[14px] text-gray-500">{date}</p>
        </div>
      </div>
      <div className="">
        <FullRating value={rating} color="text-secondary" />
      </div>
      <div className="">
        <p className="line-clamp-4 leading-[25px]">{comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
