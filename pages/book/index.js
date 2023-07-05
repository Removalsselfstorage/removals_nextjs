import QuoteType from '@/components/BookingPages/QuoteType';
import QuoteCard from '@/components/BookingPages/QuoteType/QuoteCard';
import SecurePayment from '@/components/BookingPages/SecurePayment';
import Features from '@/components/HomePage/Features';
import Hero from '@/components/HomePage/Hero';
import BookingLayout from '@/layouts/BookingLayout';
import { titleFont } from '@/utils/fonts';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

const Booking = () => {
  return (
    <BookingLayout>
      <Head>
        <title>
          Get a quote - Removals and Selfstorage
        </title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <main className="">
        <div className="mb-[70px] lg:mb-[100px] pt-[100px]">
          <div className="md:max-w-7xl mx-auto">
            {/* links */}
            <div className="flex items-center px-[30px] text-[16px]">
              <Link href="/">
                <p className="text-primary link link-hover font-semibold">
                  Home
                </p>
              </Link>
              <MdKeyboardArrowRight size={20} className="text-primary" />
              <p className="text-primary font-semibold">Choose Quote Type</p>
              {/* <MdKeyboardArrowRight size={20}/> */}
            </div>

            {/* Title */}
            <div className="w-full flex justify-center py-[30px] md:py-[40px]">
              {/* <h3 className="text-4xl font-extrabold">Our Services</h3> */}
              <h3
                className={`${titleFont.variable} font-sans2 text-3xl lg:text-4xl font-extrabold flex-col items-center justify-center`}
              >
                <p className="">Choose Quote Type</p>{' '}
                <div className="w-full bg-primary/20 h-[20px] mt-[-12px] "></div>
              </h3>
            </div>

            {/* Services Cards */}
            <div className="py-[0px] px-[20px] flex flex-col md:flex-row justify-center items-center space-y-[20px] md:space-y-0 md:space-x-[20px] lg:space-x-[30px]">
              <QuoteCard
                image="/svg/house_removal.svg"
                title="Complete House Moving"
                link="complete-house"
              />
              <QuoteCard
                image="/svg/man_van.svg"
                title="Man and Van"
                link="man-and-van"
              />
            </div>

            {/* Next button */}
            {/* <div className="w-full mt-[50px] flex justify-center">
          <button className="btn btn-primary btn-wide flex items-center space-x-[5px]">
            <span className="">Next</span>
            <span className="">
              <FiEdit className="text-[20px]" />
            </span>
          </button>
        </div> */}
          </div>
        </div>
      </main>
    </BookingLayout>
  );
};

export default Booking;
