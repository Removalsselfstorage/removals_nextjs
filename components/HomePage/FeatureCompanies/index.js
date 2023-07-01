import HorizontalScroll from '@/components/HorizontalScroll';
import { titleFont } from '@/utils/fonts';
import React from 'react';

const FeaturedCompanies = () => {
  return (
    <div className="mb-[50px]">
      <div className="md:max-w-7xl mx-auto">
        {/* Title */}
        <div className="w-full flex justify-center py-[50px]">
          {/* <h3 className="text-4xl font-extrabold">Our Services</h3> */}
          <h3
            className={`${titleFont.variable} font-sans2 text-4xl font-extrabold flex-col items-center justify-center`}
          >
            <p className="">Featured Companies</p>{' '}
            <div className="w-full bg-primary/20 h-[20px] mt-[-12px] "></div>
          </h3>
        </div>

        {/* featured companies */}
        {/* <div className="  justify-center  px-[20px] py-[10px] flex overflow-hidden items-center divide-x-2">
            <img src="/ISO-9001.webp" alt="" className='h-[60px] lg:h-[80px] mix-blend-multiply'/>
            <img src="/fhio.webp" alt="" className='h-[60px] lg:h-[80px] mix-blend-multiply'/>
            <img src="/MTC-Ltd-logo_resized2-190x80.webp" alt="" className='h-[60px] lg:h-[80px] mix-blend-multiply'/>
            <img src="/logo-fidi_0-190x80.webp" alt="" className='h-[60px] lg:h-[80px] mix-blend-multiply'/>
            <img src="/iam-logo-190x80.webp" alt="" className='h-[60px] lg:h-[80px] mix-blend-multiply'/>
            <img src="/FAIM-2021.webp" alt="" className='h-[60px] lg:h-[80px] mix-blend-multiply'/>
        </div> */}
        <HorizontalScroll>
          <img
            src="/ISO-9001.webp"
            alt=""
            className="h-[60px] lg:h-[80px] mix-blend-multiply grayscale hover:grayscale-0 duration-200"
          />
          <img
            src="/fhio.webp"
            alt=""
            className="h-[60px] lg:h-[80px] mix-blend-multiply grayscale hover:grayscale-0 duration-200"
          />
          <img
            src="/FAIM-2021.webp"
            alt=""
            className="h-[60px] lg:h-[80px] mix-blend-multiply grayscale hover:grayscale-0 duration-200"
          />
          <img
            src="/MTC-Ltd-logo_resized2-190x80.webp"
            alt=""
            className="h-[60px] lg:h-[80px] mix-blend-multiply grayscale hover:grayscale-0 duration-200"
          />
          <img
            src="/logo-fidi_0-190x80.webp"
            alt=""
            className="h-[60px] lg:h-[80px] mix-blend-multiply grayscale hover:grayscale-0 duration-200"
          />
          <img
            src="/iam-logo-190x80.webp"
            alt=""
            className="h-[60px] lg:h-[80px] mix-blend-multiply grayscale hover:grayscale-0 duration-200"
          />
          <img
            src="/FAIM-2021.webp"
            alt=""
            className="h-[60px] lg:h-[80px] mix-blend-multiply grayscale hover:grayscale-0 duration-200"
          />
          <img
            src="/FAIM-2021.webp"
            alt=""
            className="h-[60px] lg:h-[80px] mix-blend-multiply grayscale hover:grayscale-0 duration-200"
          />
        </HorizontalScroll>
      </div>
    </div>
  );
};

export default FeaturedCompanies;
