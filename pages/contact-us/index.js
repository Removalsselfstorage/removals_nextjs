import NormalLayout from "@/layouts/NormalLayout";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { GoogleMap, Marker } from "react-google-maps"

const index = () => {
  return (
    <>
      <Head>
        <title>Contact Us - Removals and Selfstorage</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>
      <NormalLayout>
        <div className='bg-base-200 mt-[50px]  md:mt-[0px] md:pt-[70px] lg:pt-[100px]'>
          <div className='flex flex-col lg:flex-row space-y-16 lg:space-y-0 lg:space-x-[50px] text-center lg:text-left container xl:max-w-7xl mx-auto px-4 py-[20px] lg:px-8 lg:py-[50px]'>
            <div className='lg:flex-[1] order-2 lg:order-1 mt-[50px] lg:mt-[0px] lg:flex lg:items-center'>
              <div>
                <span className='text-primary-dark mb-2 block text-[15px] font-semibold'>
                  Contact Removals & Self Storage
                </span>
                <h1 className='text-3xl md:text-4xl font-extrabold mb-4'>
                  We're here for you.
                </h1>
                <h2 className='text-[14px] md:text-[16px] md:leading-relaxed font-medium text-gray-600'>
                  Your peace of mind is our priority. If you need answers, help
                  with an issue, or just a healthy dose of moral support–we’ll
                  get right on it.
                </h2>
                <div className='flex items-center justify-center lg:justify-start mt-[20px] w-full space-x-[20px]'>
                  <div className={"btn btn-primary md:btn-wide"}>
                    Help Center
                  </div>
                  <Link
                    href='/book'
                    className={"btn md:btn-wide btn-primary btn-outline"}
                  >
                    Book a move
                  </Link>
                </div>
              </div>
            </div>

            <div className='lg:flex-[1] order-1  lg:order-2 lg:flex  px-[20px] md:px-[0] justify-center md:hover:rotate-[5deg] duration-200'>
              <img
                src='/customer.jpg'
                alt='Album'
                className='rounded-tl-[100px] rounded-br-[100px]'
              />
            </div>
          </div>

          <div className='bg-white py-[50px] mt-[40px]'>
            <div className='flex flex-col  lg:flex-row space-y-16 lg:space-y-0 lg:space-x-[50px] text-center lg:text-left container xl:max-w-7xl mx-auto px-4 py-[20px] lg:px-8 lg:py-[50px]'>
              <div className='lg:flex-[1]  lg:flex  px-[20px] md:px-[0] justify-center'>
                <img
                  src='/map.png'
                  alt='map'
                  className='rounded-tl-[100px] rounded-br-[100px]'
                />
              </div>
              <div className='lg:flex-[1]  mt-[50px] lg:mt-[0px] lg:flex lg:items-center'>
                <div>
                  {/* <span className='text-primary-dark mb-2 block text-[15px] font-semibold'>
                    Contact Removals & Self Storage
                  </span> */}
                  <h1 className='text-[16px] md:text-[18px] font-extrabold mb-4'>
                    Removals & Self Storage HQ
                  </h1>
                  <p className='text-[14px] md:text-[16px] md:leading-relaxed font-medium text-gray-600'>
                    Removals Selfstorage Amwell St,
                  </p>
                  <p className='text-[14px] md:text-[16px] md:leading-relaxed font-medium text-gray-600'>
                    Islington LONDON EC1R 1UR United Kingdom
                  </p>

                  <div className='flex flex-col mt-[20px] gap-y-[10px] text-gray-600 text-[14px] md:text-[16px]'>
                    <p className=''>
                      KENT: Medway:{" "}
                      <span className='link link-hover'>
                        <a href='tel:01634 940721'>01634-940721</a>
                      </span>{" "}
                      | Tunbridge Wells:{" "}
                      <span className='link link-hover'>
                        <a href='tel:01892-234350'>01892 234350</a>
                      </span>{" "}
                      | Sevenoaks:{" "}
                      <span className='link link-hover'>
                        <a href='tel:01732-240501'>01732 240501</a>
                      </span>{" "}
                      | Gravesend:{" "}
                      <span className='link link-hover'>
                        <a href='tel:01474-632503'>01474 632503</a>
                      </span>
                    </p>
                    <p className=''>
                      ESSEX: Basildon:{" "}
                      <span className='link link-hover'>
                        <a href='tel:01268-937401'>01268 937401</a>
                      </span>{" "}
                      | Chelmsford:{" "}
                      <span className='link link-hover'>
                        <a href='tel:01425-206510'>01425 206510</a>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NormalLayout>
    </>
  );
};

export default index;
