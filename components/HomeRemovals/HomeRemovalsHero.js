import React from "react";
// import HeroInputBox from "./HeroInputBox";
import Typed from "react-typed";
import { titleFont } from "@/utils/fonts";
import { RiCustomerService2Fill } from "react-icons/ri";
import Link from "next/link";

const HomeRemovalsHero = ({title, img}) => {
  return (
    <div className=" bg-base-200 mt-[50px]  md:mt-[0px] md:pt-[70px] lg:pt-[100px]">
      <div
        className="hero min-h-[40vh] md:min-h-[50vh] lg:min-h-[50vh] 2xl:min-h-[50vh] bg-black/80"
        style={{ backgroundImage: `url(/${img})` }}
      >
        <div className="hero-overlay bg-black/70 "></div>
        <div className="flex flex-col text-white items-center">
          <h1
            className={`${titleFont.variable} font-sans2 text-3xl lg:text-5xl font-bold mb-[10px]`}
          >
            {title}
          </h1>
       
        </div>
      </div>
    </div>
  );
};

export default HomeRemovalsHero;
