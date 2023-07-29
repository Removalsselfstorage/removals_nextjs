import React from "react";
import HeroInputBox from "./JoinUsBox";
import Typed from "react-typed";
import { titleFont } from "@/utils/fonts";
import { RiCustomerService2Fill } from "react-icons/ri";
import Link from "next/link";
import JoinUsBox from "./JoinUsBox";

const JoinUsHero = ({ providers, csrfToken, callbackUrl }) => {
  return (
    <div className=" bg-base-200 mt-[50px]  md:mt-[0px] md:pt-[100px]">
      <div
        className="hero min-h-[80vh] md:min-h-[80vh] lg:min-h-[80vh] 2xl:min-h-[80vh] bg-black/80"
        style={{ backgroundImage: "url(/hero_register.jpg)" }}
      >
        <div className="hero-overlay bg-black/70 "></div>
        <div className="hero-content flex-col text-white lg:flex-row md:space-x-[50px] space-y-[0px] md:px-[50px] md:max-w-7xl mx-auto">
          {/* Hero Text */}
          <div className=" hidden lg:flex lg:flex-col lg:flex-[1] md:justify-between h-full">
            {/* need help */}
            {/* <div className="flex items-center mb-[70px] space-x-[20px]">
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
            </div> */}
            <div className="text-center md:text-left">
              <h1
                className={`${titleFont.variable} font-sans2 text-3xl lg:text-5xl font-bold mb-[10px]`}
              >
                Earn from £1850 /week
              </h1>
              {/* <h1
                className={`${titleFont.variable} font-sans2 text-3xl lg:text-5xl font-bold mb-[10px]`}
              >
                Join us to Maximise your revenue
              </h1> */}
              <p className="py-[20px] max-w-[550px] lg:max-w-[670px] text-[16px] lg:text-[17px] hidden md:flex mb-[50px]">
                We are always looking to partner with more top-rated, committed
                professionals. If you are looking to grow your business and have
                a passion for customer service, complete our quick and easy
                registration process and become one of our valued partners.
              </p>
              <div className="flex space-x-[20px] mt-[20px] text-[14px] items-center">
                <p className="">Already have an account? </p>
                <Link href="/login" className="btn btn-secondary btn-wide">
                  Sign In
                </Link>
                {/* <a className="btn btn-secondary btn-wide">
                  Complete House Removal
                </a> */}
              </div>
            </div>
          </div>
          {/* Hero inputs */}
          <div className="lg:flex-[1] w-full flex justify-center">
            <JoinUsBox
              providers={providers}
              csrfToken={csrfToken}
              callbackUrl={callbackUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUsHero;
