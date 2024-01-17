import BookingLayout from "@/layouts/BookingLayout";
import { titleFont } from "@/utils/fonts";
import Head from "next/head";
import Link from "next/link";
import React, { useRef, useState } from "react";

import PriceDatePick from "@/components/BookingPages/movers/PriceDatePick";
import FeaturesScroll from "@/components/BookingPages/movers/FeaturesScroll";
import FullRating from "@/components/Rating/FullRating";
import MoverCard from "@/components/BookingPages/movers/MoverCard";
import { BiSolidPhoneCall } from "react-icons/bi";
import { getAllDetails } from "@/store/quoteSlice";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  convertDateFormat,
  convertTimeTo24HourFormat,
  formatMovePrice,
} from "@/utils/logics";
import useQuote from "@/hooks/useQuote";
import useMoveItems from "@/hooks/useMoveItems";
import { TbBrandWechat } from "react-icons/tb";

const ReserveSide = ({ progressData }) => {
  // const details = useSelector(getAllDetails);

  let targetDate = new Date(progressData?.date2);

  // if (progressData?.moverTime) {
  //   const [startTime, endTime] = progressData?.moverTime?.split(" - ") || [];
  //   const ct = convertTimeTo24HourFormat(startTime);
  //   targetDate.setHours(ct);
  // }

  function calculateCountdownDay() {
    const currentDate = new Date().getTime();
    const timeRemaining = givenDate - currentDate;

    const months = Math.floor(timeRemaining / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // console.log({ months, days, hours, minutes });

    if (months === 0 && days === 0) {
      return true;
    } else {
      return false;
    }
  }

  // const currentDate = new Date().getTime();

  const givenDate = targetDate.getTime();

  // console.log({ progressData });

  return (
    <div className='bg-white shadow-lg rounded-[30px] py-[30px] px-[20px] md:px-[30px] w-full lg:sticky lg:top-[80px]'>
      <div className=''>
        <p className='text-[20px] font-bold mb-[10px] md:mb-[20px]'>
          Storage Summary
        </p>
        <div className='relative'>
          <div className='grid md:grid-cols-3 lg:grid-cols-1 gap-y-[10px] gap-x-[10px] overflow-auto scrollbar-thin scrollbar-track-gray-200/50 scrollbar-thumb-gray-500/20 scrollbar-default h-[200px] md:h-full'>
            <div className='flex flex-col space-y-[5px]'>
              <p className='text-primary font-semibold text-[16px]'>
                Storage Start Date:
              </p>
              <p className='font-semibold text-[13.5px] '>
                {progressData?.date2}
              </p>
            </div>

            <div className='flex flex-col space-y-[5px]'>
              <p className='text-primary font-semibold text-[16px]'>
                Storage Ref Id:
              </p>
              <p className='font-semibold text-[13.5px] '>
                {progressData?.bookRef}
              </p>
            </div>
            <div className='flex flex-col space-y-[5px]'>
              <p className='text-primary font-semibold text-[16px]'>
                Storage Size:
              </p>
              <p className='font-semibold text-[13.5px] '>
                {progressData?.containerSize}
              </p>
            </div>
            <div className='flex flex-col space-y-[5px]'>
              <p className='text-primary font-semibold text-[16px]'>
                Storage Amount:
              </p>
              <p className='font-semibold text-[13.5px] '>
                X {progressData?.containerAmount}
              </p>
            </div>

            <div className='flex flex-col space-y-[5px]'>
              <p className='text-primary font-semibold text-[16px]'>
                Storage Duration:
              </p>
              <p className='font-semibold text-[13.5px] '>
                {progressData?.durationCount} weeks(s)
              </p>
            </div>

            <div className='flex flex-col space-y-[5px]'>
              <p className='text-primary font-semibold text-[16px]'>
                Storage Price:
              </p>
              <p className='font-semibold text-[13.5px] '>
                {formatMovePrice(progressData?.containerPrice)}
              </p>
            </div>
          </div>
          <div className='absolute inset-x-0 bottom-0 h-[40px] bg-gradient-to-t from-gray-100  to-transparent bg-opacity-50 md:hidden'></div>
        </div>
      </div>
    </div>
  );
};

export default ReserveSide;

{
  /* <p className='font-semibold text-[13.5px]'>
                {!progressData?.moveDateFormatted
                  ? dayjs(convertDateFormat(progressData?.moveDate)).format(
                      "dddd, MMMM D, YYYY"
                    )
                  : progressData?.moveDateFormatted}
              </p> */
}
