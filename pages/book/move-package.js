import QuoteType from '@/components/BookingPages/QuoteType';
import BasicDatePicker from '@/components/DatePicker';
import SelectSearch from '@/components/SelectSearch';
import { citiesOptions } from '@/dummyData/inputData';
import BookingLayout from '@/layouts/BookingLayout';
import { titleFont } from '@/utils/fonts';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import PackageCard from '@/components/BookingPages/PackageCard';

const MovePackage = () => {
  return (
    <BookingLayout>
      <Head>
        <title>Move Package - Removal and Self Storage</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <main>
        <div className="mb-[70px] lg:mb-[100px] pt-[70px]">
          <div className="md:max-w-7xl mx-auto">
            {/* Title */}
            <div className="w-full flex justify-center py-[30px] md:py-[40px] mb-[30px]">
              {/* <h3 className="text-4xl font-extrabold">Our Services</h3> */}
              <h3
                className={`${titleFont.variable} font-sans2 text-2xl lg:text-4xl font-extrabold flex-col items-center justify-center`}
              >
                <p className="">Choose a Move Package</p>{' '}
                <div className="w-full bg-primary/20 h-[20px] mt-[-12px] "></div>
              </h3>
            </div>

            {/* move packages */}
            <div className="py-[0px] px-[20px] lg:px-[100px] xl:px-[20px] grid md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-4 justify-center lg:gap-x-[20px] lg:gap-y-[50px] gap-x-[20px] gap-y-[50px]">
              {/* <PackageCard
                image="/svg/house_removal.svg"
                title="STANDARD"
                subTitle="Prices are estimated"
                price="369"
                f1="1 Truck, 1 Bed content, Free blanket"
                f2="Free loading & unloading"
                f3="Free blanket, trolly & straps"
                f4="Standard insurance cover"
                f5="Free local mileage, waiting time"
                f6="Standard insurance cover"
                f7="600 cubic ft loading capacity"
                link="home-removals"
              /> */}
              <PackageCard
                image="/svg/hand_packing.svg"
                title="STANDARD"
                subTitle=""
                price="369"
                f1="1 Truck, 1 Bed content, Free blanket"
                f2="Free loading & unloading"
                f3="Free blanket, trolly & straps"
                f4="Standard insurance cover"
                f5="Free local mileage, waiting time"
                f6="Standard insurance cover"
                f7="600 cubic ft loading capacity"
              />
              <PackageCard
                image="/svg/man_van.svg"
                title="GOLD"
                subTitle="Price per hour"
                price="386"
                f1="1 Truck, 1 Bed content, Free blanket"
                f2="Free loading & unloading"
                f3="Free blanket, trolly & straps"
                f4="Standard insurance cover"
                f5="Free local mileage, waiting time"
                f6="Comprehensive insurance cover"
                f7="Shrink wrapping"
                f8="600 cubic ft loading capacity"
                link="man-and-van"
                preferred
              />
              <PackageCard
                image="/svg/store.svg"
                title="PREMIUM"
                subTitle="Prices per hour"
                price="397"
                f1="1 Truck, 1 Bed content, Free blanket"
                f2="Free loading & unloading"
                f3="Free blanket, trolly & straps"
                f4="Standard insurance cover"
                f5="Free local mileage, waiting time"
                f6="Comprehensive insurance cover"
                f7="Free mattress covers"
                f8="Free wardrobe boxes"
                f9="1 item dismantling / assembly"
                f10="Free ₤50 packing material"
                f11="600 cubic ft loading capacity"
              />
              <PackageCard
                image="/svg/hand_packing.svg"
                title="PREMIUM PLUS"
                subTitle=""
                price="466"
                f1="1 Truck, 1 Bed content, Free blanket"
                f2="Free loading & unloading"
                f3="Free blanket, trolly & straps"
                f4="Standard insurance cover"
                f5="Free local mileage, waiting time"
                f6="Comprehensive insurance cover"
                f7="2 Free mattress covers"
                f8="Free wardrobe boxes"
                f9="1 item dismantling / assembly"
                f10="Free ₤75 packing material"
                f11="600 cubic ft loading capacity"
              />
              
            </div>
          </div>
        </div>
      </main>
    </BookingLayout>
  );
};

export default MovePackage;
