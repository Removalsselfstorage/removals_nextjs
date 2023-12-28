import { titleFont } from "@/utils/fonts";
import React from "react";
// import ServicesCard from '../OurServices/ServicesCard';
import { MdPayments, MdFreeCancellation } from "react-icons/md";
import { BiTask, BiWorld } from "react-icons/bi";

const Features2 = ({ formattedCity }) => {
  return (
    <div className='mb-[0px] lg:mb-[20px] mt-[40px]'>
      <div className='md:max-w-7xl mx-auto'>
        {/* Features*/}
        <div className='pl-[10px] border-[2px] rounded-[30px] border-secondary mx-[10px] md:mx-[20px]'>
          <div className=' py-[20px] md:py-[30px] px-[20px] lg:px-[100px] xl:px-[20px] grid md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-4 justify-center  gap-x-[20px] gap-y-[20px] md:gap-[30px]'>
            <div className='flex space-x-[20px]'>
              <MdPayments className='text-[40px] md:text-[50px] text-secondary' />
              <div className='flex flex-col space-y-[5px] md:space-y-[10px]'>
                <h3 className='text-[18px] md:text-[23px] font-bold leading-[25px]'>
                  Multiple payment options
                </h3>
                <p className=''>Cash payment on-site or</p>
                <img
                  src='/payment_methods.png'
                  alt=''
                  className='h-[20px] md:h-[40px] w-fit'
                />
              </div>
            </div>
            <div className='flex space-x-[20px]'>
              <BiTask className='text-[40px] md:text-[50px] text-secondary' />
              <div className='flex flex-col space-y-[5px] md:space-y-[10px]'>
                <h3 className='text-[18px] md:text-[23px] font-bold leading-[25px]'>
                  Same & next day bookings
                </h3>
                <p className=''>Last minute move? We got you!</p>
              </div>
            </div>
            <div className='flex space-x-[20px]'>
              <MdFreeCancellation className='text-[40px] md:text-[50px] text-secondary' />
              <div className='flex flex-col space-y-[5px] md:space-y-[10px]'>
                <h3 className='text-[18px] md:text-[23px] font-bold leading-[25px]'>
                  Free cancellation
                </h3>
                <p className='w-[210px] md:w-[300px] lg:w-[210px]'>
                  {" "}
                  Cancel your booking for free or reschedule it for another
                  time.
                </p>
              </div>
            </div>

            <div className='flex space-x-[20px]'>
              <BiWorld className='text-[40px] md:text-[50px] text-secondary' />
              <div className='flex flex-col space-y-[5px] md:space-y-[10px]'>
                <h3 className='text-[18px] md:text-[23px] font-bold leading-[25px]'>
                  {formattedCity?.sub} coverage
                </h3>
                <p className=''>
                  We cover the entire {formattedCity?.sub},{" "}
                  {formattedCity?.city}.
                </p>
              </div>
            </div>
            {/* <div className="flex flex-col space-y-[10px]">
                <BiTask className="text-[40px] md:text-[50px] text-secondary" />
                <h3 className="text-[18px] md:text-[23px] font-bold leading-[25px]">
                  Same & next day bookings
                </h3>
                <p className="">Last minute move? We got you!</p>
              </div>
              <div className="flex flex-col space-y-[10px]">
                <MdFreeCancellation className="text-[40px] md:text-[50px] text-secondary" />
                <h3 className="text-[18px] md:text-[23px] font-bold leading-[25px]">
                  Free cancellation
                </h3>
                <p className="">
                  Cancel your booking for free or reschedule it for another time.
                </p>
              </div>
              <div className="flex flex-col space-y-[10px]">
                <BiWorld className="text-[40px] md:text-[50px] text-secondary" />
                <h3 className="text-[18px] md:text-[23px] font-bold leading-[25px]">
                  Nationwide coverage
                </h3>
                <p className="">We cover the entire UK.</p>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features2;
