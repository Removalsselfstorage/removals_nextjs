import React from "react";
// import HeroInputBox from "./HeroInputBox";
import Typed from "react-typed";
import { titleFont } from "@/utils/fonts";
import { RiCustomerService2Fill } from "react-icons/ri";
import Link from "next/link";

const HomeRemovalsHero = () => {
  return (
    <div className=" bg-base-200 mt-[50px]  md:mt-[0px] md:pt-[70px] lg:pt-[100px]">
      <div
        className="hero min-h-[40vh] md:min-h-[50vh] lg:min-h-[50vh] 2xl:min-h-[50vh] bg-black/80"
        style={{ backgroundImage: "url(/hero_homeremovals.jpg)" }}
      >
        <div className="hero-overlay bg-black/70 "></div>
        <div className="flex flex-col text-white items-center">
          <h1
            className={`${titleFont.variable} font-sans2 text-3xl lg:text-5xl font-bold mb-[10px]`}
          >
            Home Removals
          </h1>
          {/* <p className="py-[20px] max-w-[550px] lg:max-w-[670px] text-[16px] lg:text-[18px] hidden md:flex mb-[50px] text-center">
            A stress-free move day is just a few clicks away. We’ve got you
            covered with easier-than-ever booking, flexible service options,
            friendly and experienced movers, competitive pricing, and the
            industry’s best customer support.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default HomeRemovalsHero;
