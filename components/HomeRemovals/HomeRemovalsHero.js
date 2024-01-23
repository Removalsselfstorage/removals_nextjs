import React, { useState } from "react";
// import HeroInputBox from "./HeroInputBox";
import Typed from "react-typed";
import { titleFont } from "@/utils/fonts";
import { RiCustomerService2Fill } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/router";

const HomeRemovalsHero = ({ title, img, subtitle, link, btnText }) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitLoading2, setSubmitLoading2] = useState(false);

  const router = useRouter();

  const submitHandle = () => {
    // toast.remove();
    setSubmitLoading(true);

    router.push("/book/man-and-van");
  };
  const submitHandle2 = () => {
    // toast.remove();
    setSubmitLoading2(true);

    router.push(`${link}`);
  };

  return (
    <div className=' bg-base-200 mt-[50px]  md:mt-[0px] md:pt-[70px] lg:pt-[100px]'>
      <div
        className='hero min-h-[70vh] md:min-h-[70vh] lg:min-h-[70vh] 2xl:min-h-[70vh] bg-black/80'
        style={{ backgroundImage: `url(/${img})` }}
      >
        <div className='hero-overlay bg-black/70 '></div>
        <div className='flex flex-col text-white items-center'>
          <h1
            className={`${titleFont.variable} font-sans2 text-center text-3xl lg:text-5xl font-bold mb-[10px] mt-[30px] md:mt-0 px-[20px]`}
          >
            {title}
          </h1>

          <p className='hidden md:flex text-[16px] md:text-[18px] mt-[10px] text-center px-[20px] md:w-[700px] leading-[30px] mb-[10px]'>
            {subtitle}
          </p>

          <div className='flex space-x-[20px] mt-[20px]'>
            {/* <div
                  onClick={submitHandle}
                  // disabled={submitLoading}
                  className="btn btn-secondary btn-wide"
                >
                  {!submitLoading && <span className="">Man and van</span>}
                  {submitLoading && (
                    <span className="loading loading-spinner loading-md text-white"></span>
                  )}
                </div> */}

            <div
              onClick={submitHandle2}
              // disabled={submitLoading2}
              className='btn btn-secondary btn-wide'
            >
              {!submitLoading2 && <span className=''>{btnText}</span>}
              {submitLoading2 && (
                <span className='loading loading-spinner loading-md text-white'></span>
              )}
            </div>

            {/* <a className="btn btn-secondary btn-wide">
                  Complete House Removal
                </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeRemovalsHero;
