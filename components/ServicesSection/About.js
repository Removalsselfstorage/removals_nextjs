import { titleFont } from "@/utils/fonts";
import React, { useState } from "react";
import { useRouter } from "next/router";

const About = ({
  sectionTitle,
  title1,
  sub1a,
  sub1b,
  img1,
  title2,
  sub2a,
  sub2b,
  img2,

  btnText,
  btn1,
  btn2,
  link,
}) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitLoading2, setSubmitLoading2] = useState(false);

  const router = useRouter();

  const submitHandle = () => {
    // toast.remove();
    setSubmitLoading(true);

    router.push(`${link}`);
  };

  return (
    <div className='mb-[30px] lg:mb-[50px]'>
      <div className='md:max-w-7xl mx-auto'>
        {/* Title */}
        <div className='w-full flex justify-center py-[50px]'>
          {/* <h3 className="text-4xl font-extrabold">Our Services</h3> */}
          <h3
            className={`${titleFont.variable} font-sans2 text-3xl lg:text-4xl font-extrabold flex-col items-center justify-center`}
          >
            <p className=''>{sectionTitle}</p>{" "}
            <div className='w-full bg-primary/20 h-[20px] mt-[-12px] '></div>
          </h3>
        </div>

        {/* row 1 */}
        <div className='flex  flex-col space-y-[30px] md:flex-row md:px-[20px] lg:px-0 md:items-center  md:space-y-[0px] mb-[50px]'>
          {/* image */}
          <div className='flex-[0.8] flex px-[20px] md:px-[0] justify-center md:hover:rotate-[5deg] duration-200'>
            <img
              src={img1}
              alt='Album'
              className='w-[400px] h-[450px] object-cover rounded-tl-[100px] rounded-br-[100px]'
            />
          </div>
          {/* text */}
          <div className='flex-[1] flex flex-col lg:flex-row  space-y-[20px] lg:space-y-[0]'>
            <div className='w-full flex flex-col space-y-[20px] md:space-y-[30px] px-[40px] lg:px-[10px]'>
              <h2 className='text-2xl font-bold '>{title1}</h2>
              <p className='text-[16px] lg:text-[17px]'>{sub1a}</p>
              <p className='text-[16px] lg:text-[17px]'>{sub1b}</p>
              {btn1 && (
                <div
                  onClick={submitHandle}
                  disabled={submitLoading}
                  className='btn btn-secondary btn-wide'
                >
                  {!submitLoading && <span className=''>{btnText}</span>}
                  {submitLoading && (
                    <span className='loading loading-spinner loading-md text-white'></span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* row 2 */}
        <div className='flex items-center flex-col space-y-[30px] md:flex-row-reverse md:px-[20px] lg:pl-[50px] md:items-center md:space-y-[0px]'>
          {/* image */}
          <div className='flex-[0.8] flex px-[20px] md:px-[0] justify-center md:hover:rotate-[5deg] duration-200'>
            <img
              src={img2}
              alt='Album'
              className='w-[400px] h-[450px] object-cover rounded-tl-[100px] rounded-br-[100px]'
            />
          </div>
          {/* text */}
          <div className='flex-[1] flex flex-col lg:flex-row  space-y-[20px] lg:space-y-[0]'>
            <div className='w-full flex flex-col space-y-[20px] md:space-y-[30px] px-[40px] lg:px-[10px]'>
              <h2 className='text-2xl font-bold '>{title2}</h2>
              <p className='text-[16px] lg:text-[17px]'>{sub2a}</p>
              <p className='text-[16px] lg:text-[17px]'>{sub2b}</p>

              {btn2 && (
                <div
                  onClick={submitHandle}
                  disabled={submitLoading}
                  className='btn btn-secondary btn-wide'
                >
                  {!submitLoading && <span className=''>{btnText}</span>}
                  {submitLoading && (
                    <span className='loading loading-spinner loading-md text-white'></span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
