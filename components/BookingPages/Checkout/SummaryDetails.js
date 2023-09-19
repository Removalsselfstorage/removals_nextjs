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
import { moveDesciptionsCalc, moveDesciptionsCalc2 } from "@/utils/moversLogic";
import { FiCheckCircle } from "react-icons/fi";

const SummaryDetails = (
  {
    // depositFull,
    // depositPart,
    // card,
    // paypal,
    // setDepositFull,
    // setDepositPart,
  }
) => {
  // const [details2, setDetails2] = useState(null);
  const details = useSelector(getAllDetails);

  const { paidPart, paidFull } = details?.paymentDetails;

  // const partDepositOnchange = (e) => {
  //   setDepositPart(e.target.checked);
  //   setDepositFull(false);
  // };
  // const fullDepositOnchange = (e) => {
  //   setDepositFull(e.target.checked);
  //   setDepositPart(false);
  // };

  const checkDuration = () => {
    switch (details.moveDetails.propertyType) {
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

  const transformMovePackage = () => {
    switch (details.moveDetails.movePackage) {
      case details.moveDetails.movePackage:
        return `"${details.moveDetails.movePackage.toUpperCase()}"`;
        break;

      default:
        break;
    }
  };

  const mv = transformMovePackage();

  const moveDesc = moveDesciptionsCalc2(
    details.moveDetails.movePackage,
    details.moveDetails.propertyType
  );
  // const movePackage = `'${details.moveDetails.movePackage}
  // '`;

  // const movePackage2 = movePackage.toUpperCase();
  const features = {
    f1: moveDesc?.f1,
    f2: moveDesc?.f2,
    f3: moveDesc?.f3,
    f4: moveDesc?.f4,
    f5: moveDesc?.f5,
    f6: moveDesc?.f6,
    f7: moveDesc?.f7,
    f8: moveDesc?.f8,
    f9: moveDesc?.f9,
    f10: moveDesc?.f10,
    f11: moveDesc?.f11,
    f12: moveDesc?.f12,
  };

  // useEffect(() => {
  //   setDetails2(details);
  // }, []);

  console.log(details.moveDetails.movePackage);
  return (
    <div className="bg-white shadow-lg rounded-[30px] pt-[30px] pb-[30px] px-[20px] md:px-[30px] w-full lg:sticky lg:top-[80px]">
      <div className="">
        <h1 className="text-[22px] lg:text-2xl font-bold mb-[10px] md:mb-[20px] ">
          Move Summary
        </h1>
        {/* price section */}
        <div className="hidden lg:flex justify-between mb-[10px] md:mb-[10px] border-t border-black/30 pt-[20px]">
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
        {/* payment method */}
        <div className="hidden lg:flex justify-between mb-[10px] md:mb-[10px]  pt-[0px]">
          <h2 className="text-[18px] font-semibold text-primary">
            Payment Method:
          </h2>
          <div className="flex flex-col items-end">
            {paidPart && <h2 className="text-[16px] font-bold ">20%</h2>}
            {paidFull && <h2 className="text-[16px] font-bold ">100%</h2>}
            {!paidFull && !paidPart && (
              <h2 className="text-[16px] font-bold ">--</h2>
            )}
          </div>
        </div>
        {/* final price */}
        <div className="hidden lg:flex justify-between mb-[10px] md:mb-[20px] border-t border-b border-black/30 pt-[20px] pb-[20px]">
          <h2 className="text-primary font-semibold text-[18px]">
            Final Price:
          </h2>
          <div className="flex flex-col items-end">
            {details.paymentDetails.paidPrice && (
              <h2 className="text-[25px] font-bold ">
                ₤ {details.paymentDetails.paidPrice}
              </h2>
            )}

            {!details.paymentDetails.paidPrice && (
              <h2 className="text-[25px] font-bold ">--</h2>
            )}
          </div>
        </div>

        <div className="relative">
          {/* move details */}
          <div className="grid md:grid-cols-3 lg:grid-cols-1  border-b border-black/30 pt-[0px] pb-[20px] lg:h-[200px] gap-y-[10px] gap-x-[10px] overflow-auto scrollbar-thin scrollbar-track-gray-200/50 scrollbar-thumb-gray-500/20 scrollbar-default h-[200px] md:h-full mb-[10px] md:mb-[20px] ">
            {/* Quote ref */}
            <div className="flex flex-col space-y-[5px]">
              <p className="text-primary font-semibold text-[18px]">
                Quote Ref:
              </p>
              <p className="font-semibold text-[14px] ">
                {details.moveDetails.quoteRef}
              </p>
            </div>
            {/* mover name */}
            <div className="flex flex-col space-y-[5px]">
              <p className="text-primary font-semibold text-[18px]">
                Mover's Name:
              </p>
              <p className="font-semibold text-[14px] ">
                {details.moverDetails.moverName}
              </p>
            </div>
            {/* pick-up details */}
            <div className="flex flex-col space-y-[5px]">
              <p className="text-primary font-semibold text-[18px]">
                Pick-up Details:
              </p>
              <p className="font-semibold text-[13.5px] ">
                {details.serviceLocation.locationFrom.name}{" "}
                {details.serviceLocation.locationFrom.postCode &&
                  `(${details.serviceLocation.locationFrom.postCode})`}
              </p>
              <p className="font-semibold text-[13.5px]">
                Floor ({details.serviceLocation.locationFrom.floor}),{" "}
                {details.serviceLocation.locationFrom.liftAvailable
                  ? "Lift available"
                  : "Lift not available"}
              </p>
            </div>
            {/* drop-off details */}
            <div className="flex flex-col space-y-[5px]">
              <p className="text-primary font-semibold text-[18px]">
                Drop-off Details:
              </p>
              <p className="font-semibold text-[13.5px] ">
                {details.serviceLocation.locationTo.name}{" "}
                {details.serviceLocation.locationTo.postCode &&
                  `(${details.serviceLocation.locationTo.postCode})`}
              </p>
              <p className="font-semibold text-[13.5px]">
                Floor ({details.serviceLocation.locationTo.floor}),{" "}
                {details.serviceLocation.locationTo.liftAvailable
                  ? "Lift available"
                  : "Lift not available"}
              </p>
            </div>
            {/* travel distance */}
            <div className="flex flex-col space-y-[5px]">
              <p className="text-primary font-semibold text-[18px]">
                Travel Distance:
              </p>
              <p className="font-semibold text-[14px] ">
                {details.moveDetails.mileage} miles
              </p>
            </div>
            {/* volume */}
            <div className="flex flex-col space-y-[5px]">
              <p className="text-primary font-semibold text-[18px]">Volume:</p>
              <p className="font-semibold text-[14px] ">
                {details.moveDetails.volume} CU/FT
              </p>
            </div>
            {/* duration */}
            {checkDuration() && (
              <div className="flex flex-col space-y-[5px]">
                <p className="text-primary font-semibold text-[18px]">
                  Duration:
                </p>
                <p className="font-semibold text-[14px] ">
                  {details.moveDetails.duration} hours
                </p>
              </div>
            )}
            {/* move date */}
            <div className="flex flex-col space-y-[5px]">
              <p className="text-primary font-semibold text-[18px]">
                Move date:
              </p>
              <p className="font-semibold text-[14px] ">
                {!details.moverDetails.moveDateFormatted
                  ? dayjs(details.moveDetails.moveDateRaw).format(
                      "dddd, MMMM D, YYYY"
                    )
                  : details.moverDetails.moveDateFormatted}
              </p>
            </div>

            {/* pickup time */}
            <div className="flex flex-col space-y-[5px]">
              <p className="text-primary font-semibold text-[18px]">
                Pickup Time:
              </p>
              <p className="font-semibold text-[14px] ">
                {details.moverDetails.moverTime}
              </p>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[40px] bg-gradient-to-t from-gray-100  to-transparent bg-opacity-50"></div>
        </div>

        <div className={` w-full mt-[20px] rounded-[10px]`}>
          {/* <div className="card-title justify-center text-primary py-[10px] font-bold flex items-center">
            <span className="">***</span>
            <h2>{details.moveDetails.movePackage} Package</h2>
            <span className="">***</span>
          </div> */}
          <h1 className="text-[22px] lg:text-2xl font-bold mb-[10px] md:mb-[0px] ">
            {details.moveDetails.movePackage} Package
          </h1>
        </div>

        <div className="relative">
          {/* move package features */}
          <div className="grid md:grid-cols-3 lg:grid-cols-1 lg:h-[200px] mt-[20px] gap-y-[10px] gap-x-[10px] overflow-auto scrollbar-thin scrollbar-track-gray-200/50 scrollbar-thumb-gray-500/20 scrollbar-default h-[200px] md:h-full mb-[10px] md:mb-[20px] pb-[30px]">
            <ul className=" mt-[0px] text-start text-[14px] w-full">
              <li className="border-b  py-[5px] flex items-center">
                <span className={`text-primary mr-[5px] `}>
                  <FiCheckCircle />
                </span>{" "}
                {features.f1}
              </li>
              <li className="border-b py-[5px] flex items-center">
                <span className={`text-primary mr-[5px] `}>
                  <FiCheckCircle />
                </span>{" "}
                {features.f2}
              </li>
              <li className="border-b py-[5px] flex items-center">
                <span className={`text-primary mr-[5px] `}>
                  <FiCheckCircle />
                </span>{" "}
                {features.f3}
              </li>
              <li className="border-b py-[5px] flex items-center">
                <span className={`text-primary mr-[5px] `}>
                  <FiCheckCircle />
                </span>{" "}
                {features.f4}
              </li>
              <li className="border-b py-[5px] flex items-center">
                <span className={`text-primary mr-[5px] `}>
                  <FiCheckCircle />
                </span>{" "}
                {features.f5}
              </li>
              <li className="border-b py-[5px] flex items-center">
                <span className={`text-primary mr-[5px] `}>
                  <FiCheckCircle />
                </span>{" "}
                {features.f6}
              </li>
              {features.f7 && (
                <li className="border-b py-[5px] flex items-center">
                  <span className={`text-primary mr-[5px] `}>
                    <FiCheckCircle />
                  </span>{" "}
                  {features.f7}
                </li>
              )}
              {features.f8 && (
                <li className="border-b py-[5px] flex items-center">
                  <span className={`text-primary mr-[5px] `}>
                    <FiCheckCircle />
                  </span>{" "}
                  {features.f8}
                </li>
              )}
              {features.f9 && (
                <li className="border-b py-[5px] flex items-center">
                  <span className={`text-primary mr-[5px] `}>
                    <FiCheckCircle />
                  </span>{" "}
                  {features.f9}
                </li>
              )}
              {features.f10 && (
                <li className="border-b py-[5px] flex items-center">
                  <span className={`text-primary mr-[5px] `}>
                    <FiCheckCircle />
                  </span>{" "}
                  {features.f10}
                </li>
              )}
              {features.f11 && (
                <li className="border-b py-[5px] flex items-center">
                  <span className={`text-primary mr-[5px] `}>
                    <FiCheckCircle />
                  </span>{" "}
                  {features.f11}
                </li>
              )}
              {features.f12 && (
                <li className="border-b py-[5px] flex items-center">
                  <span className={`text-primary mr-[5px] `}>
                    <FiCheckCircle />
                  </span>{" "}
                  {features.f12}
                </li>
              )}
            </ul>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[40px] bg-gradient-to-t from-gray-100  to-transparent bg-opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default SummaryDetails;
