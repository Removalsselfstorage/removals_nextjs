import React, { useRef, useState } from 'react';
import { BiSolidChevronLeft, BiSolidChevronRight } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

import {
  getAllDetails,
  updateLocationDetails,
  updateMoveDetails,
} from '@/store/quoteSlice';
import dayjs from 'dayjs';
import {
    calculatePrice,
  calculatePriceDecrease,
  calculatePriceDecrease2,
  calculatePriceDecrease3,
  increaseDateByThreeMonths,
  trimDate,
} from '@/utils/logics';

const PriceDatePick = () => {
  const details = useSelector(getAllDetails);
  const dayOfWeek = dayjs(details.moveDetails.moveDateRaw).format('ddd');
  const month = dayjs(details.moveDetails.moveDateRaw).format('MMM');
  const dayNumber = dayjs(details.moveDetails.moveDateRaw).format('D');
  const year = dayjs(details.moveDetails.moveDateRaw).format('YYYY');

  const price = 100;
  const generalDecrement = 0.01; // 2% decrement
  const decrementPercentages = {
    Sun: 0.01,
    Mon: 0.02,
    Tue: 0.03,
    Wed: 0.04,
    Thu: 0.05,
    Fri: 0.06,
    Sat: 0.07,
  };

  const startingPrice = 100;
  const generalDecrementPercentage = 2;
  const dailyDecrementPercentages = [-1, -1, 0, 1, 1, 0, 3];

  const updatedPrices = calculatePrice(startingPrice, generalDecrementPercentage, dailyDecrementPercentages);
  console.log(updatedPrices);

  //   const dayOfWeek = "Mon";
  //   const dayNumber = 15;
  //   const month = "Apr";
  //   const year = 2023;

  //   const result = increaseDateByThreeMonths(dayOfWeek, dayNumber, month, year);
  //   console.log(result);

  //   const result = calculatePriceDecrease2(
  //     dayOfWeek,
  //     dayNumber,
  //     month,
  //     year,
  //     price,
  //     generalDecrement,
  //     decrementPercentages
  //   );
  //   console.log(result);

  const result = calculatePriceDecrease3(
    dayOfWeek,
    dayNumber,
    month,
    year,
    price,
    generalDecrement,
    decrementPercentages
  );
//   console.log(result);

  const allDatePrice = [
    { id: 'Thu, sept 7', date: 'Fri, sept 8', price: '456.68' },
    { id: 'Fri, sept 8', date: 'Fri, sept 8', price: '454.63' },
    { id: 'Sat, sept 9', date: 'Sat, sept 9', price: '452.18' },
    { id: 'Sun, sept 10', date: 'Sun, sept 10', price: '456.22' },
    { id: 'Mon, sept 11', date: 'Mon, sept 11', price: '450.38' },
    { id: 'Tue, sept 12', date: 'Tue, sept 12', price: '450.07' },
    { id: 'Wed, sept 13', date: 'Wed, sept 13', price: '448.88' },
    { id: 'Thu, sept 14', date: 'Thu, sept 14', price: '447.74' },
    { id: 'Fri, sept 15', date: 'Fri, sept 15', price: '446.46' },
    { id: 'Sat, sept 16', date: 'Sat, sept 16', price: '443.68' },
    { id: 'Sun, sept 17', date: 'Sun, sept 17', price: '451.63' },
  ];

  const rowRef = useRef(null);
  const [isMoved, setIsMoved] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const handleClick = (direction) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };
  return (
    <div className="group mr-[20px] ml-[5px] relative border-b border-white/20 pb-[0px]  md:pb-[0px] mt-[10px] ">
      <BiSolidChevronLeft
        className={`absolute top-[28%] left-[0px] z-40 h-10 w-10 cursor-pointer text-white  opacity-100 transition hover:scale-125 group-hover:opacity-100 hover:bg-green-700/60 hover:text-white rounded-full bg-primary/70
                    ${!isMoved && 'hidden'}
                    `}
        onClick={() => handleClick('left')}
      />
      <div
        className="flex items-center space-x-[10px] overflow-x-scroll scrollbar-hide px-[20px]  py-[20px]"
        ref={rowRef}
      >
        {result.map((pr, index) => {
          let isActive = pr.id == selectedPrice;
          return (
            <div key={pr.id}>
              <div
                onClick={() => setSelectedPrice(pr.id)}
                className={`${
                  isActive
                    ? 'border-secondary text-secondary bg-white'
                    : 'text-primary hover:border-secondary border-primary'
                } flex flex-col py-[10px] md:py-[15px] px-[10px] md:px-[15px] hover:cursor-pointer rounded-[20px] items-center justify-center border-[2px] group hover:scale-[1.07]  `}
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
        onClick={() => handleClick('right')}
      />
    </div>
  );
};

export default PriceDatePick;
