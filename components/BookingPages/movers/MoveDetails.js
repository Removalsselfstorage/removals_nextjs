import BookingLayout from '@/layouts/BookingLayout';
import { titleFont } from '@/utils/fonts';
import Head from 'next/head';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

import PriceDatePick from '@/components/BookingPages/movers/PriceDatePick';
import FeaturesScroll from '@/components/BookingPages/movers/FeaturesScroll';
import FullRating from '@/components/Rating/FullRating';
import MoverCard from '@/components/BookingPages/movers/MoverCard';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { getAllDetails } from '@/store/quoteSlice';
import { useDispatch, useSelector } from 'react-redux';

const MoveDetails = () => {
  const details = useSelector(getAllDetails);

  //   console.log(details);
  return (
    <div className="bg-white shadow-lg rounded-[30px] py-[30px] px-[20px] md:px-[30px] w-full lg:sticky lg:top-[80px]">
      <div className="">
        <h1 className="text-2xl font-bold mb-[10px] md:mb-[20px]">
          Your Move Details
        </h1>
        <div className="grid md:grid-cols-3 lg:grid-cols-1 gap-y-[10px] gap-x-[10px] overflow-auto scrollbar-thin scrollbar-track-gray-200/50 scrollbar-thumb-gray-500/20 scrollbar-default h-[200px] md:h-full">
          <div className="flex flex-col space-y-[5px]">
            <p className="text-primary font-semibold text-[18px]">Quote Ref:</p>
            <p className="font-semibold text-[14px] ">
              rs{details.moveDetails.quoteRef}
            </p>
          </div>
          <div className="flex flex-col space-y-[5px]">
            <p className="text-primary font-semibold text-[18px]">Package:</p>
            <p className="font-semibold text-[14px] ">
              {details.moveDetails.propertyType} - (
              {details.moveDetails.movePackage})
            </p>
          </div>
          <div className="flex flex-col space-y-[5px]">
            <p className="text-primary font-semibold text-[18px]">
              Pick-up Location:
            </p>
            <p className="font-semibold text-[14px] ">
              {details.serviceLocation.locationFrom.name}{' '}
              {details.serviceLocation.locationFrom.postCode &&
                `(${details.serviceLocation.locationFrom.postCode})`}
            </p>
          </div>
          <div className="flex flex-col space-y-[5px]">
            <p className="text-primary font-semibold text-[18px]">
              Drop-off Location:
            </p>
            <p className="font-semibold text-[14px] ">
              {details.serviceLocation.locationTo.name}{' '}
              {details.serviceLocation.locationTo.postCode &&
                `(${details.serviceLocation.locationTo.postCode})`}
            </p>
          </div>
          <div className="flex flex-col space-y-[5px]">
            <p className="text-primary font-semibold text-[18px]">
              Travel Distance:
            </p>
            <p className="font-semibold text-[14px] ">
              {details.moveDetails.mileage} miles
            </p>
          </div>
          <div className="flex flex-col space-y-[5px]">
            <p className="text-primary font-semibold text-[18px]">Volume:</p>
            <p className="font-semibold text-[14px] ">
              {details.moveDetails.volume} CU/FT
            </p>
          </div>
          {details.moveDetails.duration && (
            <div className="flex flex-col space-y-[5px]">
              <p className="text-primary font-semibold text-[18px]">
                Duration:
              </p>
              <p className="font-semibold text-[14px] ">
                {details.moveDetails.duration} hours
              </p>
            </div>
          )}
          <div className="flex flex-col space-y-[5px]">
            <p className="text-primary font-semibold text-[18px]">Move date:</p>
            <p className="font-semibold text-[14px] ">
              {details.moveDetails.moveDateRaw}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoveDetails;
