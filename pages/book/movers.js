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
import NormalLayout from '@/layouts/NormalLayout';

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
            {/* features links */}
            <div className="pl-[0px] mx-[10px] md:mx-[10px]">
              <div className=" py-[0px] md:py-[0px] px-[0px] lg:px-[100px] xl:px-[0px] hidden xl:grid grid-cols-2   md:grid-cols-3 xl:grid-cols-6 justify-center gap-x-[10px] gap-y-[10px] ">
                <div className="flex space-x-[10px] items-center md:justify-center bg-primary/10 py-[5px] px-[20px] rounded-[10px]">
                  <TiTick className="text-[30px] xl:text-[20px] text-primary" />
                  <p className="text-primary text-[14px] leading-[16px]">
                    Free Cancellation
                  </p>
                </div>
                <div className="flex space-x-[10px] items-center md:justify-center bg-primary/10 py-[5px] px-[10px] rounded-[10px]">
                  <TiTick className="text-[30px] xl:text-[20px] text-primary" />
                  <p className="text-primary text-[14px] leading-[16px]">
                    Happiness Guarantee
                  </p>
                </div>
                <div className="flex space-x-[10px] items-center md:justify-center bg-primary/10 py-[5px] px-[20px] rounded-[10px]">
                  <TiTick className="text-[30px] xl:text-[20px] text-primary" />
                  <p className="text-primary text-[14px] leading-[16px]">
                    Transit blankets
                  </p>
                </div>
                <div className="flex space-x-[10px] items-center md:justify-center bg-primary/10 py-[5px] px-[20px] rounded-[10px]">
                  <TiTick className="text-[30px] xl:text-[20px] text-primary" />
                  <p className="text-primary text-[14px] leading-[16px]">
                    Trusted Movers
                  </p>
                </div>
                <div className="flex space-x-[10px] items-center md:justify-center bg-primary/10 py-[5px] px-[20px] rounded-[10px]">
                  <TiTick className="text-[30px] xl:text-[20px] text-primary" />
                  <p className="text-primary text-[14px] leading-[16px]">
                    100% Satisfaction
                  </p>
                </div>
                <div className="flex space-x-[10px] items-center md:justify-center bg-primary/10 py-[5px] px-[20px] rounded-[10px]">
                  <TiTick className="text-[30px] xl:text-[20px] text-primary" />
                  <p className="text-primary text-[14px] leading-[16px]">
                    Full Refund
                  </p>
                </div>
              </div>
              <div className="xl:hidden">
                <HorizontalScroll speed={80}>
                  <div className="flex items-center space-x-[10px]">
                    <div className="flex  space-x-[10px] items-center justify-center bg-primary/10  py-[5px] px-[20px] rounded-[10px]">
                      <TiTick className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        Free Cancellation
                      </p>
                    </div>
                    <div className="flex  space-x-[10px] items-center justify-center bg-primary/10  py-[5px] px-[10px] rounded-[10px]">
                      <TiTick className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        Happiness Guarantee
                      </p>
                    </div>
                    <div className="flex space-x-[10px] items-center justify-center bg-primary/10  py-[5px] px-[20px] rounded-[10px]">
                      <TiTick className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        Transit blankets
                      </p>
                    </div>
                    <div className="flex space-x-[10px] items-center justify-center bg-primary/10  py-[5px] px-[20px] rounded-[10px]">
                      <TiTick className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        Trusted Movers
                      </p>
                    </div>
                    <div className="flex space-x-[10px] items-center justify-center bg-primary/10  py-[5px] px-[20px] rounded-[10px]">
                      <TiTick className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        100% Satisfaction
                      </p>
                    </div>
                    <div className="flex space-x-[10px] items-center justify-center bg-primary/10  py-[5px] px-[20px] rounded-[10px]">
                      <TiTick className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        Full Refund
                      </p>
                    </div>
                  </div>
                </HorizontalScroll>
              </div>
            </div>

            {/* date pick */}
            <div className="flex items-center space-x-[10px] mx-[10px] py-[10px] px-[10px] md:mx-[10px] mt-[20px] w-full overflow-x-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-primary scrollbar-default">
                <div className="flex flex-col py-[20px] px-[20px] hover:cursor-pointer hover:border-secondary rounded-[20px] items-center justify-center border-[2px] group border-primary hover:scale-[1.07] duration-150">
                    <p className="font-semibold text-primary whitespace-nowrap duration-150">Thu, sept 7</p>
                    <p className="font-bold text-primary text-[24px] whitespace-nowrap">₤ 456.68</p>
                </div>
                <div className="flex flex-col py-[20px] px-[20px] hover:cursor-pointer hover:border-secondary rounded-[20px] items-center justify-center border-[2px] border-primary hover:scale-[1.07] duration-150">
                    <p className="font-semibold text-primary whitespace-nowrap">Fri, sept 8</p>
                    <p className="font-bold text-primary text-[24px] whitespace-nowrap">₤ 454.63</p>
                </div>
                <div className="flex flex-col py-[20px] px-[20px] hover:cursor-pointer hover:border-secondary rounded-[20px] items-center justify-center border-[2px] border-primary hover:scale-[1.07] duration-150">
                    <p className="font-semibold text-primary whitespace-nowrap">Sat, sept 9</p>
                    <p className="font-bold text-primary text-[24px] whitespace-nowrap">₤ 452.18</p>
                </div>
                <div className="flex flex-col py-[20px] px-[20px] hover:cursor-pointer hover:border-secondary rounded-[20px] items-center justify-center border-[2px] border-primary hover:scale-[1.07] duration-150">
                    <p className="font-semibold text-primary whitespace-nowrap">Sun, sept 10</p>
                    <p className="font-bold text-primary text-[24px] whitespace-nowrap">₤ 456.22</p>
                </div>
                <div className="flex flex-col py-[20px] px-[20px] hover:cursor-pointer hover:border-secondary rounded-[20px] items-center justify-center border-[2px] border-primary hover:scale-[1.07] duration-150">
                    <p className="font-semibold text-primary whitespace-nowrap">Mon, sept 11</p>
                    <p className="font-bold text-primary text-[24px] whitespace-nowrap">₤ 450.38</p>
                </div>
                <div className="flex flex-col py-[20px] px-[20px] hover:cursor-pointer hover:border-secondary rounded-[20px] items-center justify-center border-[2px] border-primary hover:scale-[1.07] duration-150">
                    <p className="font-semibold text-primary whitespace-nowrap">Tue, sept 12</p>
                    <p className="font-bold text-primary text-[24px] whitespace-nowrap">₤ 450.07</p>
                </div>
                <div className="flex flex-col py-[20px] px-[20px] hover:cursor-pointer hover:border-secondary rounded-[20px] items-center justify-center border-[2px] border-primary hover:scale-[1.07] duration-150">
                    <p className="font-semibold text-primary whitespace-nowrap">Wed, sept 13</p>
                    <p className="font-bold text-primary text-[24px] whitespace-nowrap">₤ 448.88</p>
                </div>
                <div className="flex flex-col py-[20px] px-[20px] hover:cursor-pointer hover:border-secondary rounded-[20px] items-center justify-center border-[2px] border-primary hover:scale-[1.07] duration-150">
                    <p className="font-semibold text-primary whitespace-nowrap">Thu, sept 14</p>
                    <p className="font-bold text-primary text-[24px] whitespace-nowrap">₤ 447.74</p>
                </div>
                <div className="flex flex-col py-[20px] px-[20px] hover:cursor-pointer hover:border-secondary rounded-[20px] items-center justify-center border-[2px] border-primary hover:scale-[1.07] duration-150">
                    <p className="font-semibold text-primary whitespace-nowrap">Fri, sept 15</p>
                    <p className="font-bold text-primary text-[24px] whitespace-nowrap">₤ 446.46</p>
                </div>
                <div className="flex flex-col py-[20px] px-[20px] hover:cursor-pointer hover:border-secondary rounded-[20px] items-center justify-center border-[2px] border-primary hover:scale-[1.07] duration-150">
                    <p className="font-semibold text-primary whitespace-nowrap">Sat, sept 7</p>
                    <p className="font-bold text-primary text-[24px] whitespace-nowrap">₤ 443.68</p>
                </div>
               
               
               
            </div>
          </div>
        </div>
      </main>
    </BookingLayout>
  );
};

export default movers;
