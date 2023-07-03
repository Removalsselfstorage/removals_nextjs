import { titleFont } from '@/utils/fonts';
import React from 'react';
import { MdPayments, MdFreeCancellation } from 'react-icons/md';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoMailUnreadOutline } from 'react-icons/io5';
import { FaFileSignature } from 'react-icons/fa';

const HowItWorks = () => {
  return (
    <div className="mb-[30px] lg:mb-[50px]">
      <div className="md:max-w-7xl mx-auto">
        {/* Title */}
        <div className="w-full flex justify-center py-[50px]">
          {/* <h3 className="text-4xl font-extrabold">Our Services</h3> */}
          <h3
            className={`${titleFont.variable} font-sans2 text-3xl lg:text-4xl font-extrabold flex-col items-center justify-center`}
          >
            <p className="">How It Works</p>{' '}
            <div className="w-full bg-primary/20 h-[20px] mt-[-12px] "></div>
          </h3>
        </div>

        {/* How it works */}
        <div className="py-[0px] px-[20px] lg:px-[100px] xl:px-[20px] grid md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-4 justify-center gap-[20px]">
          <div className="flex flex-col space-y-[10px] items-center group relative">
            <FaArrowRightLong className="text-[40px] md:text-[50px] text-secondary absolute right-[-35px] top-[20%] hidden md:flex" />
            <div className="bg-secondary w-[100px] h-[100px] rounded-full flex justify-center items-center relative group-hover:scale-[1.15] duration-200">
              <RiCustomerService2Fill className="text-[40px] md:text-[50px] text-white" />
              <div className="flex justify-center items-center bg-primary rounded-full h-[50px] w-[50px] absolute top-[-10px] left-[-10px]">
                <p className="text-white text-[20px]">1</p>
              </div>
            </div>
            <p className="text-center text-[18px] px-[70px] lg:px-[10px]">
              Get a Quote and discuss your future move with our specialist
            </p>
          </div>
          <div className="flex flex-col space-y-[10px] items-center group relative">
            <FaArrowRightLong className="text-[40px] md:text-[50px] text-secondary absolute right-[-35px] top-[20%] hidden xl:flex" />
            <div className="bg-secondary w-[100px] h-[100px] rounded-full flex justify-center items-center relative group-hover:scale-[1.15] duration-200">
              <IoMailUnreadOutline className="text-[40px] md:text-[50px] text-white" />
              <div className="flex justify-center items-center bg-primary rounded-full h-[50px] w-[50px] absolute top-[-10px] left-[-10px]">
                <p className="text-white text-[20px]">2</p>
              </div>
            </div>
            <p className="text-center text-[18px] px-[70px] lg:px-[10px]">
              Schedule your move and receive Confirmation via email
            </p>
          </div>
          <div className="flex flex-col space-y-[10px] items-center group relative">
            <FaArrowRightLong className="text-[40px] md:text-[50px] text-secondary absolute right-[-35px] top-[20%] hidden md:flex" />
            <div className="bg-secondary w-[100px] h-[100px] rounded-full flex justify-center items-center relative group-hover:scale-[1.15] duration-200">
              <FaFileSignature className="text-[40px] md:text-[50px] text-white" />
              <div className="flex justify-center items-center bg-primary rounded-full h-[50px] w-[50px] absolute top-[-10px] left-[-10px]">
                <p className="text-white text-[20px]">3</p>
              </div>
            </div>
            <p className="text-center text-[18px] px-[70px] lg:px-[10px]">
              On move day, just sign the contract. We’ll do the rest.
            </p>
          </div>
          <div className="flex flex-col space-y-[10px] items-center group relative">
            {/* <FaArrowRightLong className="text-[40px] md:text-[50px] text-secondary absolute right-[-35px] top-[20%] animate-bounce" /> */}
            <div className="bg-secondary w-[100px] h-[100px] rounded-full flex justify-center items-center relative group-hover:scale-[1.15] duration-200">
              <IoMailUnreadOutline className="text-[40px] md:text-[50px] text-white" />
              <div className="flex justify-center items-center bg-primary rounded-full h-[50px] w-[50px] absolute top-[-10px] left-[-10px]">
                <p className="text-white text-[20px]">4</p>
              </div>
            </div>
            <p className="text-center text-[18px] px-[70px] lg:px-[50px]">
              Pay your bill and enjoy your new place
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
