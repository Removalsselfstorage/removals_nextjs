import NormalLayout from "@/layouts/NormalLayout";
import React from "react";
import Head from "next/head";
import Link from "next/link";

const index = () => {
  return (
    <>
      <Head>
        <title>About Us - Removals and Selfstorage</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>
      <NormalLayout>
        <div className='bg-base-200 mt-[50px]  md:mt-[0px] md:pt-[70px] lg:pt-[100px]'>
          <section>
            <div className='w-full bg-white'>
              <div className='flex items-center font-bold text-[20px] py-[40px] justify-center space-x-[15px]'>
                <Link href='/'>
                  <span className='cursor-pointer hover:text-primary-dark'>
                    Home
                  </span>
                </Link>
                <span className=''>/</span>
                <span className=''>About Us</span>
              </div>
            </div>
          </section>

          <div className='flex flex-col lg:flex-row-reverse space-y-16 lg:space-y-0 text-center lg:text-left container xl:max-w-7xl mx-auto px-4 py-[30px] lg:px-8 lg:py-32'>
            <div className='lg:w-1/2 order-2 md:order-1 mt-[50px] md:mt-[0px] lg:flex lg:items-center'>
              <div>
                <span className='text-primary-dark mb-2 block text-lg font-semibold'>
                  Who are we
                </span>
                <h1 className='text-3xl md:text-4xl font-extrabold mb-4'>
                  The Best E-Learning Platform
                </h1>
                <h2 className='text-lg md:text-xl md:leading-relaxed font-medium text-gray-600'>
                  Build Skills with Online Courses from TLI expert instructors.{" "}
                  <br /> Explore a wide range of skills with our professional
                  tutorials.
                </h2>
                <div className='flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-2 pt-10 pb-16'>
                  <div className={"py-3 px-20 max-w-[400px] btn btn-primary"}>
                    Get Started
                  </div>
                </div>
              </div>
            </div>
            <div className='lg:w-1/2 lg:mr-16 order-1 md:order-2 lg:flex lg:justify-center lg:items-center'>
              <div className='lg:w-96 relative'>
                <div className='absolute pattern-dots-xl text-indigo-100 top-0 left-0 w-32 h-48 md:h-96 transform -translate-y-12 -translate-x-16 -rotate-3' />
                <div className='absolute pattern-dots-xl text-indigo-100 bottom-0 right-0 w-32 h-48 md:h-96 transform translate-y-12 translate-x-16 rotate-3' />
                <div className='absolute rounded-full top-0 right-0 w-32 h-32 bg-yellow-200 bg-opacity-50 -mt-12 -mr-12' />
                <div className='absolute rounded-xl bottom-0 left-0 w-32 h-32 bg-indigo-200 bg-opacity-50 -mb-10 -ml-10 transform rotate-3' />
                <img
                  src='https://cdn.tailkit.com/media/placeholders/photo-MChSQHxGZrQ-800x1000.jpg'
                  alt='Hero_Image'
                  className='relative rounded-lg mx-auto shadow-lg'
                />
              </div>
            </div>
          </div>
        </div>
      </NormalLayout>
    </>
  );
};

export default index;
