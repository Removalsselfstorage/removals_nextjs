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

const ReserveSide = () => {
  const {
    setReserveDetailsFxn,
    updateReserveDetailsFxn,
    resetReserveDetailsFxn,
    reserveDetails,
    reserveId,
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

  const {
    moveItems,

    // BEDROOM
    updateQtyInBedroomFxn,
    increaseQtyInBedroomFxn,
    decreaseQtyInBedroomFxn,
    addNewItemToBedroomFxn,

    //LIVING
    increaseQtyInLivingFxn,
    decreaseQtyInLivingFxn,
    addNewItemToLivingFxn,

    //
  } = useMoveItems();

  // const details = useSelector(getAllDetails);

  const checkDuration = () => {
    switch (reserveDetails?.propertyType) {
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

  let targetDate = new Date(reserveDetails?.moveDate);

  if (reserveDetails?.moverTime) {
    const [startTime, endTime] = reserveDetails?.moverTime?.split(" - ") || [];
    const ct = convertTimeTo24HourFormat(startTime);
    targetDate.setHours(ct);
  }

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

  console.log({ reserveDetails });

  return (
    <div className='bg-white shadow-lg rounded-[30px] py-[30px] px-[20px] md:px-[30px] w-full lg:sticky lg:top-[80px]'>
      <div className=''>
        <div className=' mb-[20px]'>
          <Link
            href={`/reservations/message2/${reserveDetails?.bookingId}`}
            className='btn btn-primary '
          >
            <div className="flex items-center space-x-[5px]">
              <p className="">Chat Admin</p>
              <span>
                <TbBrandWechat className='text-[20px]' />
              </span>
            </div>
          </Link>
        </div>

        {calculateCountdownDay() && (
          <div className=' mb-[20px]'>
          <Link
            href={`/reservations/message/${reserveDetails?.bookingId}`}
            className='btn btn-secondary '
          >
            <div className="flex items-center space-x-[5px]">
              <p className="">Chat Mover</p>
              <span>
                <TbBrandWechat className='text-[20px]' />
              </span>
            </div>
          </Link>
        </div>
        )}
        <p className='text-[20px] font-bold mb-[10px] md:mb-[20px]'>
          Book Summary
        </p>
        <div className='relative'>
          <div className='grid md:grid-cols-3 lg:grid-cols-1 gap-y-[10px] gap-x-[10px] overflow-auto scrollbar-thin scrollbar-track-gray-200/50 scrollbar-thumb-gray-500/20 scrollbar-default h-[200px] md:h-full'>
            <div className='flex flex-col space-y-[5px]'>
              <p className='text-primary font-semibold text-[18px]'>
                Book Date:
              </p>
              <p className='font-semibold text-[13.5px] '>
                {reserveDetails?.date}
              </p>
            </div>
            {/* <div className="flex flex-col space-y-[5px]">
              <p className="text-primary font-semibold text-[18px]">Book Id:</p>
              <p className="font-semibold text-[13.5px] ">
                {reserveDetails?.bookingId}
              </p>
            </div> */}

            <div className='flex flex-col space-y-[5px]'>
              <p className='text-primary font-semibold text-[18px]'>
                Book Ref:
              </p>
              <p className='font-semibold text-[13.5px] '>
                {reserveDetails?.quoteRef}
              </p>
            </div>
            <div className='flex flex-col space-y-[5px]'>
              <p className='text-primary font-semibold text-[18px]'>Mover:</p>
              <p className='font-semibold text-[13.5px] '>
                {reserveDetails?.moverName}
              </p>
            </div>
            <div className='flex flex-col space-y-[5px]'>
              <p className='text-primary font-semibold text-[18px]'>Package:</p>
              <p className='font-semibold text-[13.5px] '>
                {reserveDetails?.propertyType} - ({reserveDetails?.movePackage})
              </p>
            </div>
            <div className='flex flex-col space-y-[5px]'>
              <p className='text-primary font-semibold text-[18px]'>
                Pick-up Details:
              </p>
              <p className='font-semibold text-[13.5px] '>
                {reserveDetails?.address1}{" "}
                {reserveDetails?.postCode1 && `(${reserveDetails?.postCode1})`}
              </p>
              <p className='font-semibold text-[13.5px]'>
                Floor ({reserveDetails?.floor1}),{" "}
                {reserveDetails?.liftAvailable1
                  ? "Lift available"
                  : "Lift not available"}
              </p>
            </div>
            <div className='flex flex-col space-y-[5px]'>
              <p className='text-primary font-semibold text-[18px]'>
                Drop-off Details:
              </p>
              <p className='font-semibold text-[13.5px] '>
                {reserveDetails?.address2}{" "}
                {reserveDetails?.postCode2 && `(${reserveDetails?.postCode2})`}
              </p>
              <p className='font-semibold text-[13.5px]'>
                Floor ({reserveDetails?.floor2}),{" "}
                {reserveDetails?.liftAvailable2
                  ? "Lift available"
                  : "Lift not available"}
              </p>
            </div>
            <div className='flex flex-col space-y-[5px]'>
              <p className='text-primary font-semibold text-[18px]'>
                Travel Distance:
              </p>
              <p className='font-semibold text-[13.5px] '>
                {reserveDetails?.mileage} miles
              </p>
            </div>
            <div className='flex flex-col space-y-[5px]'>
              <p className='text-primary font-semibold text-[18px]'>Volume:</p>
              <p className='font-semibold text-[13.5px] '>
                {reserveDetails?.volume} CU/FT
              </p>
            </div>
            {checkDuration() && (
              <div className='flex flex-col space-y-[5px]'>
                <p className='text-primary font-semibold text-[18px]'>
                  Duration:
                </p>
                <p className='font-semibold text-[13.5px] '>
                  {reserveDetails?.duration} hours
                </p>
              </div>
            )}
            <div className='flex flex-col space-y-[5px]'>
              <p className='text-primary font-semibold text-[18px]'>
                Move Price:
              </p>
              <p className='font-semibold text-[13.5px] '>
                {formatMovePrice(reserveDetails?.moverPrice)}
              </p>
            </div>
            <div className='flex flex-col space-y-[5px]'>
              <p className='text-primary font-semibold text-[18px]'>
                Move Date:
              </p>
              <p className='font-semibold text-[13.5px]'>
                {!reserveDetails?.moveDateFormatted
                  ? dayjs(convertDateFormat(reserveDetails?.moveDate)).format(
                      "dddd, MMMM D, YYYY"
                    )
                  : reserveDetails?.moveDateFormatted}
              </p>
            </div>
            <div className='flex flex-col space-y-[5px]'>
              <p className='text-primary font-semibold text-[18px]'>
                Move Time:
              </p>
              <p className='font-semibold text-[13.5px] '>
                {reserveDetails?.moverTime}
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
