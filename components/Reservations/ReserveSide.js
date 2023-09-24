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
import { convertDateFormat } from "@/utils/logics";
import useQuote from "@/hooks/useQuote";

const ReserveSide = () => {
  const {
    serviceLocation,
    personalDetails,
    moveDetails,
    moverSideDetails,
    moverDetails,
    paymentDetails,
    bookStage,
    updateLocationFrom,
    resetLocationFrom,
    updateLocationTo,
    resetLocationTo,
    updatePersonal,
    resetPersonal,
    updateMove,
    resetMove,
    updateMover,
    resetMover,
    updatePayment,
    resetPayment,
    updatePickP,
    updateMoverSide,
    resetMoverSide,
    updateBookS,
    resetBookS,
    router,
  } = useQuote();

  // const details = useSelector(getAllDetails);

  const checkDuration = () => {
    switch (moveDetails.propertyType) {
      case "Office removals":
        return true;
        break;
      case "Studio flat":
        return true;
        break;
      case "Furniture & Appliances":
        return true;
        break;

      default:
        return false;
        break;
    }
  };

  //   console.log(details);
  return (
    <div className="bg-white shadow-lg rounded-[30px] py-[30px] px-[20px] md:px-[30px] w-full lg:sticky lg:top-[80px]">
      <div className="">
        <h1 className="text-2xl font-bold mb-[10px] md:mb-[20px]">
          Book Summary
        </h1>
        <div className="relative">
          <div className="grid md:grid-cols-3 lg:grid-cols-1 gap-y-[10px] gap-x-[10px] overflow-auto scrollbar-thin scrollbar-track-gray-200/50 scrollbar-thumb-gray-500/20 scrollbar-default h-[200px] md:h-full">
            <div className="flex flex-col space-y-[5px]">
              <p className="text-primary font-semibold text-[18px]">
                Quote Ref:
              </p>
              <p className="font-semibold text-[13.5px] ">
                {moveDetails.quoteRef}
              </p>
            </div>
            <div className="flex flex-col space-y-[5px]">
              <p className="text-primary font-semibold text-[18px]">Mover:</p>
              <p className="font-semibold text-[13.5px] ">
                {moverDetails.moverName}
              </p>
            </div>
            <div className="flex flex-col space-y-[5px]">
              <p className="text-primary font-semibold text-[18px]">Package:</p>
              <p className="font-semibold text-[13.5px] ">
                {moveDetails.propertyType} - ({moveDetails.movePackage})
              </p>
            </div>
            <div className="flex flex-col space-y-[5px]">
              <p className="text-primary font-semibold text-[18px]">
                Pick-up Details:
              </p>
              <p className="font-semibold text-[13.5px] ">
                {serviceLocation.locationFrom.name}{" "}
                {serviceLocation.locationFrom.postCode &&
                  `(${serviceLocation.locationFrom.postCode})`}
              </p>
              <p className="font-semibold text-[13.5px]">
                Floor ({serviceLocation.locationFrom.floor}),{" "}
                {serviceLocation.locationFrom.liftAvailable
                  ? "Lift available"
                  : "Lift not available"}
              </p>
            </div>
            <div className="flex flex-col space-y-[5px]">
              <p className="text-primary font-semibold text-[18px]">
                Drop-off Details:
              </p>
              <p className="font-semibold text-[13.5px] ">
                {serviceLocation.locationTo.name}{" "}
                {serviceLocation.locationTo.postCode &&
                  `(${serviceLocation.locationTo.postCode})`}
              </p>
              <p className="font-semibold text-[13.5px]">
                Floor ({serviceLocation.locationTo.floor}),{" "}
                {serviceLocation.locationTo.liftAvailable
                  ? "Lift available"
                  : "Lift not available"}
              </p>
            </div>
            <div className="flex flex-col space-y-[5px]">
              <p className="text-primary font-semibold text-[18px]">
                Travel Distance:
              </p>
              <p className="font-semibold text-[13.5px] ">
                {moveDetails.mileage} miles
              </p>
            </div>
            <div className="flex flex-col space-y-[5px]">
              <p className="text-primary font-semibold text-[18px]">Volume:</p>
              <p className="font-semibold text-[13.5px] ">
                {moveDetails.volume} CU/FT
              </p>
            </div>
            {checkDuration() && (
              <div className="flex flex-col space-y-[5px]">
                <p className="text-primary font-semibold text-[18px]">
                  Duration:
                </p>
                <p className="font-semibold text-[13.5px] ">
                  {moveDetails.duration} hours
                </p>
              </div>
            )}
            <div className="flex flex-col space-y-[5px]">
              <p className="text-primary font-semibold text-[18px]">
                Move date:
              </p>
              <p className="font-semibold text-[13.5px] ">
                {!moverDetails.moveDateFormatted
                  ? dayjs(convertDateFormat(moveDetails.moveDate)).format(
                      "dddd, MMMM D, YYYY"
                    )
                  : moverDetails.moveDateFormatted}
              </p>
            </div>
            <div className="flex flex-col space-y-[5px]">
              <p className="text-primary font-semibold text-[18px]">
                Move Time:
              </p>
              <p className="font-semibold text-[13.5px] ">
                {moverDetails.moverTime}
              </p>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[40px] bg-gradient-to-t from-gray-100  to-transparent bg-opacity-50 md:hidden"></div>
        </div>
      </div>
    </div>
  );
};

export default ReserveSide;
