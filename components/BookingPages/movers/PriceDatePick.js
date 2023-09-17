import React, { useEffect, useRef, useState } from "react";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllDetails,
  updateLocationDetails,
  updateMoveDetails,
  updateMoverDetails,
  updatePickPrice,
} from "@/store/quoteSlice";
import dayjs from "dayjs";
import {
  calculatePrice,
  calculatePriceChange,
  calculatePriceDecrease,
  convertDateFormat,
  decreaseByPercentage,
  generatePriceArray,
  generatePriceList,
  generatePriceList2,
  generatePriceList3,
  generatePrices,
  getFormattedTodayDate,
  increaseByPercentage,
  trimDate,
} from "@/utils/logics";
import { formatDate } from "@/utils/moversLogic";

const PriceDatePick = ({ setShowLoader, setTodayPick }) => {
  const details = useSelector(getAllDetails);
  const dayOfWeek = dayjs(
    convertDateFormat(details.moverDetails.moveDate)
  ).format("ddd");
  const month = dayjs(convertDateFormat(details.moverDetails.moveDate)).format(
    "MMM"
  );
  const dayNumber = dayjs(
    convertDateFormat(details.moverDetails.moveDate)
  ).format("D");
  const year = dayjs(convertDateFormat(details.moverDetails.moveDate)).format(
    "YYYY"
  );

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

  const result = generatePriceList2(
    dayOfWeek,
    dayNumber,
    month,
    year,
    priceFirstDay,
    // priceSecondDay,
    // priceThirdDay,
    priceFridays,
    priceSaturdays,
    priceSundays,
    priceOtherDays
  );
  const result2 = generatePriceList3(
    dayOfWeek,
    dayNumber,
    month,
    year,
    priceFirstDay,
    priceFridays,
    priceSaturdays,
    priceSundays,
    priceOtherDays,
    priceFridaysAfter3Weeks,
    priceSaturdaysAfter3Weeks,
    priceSundaysAfter3Weeks,
    priceOtherDaysAfter3Weeks
  );

  const dispatch = useDispatch();

  const date = dayjs("2019-01-25").format("dddd, MMMM D, YYYY");

  // Mon Jul 31 2023 to 2023-07-31

  // console.log(result3);

  const rowRef = useRef(null);
  const [isMoved, setIsMoved] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");

  let isActivated2 = selectedPrice == details.moverDetails.dateId;

  const handleClick = (direction) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // console.log({ result2 });

  return (
    <div className="group mr-[20px] ml-[5px] relative border-b border-white/20 pb-[0px]  md:pb-[0px] mt-[10px] ">
      <BiSolidChevronLeft
        className={`group-hover:flex absolute hidden top-[28%]  left-[0px] z-40 h-10 w-10 cursor-pointer text-white  opacity-100 transition hover:scale-125 group-hover:opacity-100 hover:bg-green-700/60 hover:text-white rounded-full bg-primary/70
                    `}
        onClick={() => handleClick("left")}
      />
      {/* {pickPrice} */}
      <div
        className="flex items-center space-x-[10px] overflow-x-scroll scrollbar-thin scrollbar-track-primary/10 scrollbar-thumb-primary/50 scrollbar-default px-[20px]  pt-[20px] pb-[10px] mb-[10px]"
        ref={rowRef}
      >
        {result2.map((pr, index) => {
          // setSelectedPrice(pr.id);
          // let isActive = pr.id == selectedPrice;
          let isActivated = pr.id == details.moverDetails.dateId;
          // {!details.moverDetails.moveDateFormatted ? dayjs(details.moveDetails.moveDateRaw).format(
          //   'dddd, MMMM D, YYYY'
          // ) : details.moverDetails.moveDateFormatted}
          const date2 = formatDate(pr.date);
          const date = dayjs(`${date2}`).format("dddd, MMMM D, YYYY");
          const today = getFormattedTodayDate();

          const selectPrice = () => {
            setSelectedPrice(pr.id);
            setTimeout(() => {
              setShowLoader(true);
            }, 0);
            setTimeout(() => {
              setShowLoader(false);
            }, 1000);
            dispatch(
              updateMoverDetails({
                moverName: details.moverDetails.moverName,
                moverTime: details.moverDetails.moverTime,
                moverPrice: details.moverDetails.moverPrice,
                pickPrice: details.moverDetails.pickPrice,
                moveDateFormatted: date,
                dateId: pr.id,
              })
            );
            // if (index == 0) {
            //   dispatch(updatePickPrice(pr.price));
            // } else if (index == 1) {
            //   dispatch(updatePickPrice(pr.price));
            // } else if (index == 2) {
            //   dispatch(updatePickPrice(pr.price));
            // } else {
            //   // setPickPrice(priceThirdDay)
            //   dispatch(updatePickPrice(priceFirstDay));
            // }
            dispatch(updatePickPrice(pr.price));
            if (today == trimDate(pr.date)) {
              setTodayPick(true);
            } else {
              setTodayPick(false);
            }
          };

          return (
            <div key={pr.id}>
              <div
                onClick={selectPrice}
                className={`${
                  today == trimDate(pr.date)
                    ? "border-gray-300 text-gray-300 bg-white"
                    : pr.id == details.moverDetails.dateId
                    ? "border-secondary text-secondary bg-white"
                    : "text-primary hover:border-secondary border-primary"
                  // : "text-primary hover:border-secondary border-primary"
                } ${
                  pr.id == details.moverDetails.dateId
                    ? "border-secondary text-secondary bg-white"
                    : "text-primary hover:border-secondary border-primary"
                }  flex flex-col py-[10px] md:py-[15px] px-[10px] md:px-[15px] hover:cursor-pointer rounded-[20px] items-center justify-center border-[2px] group hover:scale-[1.07]  `}
              >
                <p className="font-semibold text-[14px] md:text-[15px]  whitespace-nowrap duration-150">
                  {trimDate(pr.date)}
                </p>
                <p className="font-bold text-[20px] md:text-[22px] whitespace-nowrap">
                  ₤ {pr.price}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <BiSolidChevronRight
        className="absolute top-[28%] right-[-10px]  z-40 h-10 w-10 cursor-pointer text-white opacity-100 transition hover:scale-125 group-hover:opacity-100 hover:bg-green-700/60 hover:text-white rounded-full bg-primary/70"
        onClick={() => handleClick("right")}
      />
    </div>
  );
};

export default PriceDatePick;
