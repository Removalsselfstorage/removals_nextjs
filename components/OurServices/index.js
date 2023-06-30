import { titleFont } from '@/utils/fonts';
import React from 'react';
import ServicesCard from './ServicesCard';

const OurServices = () => {
  return (
    <div className="mb-[50px]">
      <div className="md:max-w-7xl mx-auto">
        {/* Title */}
        <div className="w-full flex justify-center py-[50px]">
          {/* <h3 className="text-4xl font-extrabold">Our Services</h3> */}
          <h3
            className={`${titleFont.variable} font-sans2 text-4xl font-extrabold flex-col items-center justify-center`}
          >
            <p className="">Our Services</p>{' '}
            <div className="w-full bg-primary/20 h-[20px] mt-[-12px] "></div>
          </h3>
        </div>

        {/* Services Cards */}
        <div className="py-[0px] px-[20px] lg:px-[100px] xl:px-[20px] grid md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-4 justify-center gap-[20px]">
          <ServicesCard
            image="/svg/house_removal.svg"
            title="Complete House Moving"
            subTitle="Prices are estimated"
            price="115"
            f1="Studio Flat from ₤130"
            f2="1 bed Flat from ₤190"
            f3="2 Bed Flat/House from ₤295"
            f4="3 Bed House from ₤450"
          />
          <ServicesCard
            image="/svg/man_van.svg"
            title="Man with a Van"
            subTitle="Price per hour"
            price="45"
            f1="₤45 - 1 Man and Van"
            f2="₤65 - 2 Men and Van"
            f3="₤80 - 3 Men and Van"
            f4="Daily rate Man Van - ₤330"
          />
          <ServicesCard
            image="/svg/store.svg"
            title="Storage"
            subTitle="Prices per hour"
            price="45"
            f1="₤25 for 50 Square Feet"
            f2="₤45 for 75 Square Feet"
            f3="₤65 for 100 Square Feet"
            f4="₤75 for 150 Square Feet"
          />
          <ServicesCard
            image="/svg/hand_packing.svg"
            title="Handy Man / Packing Services"
            subTitle=""
            price="115"
            f1="₤110 Studio Flat"
            f2="₤170 One Bed Flat"
            f3="₤190 Two Bed Flat/House"
            f4="₤225 Three Bed Flat/House"
          />
        </div>
      </div>
    </div>
  );
};

export default OurServices;
