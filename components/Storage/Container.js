import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Container = ({
  img,
  title,
  rate,
  dimension,
  note,
  duration,
  handleDurationChange,
  quantity,
  handleDurationChange2,
  submitStatus,
  stage,
  setStage,
  containerSize,
  setContainerSize,
  price,
  price2,
  setPrice,
}) => {
  const router = useRouter();
  const { query } = router;

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col lg:flex-row lg:space-x-[50px] space-y-[20px] lg:space-y-0 py-[50px]'>
        {/* image */}
        <div className='flex-[1.7]'>
          <img src={img} className='h-[400px] w-full object-contain' alt='' />
        </div>
        {/* body content */}
        <div className='flex flex-col flex-[1]'>
          <p className='font-bold text-[18px] mb-[7px] text-primary'>{title}</p>
          <p className='font-bold text-[24px] mb-[10px] text-primary'>
            £{(duration * price * quantity).toFixed(2)} / week
          </p>
          {/* <p className='font-semibold mb-[20px]'>( £{rate} / Week )</p> */}
          <p className=' mb-[20px]'>
            <span className='font-semibold'>Dimension: </span>
            <span className=''>{dimension}</span>
          </p>
          <p className=' mb-[20px] text-[15px]'>
            {/* <span className='font-semibold'> NB: </span> */}
            <span className=''>{note}</span>
          </p>
          {/* <div className='flex flex-col space-y-[10px] md:flex-row md:items-center md:space-y-0 md:space-x-[20px]'>
            <div className='flex items-center space-x-[10px]'>
              <p className=' font-semibold'>Quantity</p>
              <input
                type='number'
                min='1'
                step='1'
                placeholder='Quantity of container'
                className={`input input-primary w-[100px] h-[43px]`}
                onChange={(e) => handleDurationChange2(e)}
                value={quantity}
              />
            </div>
            <div className='flex items-center space-x-[10px]'>
              <p className=' font-semibold'>
                Duration{" "}
                <span className='text-[15px] font-medium'>(Wk(s))</span>
              </p>
              <input
                type='number'
                min='1'
                step='1'
                placeholder='Number of weeks'
                className={`input input-primary w-[100px] h-[43px]`}
                onChange={(e) => handleDurationChange(e)}
                value={duration}
              />
            </div>
          </div> */}
          {/* submit button*/}
          <div className=' mt-6 w-full '>
            <div className='flex flex-col '>
              <div className='flex items-center space-x-[10px]'>
                {/* <button
                  // onClick={removalFormSubmit}
                  // disabled={submitLoading}
                  className='btn btn-secondary btn-outline w-[200px] flex items-center space-x-[5px] h-[60px]'
                >
                   {
                  <span className=''>
                    <IoIosArrowBack className='text-[20px]' />
                  </span>
                }
                  {<span className=''>Previous</span>}
      
                </button> */}
                <button
                  onClick={() => {
                    setContainerSize(title);
                    setPrice(price);
                    router.push({
                      pathname: "/storage",
                      query: { stage: "payment" },
                    });
                  }}
                  // disabled={submitLoading}
                  className='btn btn-secondary w-[200px] flex items-center space-x-[5px] h-[60px]'
                >
                  {<span className=''>Select</span>}
                  {
                    <span className=''>
                      <IoIosArrowForward className='text-[20px]' />
                    </span>
                  }
                </button>
              </div>
              {/* {submitStatus === "error" && (
                <div className='text-[14px] mt-[15px] text-secondary bg-secondary/20 rounded-[10px] py-[10px] px-[30px]'>
                  Please input a duration.
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
      <p className=' mb-[20px]  text-[14px] w-full lg:px-[50px] text-center'>
        <span className='font-semibold'> NB: </span>
        <span className=''>
          Unsure what size unit you need? Call us on{" "}
          <span className='link link-hover font-semibold text-primary'>
            <a href='tel:01634 940721'>01634-940721</a>
          </span>{" "}
          and let us help. You can also upsize or downsize on your move in day.
          Images for illustrative purposes only.
        </span>
      </p>
    </div>
  );
};

export default Container;
