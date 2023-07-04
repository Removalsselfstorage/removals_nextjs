import React from 'react';
import HeroInputBox from './HeroInputBox';
import Typed from 'react-typed';
import { titleFont } from '@/utils/fonts';
import { RiCustomerService2Fill } from 'react-icons/ri';

const Hero = () => {
  return (
    <div className=" bg-base-200 mt-[50px]  md:mt-[0px] md:pt-[100px]">
      <div
        className="hero min-h-[95vh] md:min-h-[80vh] lg:min-h-[90vh] 2xl:min-h-[80vh] bg-black/80"
        style={{ backgroundImage: 'url(/hero_bg.jpg)' }}
      >
        <div className="hero-overlay bg-black/80 "></div>
        <div className="hero-content  flex-col text-white lg:flex-row md:space-x-[50px] space-y-[0px] md:px-[50px] md:max-w-7xl mx-auto">
          {/* Hero Text */}
          <div className=" hidden lg:flex lg:flex-col md:justify-between h-full">
            {/* need help */}
            <div className="flex items-center mb-[70px] space-x-[20px]">
              <img
                src="/customer_agent.jpg"
                alt=""
                className="rounded-full h-[50px] w-[50px]"
              />
              <div className="flex flex-col space-y-[5px]">
                <p className="hidden lg:flex text-secondary">Need help?</p>
                <div className="flex items-center ml-[0px] space-x-[7px]">
                  <RiCustomerService2Fill size={30} className="" />
                  <a href="tel:07869116203" className="link link-hover">
                    <p className="text-[20px]">07869116203</p>
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center md:text-left">
              {/* <p className="py-[20px]  text-[20px] lg:text-[30px] max-w-[550px] lg:max-w-[700px] ">
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
                </p> */}
              <h1
                className={`${titleFont.variable} font-sans2 text-3xl lg:text-5xl font-bold mb-[10px]`}
              >
                Let's help you move
              </h1>
              <p className="py-[20px] max-w-[550px] lg:max-w-[670px] text-[16px] lg:text-[18px] hidden md:flex mb-[50px]">
                A stress-free move day is just a few clicks away. We’ve got you
                covered with easier-than-ever booking, flexible service options,
                friendly and experienced movers, competitive pricing, and the
                industry’s best customer support.
              </p>
              <div className="flex space-x-[20px] mt-[20px]">
                <a className="btn btn-secondary btn-wide">Man & van</a>
                <a className="btn btn-secondary btn-wide">
                  Complete House Removal
                </a>
              </div>
            </div>
          </div>
          {/* Hero inputs */}
          <div className="">
            <HeroInputBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
