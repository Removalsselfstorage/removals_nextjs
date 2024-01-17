import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Lottie from "lottie-react";
// import success from "@/lottieJsons/schmates_success.json";
import { useRouter } from "next/router";
import { MdError } from "react-icons/md";
const Error = ({}) => {
  const router = useRouter();

  return (
    <>
      <div className='flex justify-center w-full mb-[20px] mt-[100px]'>
        <MdError className='text-secondary text-[80px]' />
        {/* <Lottie animationData={success} className='w-[200px]' /> */}
      </div>

      <div className='w-full flex flex-col items-center '>
        <p className='mt-2 text-2xl md:text-4xl font-extrabold tracking-tight text-primary sm:text-5xl'>
          Payment Canceled / Error
        </p>
        <p className='mt-2 text-base text-gray-500 max-w-[450px] md:max-w-[600px] text-center px-[20px]'>
          We appreciate your interest, your payment was not successful. Please
          return to Storage page and try again!
        </p>
      </div>

      {/* {submitStatus === "success" && (
        <div className='mx-[20px] flex justify-center text-[14px] mt-[40px] text-green-800 bg-green-800/20 rounded-[10px] py-[10px] px-[30px]'>
          {redirect ? (
            <div className='flex items-center space-x-[10px]'>
              <span className='loading loading-dots loading-md'></span>{" "}
              <p className=''>Redirecting to portal login.</p>
            </div>
          ) : (
            <p className=''>Registration completed successfully!</p>
          )}
        </div>
      )} */}

      <div className='w-full mt-10 flex justify-center items-center mb-[100px]'>
        <div
          //   href='https://schoolmatesdemo.vercel.app/'
          onClick={() => {
            // handleError();
            router.push({
              pathname: "/storage",
              // query: { status: "success" },
            });
          }}
          //   disabled={submitLoading}
          className='btn btn-secondary btn-wide'
        >
          {/* Return to Dashboard */}
          {<span className=''>Try Again</span>}
        </div>
      </div>
    </>
  );
};

export default Error;
