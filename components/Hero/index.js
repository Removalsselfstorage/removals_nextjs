import React from 'react';
import HeroInputBox from './HeroInputBox';
import Typed from 'react-typed';
import { titleFont } from '@/utils/fonts';

const Hero = () => {
  return (
    <div className=" bg-base-200">
      <div
        className="hero min-h-[80vh]"
        style={{ backgroundImage: 'url(/hero_bg.png)' }}
      >
        <div className="hero-overlay bg-black/80"></div>
        <div className="hero-content flex-col text-white lg:flex-row lg:space-x-[50px] space-y-[20px]  md:max-w-7xl mx-auto">
          {/* Hero Text */}
          <div className="text-center lg:text-left">
            <p className="py-[20px]  text-[20px] lg:text-[30px] max-w-[550px] lg:max-w-[700px]">
              Looking for {''}
              <Typed
                strings={[
                  'Man and Van',
                  'Complete House Removal',
                  'Storage and self Store',
                ]}
                typeSpeed={50}
                backSpeed={10}
                loop
                className="text-[#ff7338] tracking-[-1px]"
              />
            </p>
            {/* <h1 className="text-4xl lg:text-5xl font-bold">Leave it to us</h1> */}
            <h1
              className={`${titleFont.variable} font-sans2 text-4xl lg:text-5xl font-bold mb-[10px]`}
            >
              Leave it to us
            </h1>
            <p className="py-[20px] max-w-[550px] lg:max-w-[670px] text-[18px] lg:text-[20px]">
              A stress-free move day is just a few clicks away. We’ve got you
              covered with easier-than-ever booking, flexible service options,
              friendly and experienced movers, competitive pricing, and the
              industry’s best customer support.
            </p>
            <p className="lg:pr-[30px] text-[24px] font-medium">
              We Move - We Store - We Deliver
            </p>
          </div>
          {/* Hero inputs */}
          <HeroInputBox />
        </div>
      </div>
    </div>
  );
};

export default Hero;
