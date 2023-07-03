import { titleFont } from '@/utils/fonts';
import React from 'react';
import { MdPayments, MdFreeCancellation } from 'react-icons/md';
import { BiTask, BiWorld } from 'react-icons/bi';

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
            <p className="">Our Services</p>{' '}
            <div className="w-full bg-primary/20 h-[20px] mt-[-12px] "></div>
          </h3>
        </div>

        {/* Services Cards */}
        <div className="py-[0px] px-[20px] lg:px-[100px] xl:px-[20px] grid md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-4 justify-center gap-[20px]">
          <div className="flex flex-col space-y-[10px]">
            <MdPayments className="text-[40px] md:text-[50px] text-secondary" />
            <h3 className="text-[18px] md:text-[23px] font-bold leading-[25px]">
              Multiple Payment Options.
            </h3>
            <p className="">Cash payment on-site or</p>
            <img
              src="/payment_methods.png"
              alt=""
              className="h-[20px] md:h-[40px] w-fit"
            />
          </div>

          <div className="flex flex-col space-y-[10px]">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
