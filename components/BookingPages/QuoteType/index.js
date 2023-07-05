import React, { useState } from 'react';
import ServicesCard from '../../HomePage/OurServices/ServicesCard';
import { titleFont } from '@/utils/fonts';
import QuoteCard from './QuoteCard';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import Link from 'next/link';

const QuoteType = () => {
  return (
    <div className="mb-[30px] lg:mb-[50px] pt-[100px]">
      <div className="md:max-w-7xl mx-auto">
        {/* links */}
        <div className="flex items-center px-[30px] text-[16px]">
          <Link href="/">
            <p className="text-primary link link-hover font-semibold">Home</p>
          </Link>
          <MdKeyboardArrowRight size={20} className="text-primary" />
          <p className="text-primary font-semibold">Choose Quote Type</p>
          {/* <MdKeyboardArrowRight size={20}/> */}
        </div>

        {/* Title */}
        <div className="w-full flex justify-center py-[30px] md:py-[40px]">
          {/* <h3 className="text-4xl font-extrabold">Our Services</h3> */}
          <h3
            className={`${titleFont.variable} font-sans2 text-3xl lg:text-4xl font-extrabold flex-col items-center justify-center`}
          >
            <p className="">Choose Quote Type</p>{' '}
            <div className="w-full bg-primary/20 h-[20px] mt-[-12px] "></div>
          </h3>
        </div>

        {/* Services Cards */}
        <div className="py-[0px] px-[20px] flex flex-col md:flex-row justify-center items-center space-y-[20px] md:space-y-0 md:space-x-[20px] lg:space-x-[30px]">
          <QuoteCard
            image="/svg/house_removal.svg"
            title="Complete House Moving"
            link="complete-house"
          />
          <QuoteCard
            image="/svg/man_van.svg"
            title="Man and Van"
            link="man-and-van"
          />
        </div>

        {/* Next button */}
        {/* <div className="w-full mt-[50px] flex justify-center">
          <button className="btn btn-primary btn-wide flex items-center space-x-[5px]">
            <span className="">Next</span>
            <span className="">
              <FiEdit className="text-[20px]" />
            </span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default QuoteType;
