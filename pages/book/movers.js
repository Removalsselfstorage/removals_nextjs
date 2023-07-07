import BookingLayout from '@/layouts/BookingLayout';
import { titleFont } from '@/utils/fonts';
import Head from 'next/head';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { TiTick } from 'react-icons/ti';
import {
  BiSolidChevronLeft,
  BiSolidChevronRight,
  BiHappy,
  BiSolidPackage,
  BiSolidHappy,
} from 'react-icons/bi';
import {
  MdKeyboardArrowRight,
  MdPayments,
  MdFreeCancellation,
  MdCancel,
} from 'react-icons/md';
import { RiRefundFill } from 'react-icons/ri';
import { FaTruckMoving } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import HorizontalScroll from '@/components/HorizontalScroll';
import NormalLayout from '@/layouts/NormalLayout';
import PriceDatePick from '@/components/BookingPages/movers/PriceDatePick';
import FeaturesScroll from '@/components/BookingPages/movers/FeaturesScroll';

const movers = () => {
  return (
    <BookingLayout>
      <Head>
        <title>Movers - Removals and Selfstorage</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <main className="">
        <div className="mb-[70px] lg:mb-[100px] pt-[80px] md:pt-[100px]">
          <div className="md:max-w-7xl mx-auto">
            {/* features links */}
            <FeaturesScroll />
            {/* price date pick */}
            <PriceDatePick />
            {/* movers list row */}
            <div className="flex flex-col lg:flex-row mx-[20px]">
              <div className="bg-white rounded-[30px] flex-[1]"></div>
              <div className="bg-white rounded-[30px] flex-[3] py-[50px] px-[30px]">
                <h1 className="text-2xl font-bold mb-[20px]">
                  You've been matched with{' '}
                  <span className="text-primary">6 verified movers.</span>
                </h1>

                {/* mover 1 */}
                <div className="flex border rounded-[30px] py-[0px] shadow-lg">
                  <div className="flex items-center space-x-[30px]">
                    <div className="px-[30px] py-[30px]">
                      <img
                        src="/van1.png"
                        alt=""
                        className="h-[100px] w-fit rounded-[30px]"
                      />
                    </div>
                    <div className="flex flex-col space-y-[10px]">
                      <p className="">Verified: 1st September</p>
                      <h2 className="text-primary text-bold text-[24px]">
                        Plaza Removals
                      </h2>
                      <div className="flex items-center space-x-[10px]">
                        <p className="font-semibold">020 8874 0090</p>
                        <p className="">|</p>
                        <p className="">enquiries@plazaremovals.co.uk</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </BookingLayout>
  );
};

export default movers;
