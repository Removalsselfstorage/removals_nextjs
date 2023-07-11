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

const SummaryDetails = () => {
  return (
    <div className="bg-white shadow-lg rounded-[30px] pt-[30px] pb-[50px] px-[20px] md:px-[30px] w-full lg:sticky lg:top-[80px]">
      <div className="">
        <h1 className="text-2xl font-bold mb-[10px] md:mb-[20px]">Move Summary</h1>
        <div className="grid md:grid-cols-3 lg:grid-cols-1 lg:h-[300px] gap-y-[10px] gap-x-[10px] overflow-auto scrollbar-thin scrollbar-track-gray-200/50 scrollbar-thumb-gray-500/20 scrollbar-default h-[200px] md:h-full mb-[10px] md:mb-[20px]">
          <div className="flex flex-col space-y-[5px]">
            <p className="text-primary font-semibold text-[18px]">Quote Ref:</p>
            <p className="font-semibold text-[14px] ">RS-14523</p>
          </div>
          <div className="flex flex-col space-y-[5px]">
            <p className="text-primary font-semibold text-[18px]">Package:</p>
            <p className="font-semibold text-[14px] ">
              1 bed Apartment - (Standard)
            </p>
          </div>
          <div className="flex flex-col space-y-[5px]">
            <p className="text-primary font-semibold text-[18px]">
              Pick-up Postcode:
            </p>
            <p className="font-semibold text-[14px] ">
              58 Wade Lane, Saltley, United Kingdom (B8 1YG)
            </p>
          </div>
          <div className="flex flex-col space-y-[5px]">
            <p className="text-primary font-semibold text-[18px]">
              Drop-off Postcode:
            </p>
            <p className="font-semibold text-[14px] ">
              223 Sutton Wick Lane, Brigehaugh, United Kingdom (AB55 4BQ)
            </p>
          </div>
          <div className="flex flex-col space-y-[5px]">
            <p className="text-primary font-semibold text-[18px]">
              Travel Distance:
            </p>
            <p className="font-semibold text-[14px] ">151 - 200 Miles</p>
          </div>
          <div className="flex flex-col space-y-[5px]">
            <p className="text-primary font-semibold text-[18px]">Volume:</p>
            <p className="font-semibold text-[14px] ">550 CU/FT</p>
          </div>
          <div className="flex flex-col space-y-[5px]">
            <p className="text-primary font-semibold text-[18px]">Move date:</p>
            <p className="font-semibold text-[14px] ">18-7-2023</p>
          </div>
        </div>
        <div className="flex justify-between mb-[10px] md:mb-[20px] border-t border-black/30 pt-[20px]">
          <h1 className="text-[16px] font-semibold ">Final Price</h1>
          <div className="flex flex-col items-end">
            <h2 className="text-[20px] font-bold ">₤ 480.67</h2>
            <p className="text-[12px] text-gray-500">VAT included</p>
          </div>
        </div>
        {/* agree to terms */}
        <div className="flex mt-[10px] mb-[10px] md:mb-[20px] w-full">
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
        </div>
        {/* Payment button */}
        <div className="btn btn-primary btn-block">Pay Now</div>
      </div>
    </div>
  );
};

export default SummaryDetails;
