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
import dayjs from 'dayjs';

const SummaryDetails = () => {
  const details = useSelector(getAllDetails);
  return (
    <div className="bg-white shadow-lg rounded-[30px] pt-[30px] pb-[50px] px-[20px] md:px-[30px] w-full lg:sticky lg:top-[80px]">
      <div className="">
        <h1 className="text-2xl font-bold mb-[10px] md:mb-[20px]">
          Move Summary
        </h1>
        <div className="grid md:grid-cols-3 lg:grid-cols-1 lg:h-[300px] gap-y-[10px] gap-x-[10px] overflow-auto scrollbar-thin scrollbar-track-gray-200/50 scrollbar-thumb-gray-500/20 scrollbar-default h-[200px] md:h-full mb-[10px] md:mb-[20px]">
          {/* Quote  */}
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
              {dayjs(details.moveDetails.moveDateRaw).format(
                'dddd, MMMM D, YYYY'
              )}
            </p>
          </div>

          <div className="flex flex-col space-y-[5px]">
            <p className="text-primary font-semibold text-[18px]">
              Mover's Name:
            </p>
            <p className="font-semibold text-[14px] ">
              {details.moverDetails.moverName}
            </p>
          </div>

          <div className="flex flex-col space-y-[5px]">
            <p className="text-primary font-semibold text-[18px]">
              Pickup Time:
            </p>
            <p className="font-semibold text-[14px] ">
              {details.moverDetails.moverTime}
            </p>
          </div>
        </div>
        {/* price section */}
        <div className="flex justify-between mb-[10px] md:mb-[10px] border-t border-black/30 pt-[20px]">
          <h2 className="text-[16px] font-semibold ">Mover Price</h2>
          <div className="flex flex-col items-end">
            <h2 className="text-[18px] font-bold ">₤ {details.moverDetails.moverPrice}</h2>
            {/* <p className="text-[12px] text-gray-500">VAT included</p> */}
          </div>
        </div>
        <div className="flex justify-between mb-[10px] md:mb-[10px] pt-[0px]">
          <h2 className="text-[16px] font-semibold ">Payment Type</h2>
          <div className="flex flex-col items-end">
            <h2 className="text-[16px] font-bold ">20%</h2>
            {/* <p className="text-[12px] text-gray-500">VAT included</p> */}
          </div>
        </div>
        <div className="flex justify-between mb-[10px] md:mb-[20px] border-t border-black/30 pt-[20px]">
          <h2 className="text-[16px] font-semibold ">Final Price</h2>
          <div className="flex flex-col items-end">
            <h2 className="text-[18px] font-bold ">₤ {details.moverDetails.moverPrice}</h2>
            {/* <p className="text-[12px] text-gray-500">VAT included</p> */}
          </div>
        </div>
        {/* agree to terms */}
        {/* <div className="flex mt-[10px] mb-[10px] md:mb-[20px] w-full">
          <div className="form-control ">
            <label className="label cursor-pointer flex items-start space-x-[10px] w-full">
              <input
                type="checkbox"
                //   checked="checked"
                className="checkbox checkbox-primary checkbox-sm"
              />
              <span className="leading-[18px] text-[12px] md:text-[14px]">
                You acknwoledge that your inventory is accurate and will contact
                us to add further items (prices may change)
              </span>
            </label>
          </div>
        </div> */}
        {/* Payment button */}
        <div className="btn btn-primary btn-block">Pay Now</div>
      </div>
    </div>
  );
};

export default SummaryDetails;
