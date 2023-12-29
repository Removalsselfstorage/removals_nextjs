import NormalLayout from "@/layouts/NormalLayout";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { BsFillPlayFill } from "react-icons/bs";
import Modal from "@/components/Modal/Modal";
import FAQ from "@/components/HomePage/FAQ";
import OurReviews from "@/components/HomePage/OurReviews";

const index = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Head>
        <title>About Us - Removals and Selfstorage</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>
      <NormalLayout>
        <div className='bg-base-200 mt-[50px]  md:mt-[0px] md:pt-[70px] lg:pt-[100px]'>
          <div className='flex flex-col lg:flex-row space-y-16 lg:space-y-0 lg:space-x-[50px] text-center lg:text-left container xl:max-w-7xl mx-auto px-4 py-[20px] lg:px-8 lg:py-[50px]'>
            <div className='lg:flex-[1] lg:flex  px-[20px] md:px-[0] justify-center md:hover:rotate-[5deg] duration-200'>
              <img
                src='/movers1.jpg'
                alt='Customer_agent'
                // width={fit}
                // layout="fill"
                // objectFit="cover"
                className='rounded-tl-[100px] rounded-br-[100px]'
              />
            </div>
            <div className='lg:flex-[1]  mt-[50px] lg:mt-[0px] lg:flex lg:items-center'>
              <div>
                <span className='text-primary-dark mb-2 block text-[15px] font-semibold'>
                  Book Removals & Self Storage online
                </span>
                <h1 className='text-3xl md:text-4xl font-extrabold mb-4'>
                  Let's help you move.
                </h1>
                <h2 className='text-[14px] md:text-[16px] md:leading-relaxed font-medium text-gray-600'>
                  By choosing Removal & Selfstorage, you’re guaranteeing a great
                  moving day. All customers receive transparent pricing,
                  flexible service options, background-checked movers,
                  industry-best customer support, and an easy-to-access online
                  dashboard.
                </h2>
                <div className='flex items-center justify-center lg:justify-start mt-[20px] w-full space-x-[20px]'>
                  <Link
                    href='/book'
                    className={"btn md:btn-wide btn-secondary "}
                  >
                    Book a move
                  </Link>
                  <a
                    href='tel:07869116203'
                    className={"btn btn-secondary btn-outline md:btn-wide"}
                  >
                    Help Center
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white py-[50px] mt-[40px]'>
            <div className=' flex px-[20px] md:px-[0px] justify-center'>
              <div className='rounded-lg overflow-hidden cursor-pointer  relative group '>
                {/* <div className='hero-overlay'></div> */}
                {/* play button */}
                <div
                  onClick={() => {
                    setShowModal(true);
                  }}
                  className='bg-black/60  hover:bg-black/90 w-[70px] h-[70px] absolute left-[43%] top-[40%] flex justify-center items-center rounded-full hover:scale-[1.2] duration-200'
                >
                  <BsFillPlayFill
                    size={50}
                    color='white'
                    className='text-white'
                  />
                </div>
                <div className=''>
                  <img
                    src='/hero_bg.jpg'
                    alt=''
                    className='w-[500px] h-[300px] lg:h-[400px] lg:w-[700px] object-cover'
                  />
                </div>
              </div>
            </div>

            {showModal && (
              <Modal showCloseIcon blur closeModal={() => setShowModal(false)}>
                <div className='px-[30px] md:px-[0]'>
                  <iframe
                    src='https://player.vimeo.com/video/464246309?autoplay=1&loop=1'
                    // width="640"
                    // height="360"
                    frameborder='0'
                    allow='autoplay; fullscreen; picture-in-picture'
                    // allow="autoplay; fullscreen;"
                    allowfullscreen
                    className=' w-[400px] h-[300px] md:w-[640px] md:h-[360px] lg:w-[853px] lg:h-[505px]'
                  ></iframe>
                </div>
              </Modal>
            )}
          </div>

          <OurReviews />

          <FAQ />
        </div>
      </NormalLayout>
    </>
  );
};

export default index;
