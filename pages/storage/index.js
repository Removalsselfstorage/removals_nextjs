import NormalLayout from "@/layouts/NormalLayout";
import React from "react";
import Head from "next/head";
import { titleFont } from "@/utils/fonts";

const Storage = () => {
  return (
    <>
      <Head>
        <title>Storage - Removals and Selfstorage</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>

      <NormalLayout>
        <div className='bg-base-200 mt-[50px]  md:mt-[0px] md:pt-[70px] lg:pt-[100px]'>
          <div className='md:max-w-7xl mx-auto'>
            {/* Title */}
            <div className='w-full flex justify-center py-[50px]'>
              {/* <h3 className="text-4xl font-extrabold">Our Services</h3> */}
              <h3
                className={`${titleFont.variable} font-sans2 text-3xl lg:text-4xl font-extrabold flex-col items-center justify-center`}
              >
                <p className=''>Room Selector</p>{" "}
                <div className='w-full bg-primary/20 h-[20px] mt-[-12px] '></div>
              </h3>
            </div>
          </div>
        </div>
      </NormalLayout>
    </>
  );
};

export default Storage;
