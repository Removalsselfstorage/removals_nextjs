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
import MoveDetails from '@/components/BookingPages/movers/MoveDetails';
import { getAllDetails } from '@/store/quoteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { homeMovers } from '@/dummyData/dummyData';

const Movers = () => {
  const details = useSelector(getAllDetails);

  const priceFirstDay = details.moveDetails.initialPackagePrice;
  const priceSecondDay = priceFirstDay - 74; //74
  const priceThirdDay = priceSecondDay - 107; //107
  const priceSaturdays = priceThirdDay - 60; //60
  const priceSundays = priceThirdDay - 60; //8
  const priceOtherDays = priceSundays - 8;

  const [showModal, setShowModal] = useState(false);
  //   console.log(details.moveDetails.movePackage);

  return (
    <BookingLayout>
      <Head>
        <title>Movers - Removals and Selfstorage</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <main className="">
        <div className="mb-[70px] lg:mb-[100px] pt-[80px] md:pt-[100px] ">
          <div className="md:max-w-7xl mx-auto">
            {/* features links */}
            <FeaturesScroll />
            {/* price date pick */}
            <PriceDatePick />
            {/* movers list row */}
            <div className="flex flex-col space-y-[10px] lg:space-y-0 lg:flex-row lg:space-x-[10px] mx-[10px] md:mx-[20px]">
              {/* left section */}
              <div className="lg:flex-[1]  w-full">
                <MoveDetails />
              </div>

              {/* right section */}
              <div className="bg-white shadow-lg rounded-[30px] lg:flex-[3] py-[30px] md:px-[30px] w-full">
                <h1 className="text-2xl font-bold mb-[30px] px-[20px]">
                  You've been matched with{' '}
                  <span className="text-primary">{homeMovers.length} verified movers.</span>
                </h1>
                {homeMovers.map((mv, index) => {
                    // const price2 = ()=>{
                    //     let
                    //     if (index==0) {
                    //         mv.price = priceFirstDay
                    //     }

                    // }
                  return (
                    <div
                      className="mx-[10px] flex-col space-y-[20px]"
                      key={index}
                    >
                      {/* mover 1 */}
                      <MoverCard
                        image={mv.imageUrl}
                        name={mv.name}
                        phone={mv.phone}
                        email={mv.email}
                        loadArea={mv.loadArea}
                        rating={mv.rating}
                        reviewCount={mv.reviewCount}
                        price={index == 0 ? priceFirstDay : mv.price}
                        hiresCount={mv.hireCount}
                        description={mv.companyDescription}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-[20vw] h-[100%] z-[2000] absolute top-0 right-0 bg-white">
            <p className="text-3xl font-bold">Side bar</p>
        </div> */}
      </main>
    </BookingLayout>
  );
};

export default Movers;
