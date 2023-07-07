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
import { TiTick } from 'react-icons/ti';
import {
  MdFreeCancellation,
  MdKeyboardArrowRight,
  MdPayments,
} from 'react-icons/md';
import HorizontalScroll from '@/components/HorizontalScroll';

const movers = () => {
  return (
    <BookingLayout>
      <Head>
        <title>Movers - Removals and Selfstorage</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <main className="">
        <div className="mb-[70px] lg:mb-[100px] pt-[80px] md:pt-[100px]">
          <div className="md:max-w-7xl mx-auto">
            {/* links */}
            <div className="pl-[0px] mx-[10px] md:mx-[10px]">
              <div className=" py-[0px] md:py-[0px] px-[0px] lg:px-[100px] xl:px-[0px] hidden xl:grid grid-cols-2   md:grid-cols-3 xl:grid-cols-6 justify-center gap-x-[10px] gap-y-[10px] ">
                <div className="flex space-x-[10px] items-center md:justify-center bg-primary/10 py-[5px] px-[20px] rounded-[10px]">
                  <TiTick className="text-[30px] xl:text-[20px] text-primary" />
                  <p className="text-primary text-[14px] leading-[16px]">Free Cancellation</p>
                </div>
                <div className="flex space-x-[10px] items-center md:justify-center bg-primary/10 py-[5px] px-[10px] rounded-[10px]">
                  <TiTick className="text-[30px] xl:text-[20px] text-primary" />
                  <p className="text-primary text-[14px] leading-[16px]">Happiness Guarantee</p>
                </div>
                <div className="flex space-x-[10px] items-center md:justify-center bg-primary/10 py-[5px] px-[20px] rounded-[10px]">
                  <TiTick className="text-[30px] xl:text-[20px] text-primary" />
                  <p className="text-primary text-[14px] leading-[16px]">Transit blankets</p>
                </div>
                <div className="flex space-x-[10px] items-center md:justify-center bg-primary/10 py-[5px] px-[20px] rounded-[10px]">
                  <TiTick className="text-[30px] xl:text-[20px] text-primary" />
                  <p className="text-primary text-[14px] leading-[16px]">Trusted Movers</p>
                </div>
                <div className="flex space-x-[10px] items-center md:justify-center bg-primary/10 py-[5px] px-[20px] rounded-[10px]">
                  <TiTick className="text-[30px] xl:text-[20px] text-primary" />
                  <p className="text-primary text-[14px] leading-[16px]">100% Satisfaction</p>
                </div>
                <div className="flex space-x-[10px] items-center md:justify-center bg-primary/10 py-[5px] px-[20px] rounded-[10px]">
                  <TiTick className="text-[30px] xl:text-[20px] text-primary" />
                  <p className="text-primary text-[14px] leading-[16px]">Full Refund</p>
                </div>
              </div>
              <div className="xl:hidden">
                  <HorizontalScroll speed={80}>
                    <div className="flex items-center space-x-[10px]">
                        <div className="flex  space-x-[10px] items-center md:justify-center bg-primary/10 py-[5px] px-[20px] rounded-[10px]">
                          <TiTick className="text-[30px] xl:text-[20px] text-primary" />
                          <p className="text-primary text-[14px] leading-[16px] w-[150px]">Free Cancellation</p>
                        </div>
                        <div className="flex  space-x-[10px] items-center md:justify-center bg-primary/10 py-[5px] px-[10px] rounded-[10px]">
                          <TiTick className="text-[30px] xl:text-[20px] text-primary" />
                          <p className="text-primary text-[14px] leading-[16px] w-[150px]">Happiness Guarantee</p>
                        </div>
                        <div className="flex space-x-[10px] items-center md:justify-center bg-primary/10 py-[5px] px-[20px] rounded-[10px]">
                          <TiTick className="text-[30px] xl:text-[20px] text-primary" />
                          <p className="text-primary text-[14px] leading-[16px] w-[150px]">Transit blankets</p>
                        </div>
                        <div className="flex space-x-[10px] items-center md:justify-center bg-primary/10 py-[5px] px-[20px] rounded-[10px]">
                          <TiTick className="text-[30px] xl:text-[20px] text-primary" />
                          <p className="text-primary text-[14px] leading-[16px] w-[150px]">Trusted Movers</p>
                        </div>
                        <div className="flex space-x-[10px] items-center md:justify-center bg-primary/10 py-[5px] px-[20px] rounded-[10px]">
                          <TiTick className="text-[30px] xl:text-[20px] text-primary" />
                          <p className="text-primary text-[14px] leading-[16px] w-[150px]">100% Satisfaction</p>
                        </div>
                        <div className="flex space-x-[10px] items-center md:justify-center bg-primary/10 py-[5px] px-[20px] rounded-[10px]">
                          <TiTick className="text-[30px] xl:text-[20px] text-primary" />
                          <p className="text-primary text-[14px] leading-[16px] w-[150px]">Full Refund</p>
                        </div>
                    </div>
                  </HorizontalScroll>
              </div>
            </div>
          </div>
        </div>
      </main>
    </BookingLayout>
  );
};

export default movers;
