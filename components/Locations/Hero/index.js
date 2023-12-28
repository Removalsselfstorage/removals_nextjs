import React, { useState } from "react";
// import HeroInputBox from "./HeroInputBox";
import Typed from "react-typed";
import { titleFont } from "@/utils/fonts";
import { RiCustomerService2Fill } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/router";
import HeroInputBox from "./HeroInputBox";
import { motion } from "framer-motion";
import {
  heroVariant,
  appearVariant,
  downVariant,
  downVariant2,
  downVariant3,
} from "@/variants";

const LocationHero = ({ formattedCity }) => {
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

    router.push("/book/home-removals");
  };

  console.log({ formattedCity });

  return (
    <div className=' bg-[#f8f8f8]'>
      <div
        className='hero min-h-[80vh] md:min-h-[80vh] lg:min-h-[80vh] 2xl:min-h-[80vh] '
        // style={{ backgroundImage: "url(/road.png)" }}
        style={{
          backgroundImage: "url(/bg-tarvel4.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <div className='hero-overlay bg-black/70 '></div> */}
        <div className='hero-content flex-col  lg:flex-row md:space-x-[0px] space-y-[0px] md:px-[50px] md:max-w-7xl mx-auto pt-[70px] lg:pt-[10px]'>
          {/* Hero Text */}
          <div className=' flex lg:flex-col md:justify-between h-full md:flex-[0.5] lg:flex-[0.3]'>
            <div className='text-center lg:text-left md:pr-[0px]'>
              <motion.h1
                variants={downVariant}
                initial='start'
                animate='end'
                className={`${titleFont.variable} font-sans2 text-3xl lg:text-5xl font-bold mb-[10px]`}
              >
                {formattedCity?.sub} Removals
              </motion.h1>
              <motion.p
                variants={downVariant3}
                initial='start'
                animate='end'
                className='py-[20px] max-w-[550px] lg:max-w-[670px] text-[14px] lg:text-[17px] mb-[0px] md:mb-[30px]'
              >
                Save up-to 33% Moving with Transport Executive in{" "}
                {formattedCity?.sub}, {formattedCity?.city}. We’ve got you
                covered with easier-than-ever booking, flexible service options,
                friendly and experienced movers.
              </motion.p>
              <motion.div
                variants={downVariant3}
                initial='start'
                animate='end'
                className='flex space-x-[20px] mt-[20px] justify-center md:justify-start'
              >
                <div
                  // href="/book/man-and-van"
                  onClick={submitHandle}
                  disabled={submitLoading || submitLoading2}
                  className='btn btn-secondary md:btn-wide'
                >
                  {!submitLoading && <span className=''>Man and van</span>}
                  {submitLoading && (
                    <span className='loading loading-spinner loading-md text-white'></span>
                  )}
                </div>

                <div
                  // href="/book/home-removals"
                  onClick={submitHandle2}
                  disabled={submitLoading2 || submitLoading}
                  className='btn btn-secondary md:btn-wide'
                >
                  {!submitLoading2 && <span className=''> Home Removals</span>}
                  {submitLoading2 && (
                    <span className='loading loading-spinner loading-md text-white'></span>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
          {/* Hero inputs */}
          <motion.div
            variants={heroVariant}
            initial='start'
            animate='end'
            className='md:flex-[1] lg:flex-[1]'
          >
            {/* <HeroInputBox /> */}
            <img src='/van.png' alt='' className='' />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LocationHero;
