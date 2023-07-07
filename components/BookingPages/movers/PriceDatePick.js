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

const PriceDatePick = () => {
  const rowRef = useRef(null);
  const [isMoved, setIsMoved] = useState(false);

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
    <div className="group mr-[20px] ml-[5px] relative border-b border-white/20 pb-[30px]  md:pb-[40px] mt-[10px] ">
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
        <div className="flex flex-col py-[20px] px-[20px] hover:cursor-pointer hover:border-secondary rounded-[20px] items-center justify-center border-[2px] group border-primary hover:scale-[1.07] duration-150">
          <p className="font-semibold text-primary whitespace-nowrap duration-150">
            Thu, sept 7
          </p>
          <p className="font-bold text-primary text-[24px] whitespace-nowrap">
            ₤ 456.68
          </p>
        </div>
        <div className="flex flex-col py-[20px] px-[20px] hover:cursor-pointer hover:border-secondary rounded-[20px] items-center justify-center border-[2px] border-primary hover:scale-[1.07] duration-150">
          <p className="font-semibold text-primary whitespace-nowrap">
            Fri, sept 8
          </p>
          <p className="font-bold text-primary text-[24px] whitespace-nowrap">
            ₤ 454.63
          </p>
        </div>
        <div className="flex flex-col py-[20px] px-[20px] hover:cursor-pointer hover:border-secondary rounded-[20px] items-center justify-center border-[2px] border-primary hover:scale-[1.07] duration-150">
          <p className="font-semibold text-primary whitespace-nowrap">
            Sat, sept 9
          </p>
          <p className="font-bold text-primary text-[24px] whitespace-nowrap">
            ₤ 452.18
          </p>
        </div>
        <div className="flex flex-col py-[20px] px-[20px] hover:cursor-pointer hover:border-secondary rounded-[20px] items-center justify-center border-[2px] border-primary hover:scale-[1.07] duration-150">
          <p className="font-semibold text-primary whitespace-nowrap">
            Sun, sept 10
          </p>
          <p className="font-bold text-primary text-[24px] whitespace-nowrap">
            ₤ 456.22
          </p>
        </div>
        <div className="flex flex-col py-[20px] px-[20px] hover:cursor-pointer hover:border-secondary rounded-[20px] items-center justify-center border-[2px] border-primary hover:scale-[1.07] duration-150">
          <p className="font-semibold text-primary whitespace-nowrap">
            Mon, sept 11
          </p>
          <p className="font-bold text-primary text-[24px] whitespace-nowrap">
            ₤ 450.38
          </p>
        </div>
        <div className="flex flex-col py-[20px] px-[20px] hover:cursor-pointer hover:border-secondary rounded-[20px] items-center justify-center border-[2px] border-primary hover:scale-[1.07] duration-150">
          <p className="font-semibold text-primary whitespace-nowrap">
            Tue, sept 12
          </p>
          <p className="font-bold text-primary text-[24px] whitespace-nowrap">
            ₤ 450.07
          </p>
        </div>
        <div className="flex flex-col py-[20px] px-[20px] hover:cursor-pointer hover:border-secondary rounded-[20px] items-center justify-center border-[2px] border-primary hover:scale-[1.07] duration-150">
          <p className="font-semibold text-primary whitespace-nowrap">
            Wed, sept 13
          </p>
          <p className="font-bold text-primary text-[24px] whitespace-nowrap">
            ₤ 448.88
          </p>
        </div>
        <div className="flex flex-col py-[20px] px-[20px] hover:cursor-pointer hover:border-secondary rounded-[20px] items-center justify-center border-[2px] border-primary hover:scale-[1.07] duration-150">
          <p className="font-semibold text-primary whitespace-nowrap">
            Thu, sept 14
          </p>
          <p className="font-bold text-primary text-[24px] whitespace-nowrap">
            ₤ 447.74
          </p>
        </div>
        <div className="flex flex-col py-[20px] px-[20px] hover:cursor-pointer hover:border-secondary rounded-[20px] items-center justify-center border-[2px] border-primary hover:scale-[1.07] duration-150">
          <p className="font-semibold text-primary whitespace-nowrap">
            Fri, sept 15
          </p>
          <p className="font-bold text-primary text-[24px] whitespace-nowrap">
            ₤ 446.46
          </p>
        </div>
        <div className="flex flex-col py-[20px] px-[20px] hover:cursor-pointer hover:border-secondary rounded-[20px] items-center justify-center border-[2px] border-primary hover:scale-[1.07] duration-150">
          <p className="font-semibold text-primary whitespace-nowrap">
            Sat, sept 7
          </p>
          <p className="font-bold text-primary text-[24px] whitespace-nowrap">
            ₤ 443.68
          </p>
        </div>
      </div>
      <BiSolidChevronRight
        className="absolute top-[28%] right-[-10px]  z-40 h-10 w-10 cursor-pointer text-white opacity-100 transition hover:scale-125 group-hover:opacity-100 hover:bg-green-700/60 hover:text-white rounded-full bg-primary/70"
        onClick={() => handleClick('right')}
      />
    </div>
  );
};

export default PriceDatePick;
