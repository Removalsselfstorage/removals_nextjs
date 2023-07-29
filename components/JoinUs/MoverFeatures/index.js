import { titleFont } from "@/utils/fonts";
import React from "react";
import { MdPayments, MdFreeCancellation } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMailUnreadOutline } from "react-icons/io5";
import { FaFileSignature } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

const MoverFeatures = () => {
  return (
    <div className="mb-[30px] lg:mb-[50px]">
      <div className="md:max-w-7xl mx-auto">
        {/* How it works */}
        <div className="mt-[50px] py-[0px] px-[0px] lg:px-[100px] xl:px-[20px] grid md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-3 justify-center gap-y-[30px]">
          {/* feature 1 */}
          <div className="flex  px-[0px] md:border-r border-gray-500/50 justify-between items-center md:flex-col md:space-y-[10px] md:items-center md:justify-start group relative">
            <img
              src="/svg/reg11.svg"
              alt="house"
              className="h-[100px] md:h-[150px]"
            />
            <div className="flex-1">
              <p className="md:text-center text-[20px] md:text-[24px] font-bold px-[0px] md:px-[30px] lg:px-[0px]  md:w-full">
                Join for free
              </p>
              <p className="md:text-center md:text-[16px] px-[0px] md:px-[30px] lg:px-[50px] md:w-full">
                Build your profile and promote your business
              </p>
            </div>
          </div>
          {/* feature 2 */}
          <div className="flex  px-[0px] md:border-r border-gray-500/50 justify-between items-center md:flex-col md:space-y-[10px] md:items-center md:justify-start group relative">
            <img
              src="/svg/reg12.svg"
              alt="house"
              className="h-[100px] md:h-[150px]"
            />
            <div className="flex-1">
              <p className="md:text-center text-[20px] md:text-[24px] font-bold px-[0px] md:px-[30px] lg:px-[0px]  md:w-full">
                Set your terms
              </p>
              <p className="md:text-center md:text-[16px] px-[0px] md:px-[30px] lg:px-[50px] md:w-full">
                Select your preferred location, schedule and pricing
              </p>
            </div>
          </div>
          {/* feature 3 */}
          <div className="flex  px-[0px] md:border-r border-gray-500/50 justify-between items-center md:flex-col md:space-y-[10px] md:items-center md:justify-start group relative">
            <img
              src="/svg/reg13.svg"
              alt="house"
              className="h-[100px] md:h-[150px]"
            />
            <div className="flex-1">
              <p className="md:text-center text-[20px] md:text-[24px] font-bold px-[0px] md:px-[30px] lg:px-[0px]  md:w-full">
                Get new jobs
              </p>
              <p className="md:text-center md:text-[16px] px-[0px] md:px-[30px] lg:px-[50px] md:w-full">
                Get new appointments with customers every day
              </p>
            </div>
          </div>

          {/* feature 1 */}
          {/* <div className="flex justify-center items-center md:flex-col md:space-y-[10px] md:items-center md:justify-start group relative">
            <img
              src="/svg/reg13.svg"
              alt="house"
              className="h-[100px] md:h-[150px]"
            />
            <div className="">
              <p className="md:text-center text-[20px] md:text-[24px] font-bold px-[20px] md:px-[30px] lg:px-[0px] md:w-full">
                Get new jobs
              </p>
              <p className="md:text-center md:text-[16px] px-[20px] md:px-[30px] lg:px-[50px]  md:w-full">
                Get new appointments with customers every day
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MoverFeatures;
