import BookingLayout from "@/layouts/BookingLayout";
import { titleFont } from "@/utils/fonts";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import PriceDatePick from "@/components/BookingPages/movers/PriceDatePick";
import FeaturesScroll from "@/components/BookingPages/movers/FeaturesScroll";
import FullRating from "@/components/Rating/FullRating";
import MoverCard from "@/components/BookingPages/movers/MoverCard";
import { BiSolidPhoneCall } from "react-icons/bi";
import MoveDetails from "@/components/BookingPages/movers/MoveDetails";
import { getAllDetails, updatePickPrice } from "@/store/quoteSlice";
import { useDispatch, useSelector } from "react-redux";
import { homeMovers } from "@/dummyData/dummyData";
import {
  calculateMoverPrice,
  decreaseByPercentage,
  getFirstSortedHomeMover,
  increaseByPercentage,
  sortHomeMoversAndExcludeHighest,
} from "@/utils/logics";
import Loader1 from "@/components/loaders/loader1";

const Movers = () => {
  const dispatch = useDispatch();
  const details = useSelector(getAllDetails);

  useEffect(() => {
    const priceFirstDay = details.moveDetails.initialPackagePrice;
    const priceFridays = priceFirstDay;
    const priceSaturdays = priceFirstDay;
    const priceSundays = increaseByPercentage(priceFirstDay, 4).toFixed();
    const priceOtherDays = decreaseByPercentage(priceFirstDay, 3).toFixed();
    const priceFridaysAfter3Weeks = decreaseByPercentage(
      priceFirstDay,
      2.5
    ).toFixed();
    const priceSaturdaysAfter3Weeks = decreaseByPercentage(
      priceFirstDay,
      2.5
    ).toFixed();
    const priceSundaysAfter3Weeks = increaseByPercentage(
      priceFirstDay,
      3.5
    ).toFixed();
    const priceOtherDaysAfter3Weeks = decreaseByPercentage(
      priceFirstDay,
      3
    ).toFixed();

    dispatch(updatePickPrice(priceFirstDay));
  }, []);

  // const [pickPrice, setPickPrice] = useState(priceThirdDay)

  const [showLoader, setShowLoader] = useState(false);
  const [todayPick, setTodayPick] = useState(false);
  // console.log(details.moverDetails.pickPrice);

  const firstCard = getFirstSortedHomeMover(homeMovers);

  const otherCards = sortHomeMoversAndExcludeHighest(homeMovers);

  return (
    <BookingLayout>
      <Head>
        <title>Movers - Removals and Selfstorage</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <main className="">
        <div className="mb-[70px] lg:mb-[100px] pt-[80px] md:pt-[100px] ">
          {showLoader && <Loader1 />}
          <div className="md:max-w-7xl mx-auto">
            {/* features links */}
            <FeaturesScroll />
            {/* price date pick */}
            <PriceDatePick
              setShowLoader={setShowLoader}
              setTodayPick={setTodayPick}
            />
            {/* movers list row */}
            <div className="flex flex-col space-y-[10px] lg:space-y-0 lg:flex-row lg:space-x-[10px] mx-[10px] md:mx-[20px]">
              {/* left section */}
              <div className="lg:flex-[1]  w-full">
                <MoveDetails />
              </div>

              {/* right section */}
              <div className="bg-white shadow-lg rounded-[30px] lg:flex-[3] py-[30px] md:px-[30px] w-full">
                {!showLoader ? (
                  <h1 className="text-2xl font-bold mb-[30px] px-[20px]">
                    <span className="text-primary">
                      {todayPick
                        ? "Movers unavailable for hire today"
                        : `You've been matched with ${homeMovers.length} verified movers`}
                      .{/* {homeMovers.length} verified movers. */}
                    </span>
                  </h1>
                ) : (
                  <h1 className="text-2xl font-bold mb-[30px] px-[20px]">
                    Matching Movers ...
                  </h1>
                )}
                {!showLoader &&
                  !todayPick &&
                  homeMovers.map((mv, index) => {
                    if (index === 0) {
                      return (
                        <div
                          className="mx-[10px] flex-col space-y-[20px]"
                          key={index}
                        >
                          {/* mover 1 */}
                          <MoverCard
                            image={firstCard.imageUrl}
                            name={firstCard.name}
                            phone={firstCard.phone}
                            email={firstCard.email}
                            loadArea={firstCard.loadArea}
                            rating={firstCard.rating}
                            reviewCount={firstCard.reviewCount}
                            price={details.moverDetails.pickPrice}
                            // price={priceThirdDay}
                            hiresCount={firstCard.hireCount}
                            description={firstCard.companyDescription}
                            score={firstCard.score}
                            // pickPrice={pickPrice} setPickPrice={setPickPrice}
                          />
                        </div>
                      );
                    }
                  })}
                {!showLoader && !todayPick && (
                  <div className="mx-[10px] flex-col space-y-[20px]">
                    <MoverCard
                      image=""
                      title="Move smart & save money!"
                      subtitle="Book your fixed-price move with our Smart Moving feature & we will find you the best mover according to your needs."
                      // name={firstCard.name}
                      phone={firstCard.phone}
                      email={firstCard.email}
                      loadArea={firstCard.loadArea}
                      rating={firstCard.rating}
                      reviewCount={firstCard.reviewCount}
                      price={(details.moverDetails.pickPrice * 0.6).toFixed()}
                      // price={priceThirdDay}
                      hiresCount={firstCard.hireCount}
                      description={firstCard.companyDescription}
                      score={firstCard.score}
                      // pickPrice={pickPrice} setPickPrice={setPickPrice}
                    />
                  </div>
                )}
                {!showLoader &&
                  !todayPick &&
                  otherCards.map((mv, index) => {
                    return (
                      <div
                        className="mx-[10px] flex-col space-y-[20px]"
                        key={index}
                      >
                        {/* mover 2 */}
                        <MoverCard
                          image={mv.imageUrl}
                          name={mv.name}
                          phone={mv.phone}
                          email={mv.email}
                          loadArea={mv.loadArea}
                          rating={mv.rating}
                          reviewCount={mv.reviewCount}
                          price={calculateMoverPrice(
                            details.moverDetails.pickPrice,
                            mv.score,
                            0.05
                          ).toFixed()}
                          hiresCount={mv.hireCount}
                          description={mv.companyDescription}
                          score={mv.score}
                          // pickPrice={pickPrice} setPickPrice={setPickPrice}
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
