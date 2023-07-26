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
import { getAllDetails } from "@/store/quoteSlice";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

const SummaryDetails = ({ depositFull, depositPart, card, paypal }) => {
  // const [details2, setDetails2] = useState(null);
  const details = useSelector(getAllDetails);

  // useEffect(() => {
  //   setDetails2(details);
  // }, []);

  console.log(details);
  return (
    <div className="bg-white shadow-lg rounded-[30px] pt-[30px] pb-[30px] px-[20px] md:px-[30px] w-full lg:sticky lg:top-[80px]">
      <div className="">
        <h1 className="text-2xl font-bold mb-[10px] md:mb-[20px]">
          Move Summary
        </h1>
        {/* price section */}
        <div className="flex justify-between mb-[10px] md:mb-[10px] border-t border-black/30 pt-[20px]">
          <h2 className="text-[18px] font-semibold text-primary ">
            Mover Price:
          </h2>
          <div className="flex flex-col items-end">
            <h2 className="text-[16px] font-bold ">
              ₤ {details.moverDetails.moverPrice}
            </h2>
            {/* <p className="text-[12px] text-gray-500">VAT included</p> */}
          </div>
        </div>
        {/* <div className="flex justify-between mb-[10px] md:mb-[10px] pt-[0px]">
          <h2 className="text-[16px] font-semibold ">Payment Type:</h2>
          <div className="flex flex-col items-end">
            {card && <h2 className="text-[16px] font-bold ">Card</h2>}
            {paypal && <h2 className="text-[16px] font-bold ">Paypal</h2>}
            {!card && !paypal && <h2 className="text-[16px] font-bold ">--</h2>}
          </div>
        </div> */}
        <div className="flex justify-between mb-[10px] md:mb-[10px]  pt-[0px]">
          <h2 className="text-[18px] font-semibold text-primary">
            Payment Method:
          </h2>
          <div className="flex flex-col items-end">
            {depositPart && <h2 className="text-[16px] font-bold ">20%</h2>}
            {depositFull && <h2 className="text-[16px] font-bold ">100%</h2>}
            {!depositFull && !depositPart && (
              <h2 className="text-[16px] font-bold ">--</h2>
            )}
          </div>
        </div>
        {/* final price */}
        <div className="flex justify-between mb-[10px] md:mb-[20px] border-t border-b border-black/30 pt-[20px] pb-[20px]">
          <h2 className="text-primary font-semibold text-[18px]">
            Final Price:
          </h2>
          <div className="flex flex-col items-end">
            {depositPart && (
              <h2 className="text-[25px] font-bold ">
                ₤ {(details.moverDetails.moverPrice * 0.2).toFixed()}
              </h2>
            )}
            {depositFull && (
              <h2 className="text-[25px] font-bold ">
                ₤ {(details.moverDetails.moverPrice * 1).toFixed()}
              </h2>
            )}
            {!depositFull && !depositPart && (
              <h2 className="text-[25px] font-bold ">--</h2>
            )}
          </div>
        </div>
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
              {details.serviceLocation.locationFrom.name}{" "}
              {details.serviceLocation.locationFrom.postCode &&
                `(${details.serviceLocation.locationFrom.postCode})`}
            </p>
          </div>

          <div className="flex flex-col space-y-[5px]">
            <p className="text-primary font-semibold text-[18px]">
              Drop-off Location:
            </p>
            <p className="font-semibold text-[14px] ">
              {details.serviceLocation.locationTo.name}{" "}
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
              {!details.moverDetails.moveDateFormatted
                ? dayjs(details.moveDetails.moveDateRaw).format(
                    "dddd, MMMM D, YYYY"
                  )
                : details.moverDetails.moveDateFormatted}
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

        {/* Payment button */}
        {/* <div className="btn btn-secondary btn-block">Pay Now</div> */}
      </div>
    </div>
  );
};

export default SummaryDetails;
